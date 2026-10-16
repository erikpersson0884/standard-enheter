import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { DRINKS } from "./drinks";
import type { Drink } from "./drinks";
import "./App.css";

const ETHANOL_DENSITY = 0.789; // g per ml
const STORAGE_KEY = "alkoholkalkylator:egna-drycker";

// Läs egna drycker från localStorage (tål tom, trasig eller blockerad lagring)
const loadCustomDrinks = (): Drink[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (d): d is Drink =>
        d &&
        typeof d.name === "string" &&
        typeof d.volume === "number" &&
        typeof d.abv === "number" &&
        typeof d.group === "string"
    );
  } catch {
    return [];
  }
};

// Pure alcohol in ml for one serving
const alcoholMl = (drink: Drink): number => drink.volume * (drink.abv / 100);

interface DrinkForm {
  name: string;
  volume: string;
  abv: string;
  group: string;
}

const EMPTY_FORM: DrinkForm = { name: "", volume: "", abv: "", group: "Egen" };

// Visa tal med svenskt decimalkomma, t.ex. 12,5
const fmt = (n: number, digits = 1): string =>
  n.toLocaleString("sv-SE", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });

export default function App() {
  const [customDrinks, setCustomDrinks] = useState<Drink[]>(loadCustomDrinks);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [form, setForm] = useState<DrinkForm>(EMPTY_FORM);

  // Spara egna drycker varje gång listan ändras
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(customDrinks));
    } catch {
      // Lagring blockerad eller full: appen fungerar ändå, men dryckerna sparas inte
    }
  }, [customDrinks]);

  // drinks.ts först, sedan egna drycker
  const drinks: Drink[] = [...DRINKS, ...customDrinks];
  const customNames = new Set(customDrinks.map((d) => d.name));

  const removeDrink = (name: string) => {
    setCustomDrinks((list) => list.filter((d) => d.name !== name));
    setCounts((c) => {
      const next = { ...c };
      delete next[name];
      return next;
    });
  };

  const setCount = (name: string, value: string) =>
    setCounts((c) => ({ ...c, [name]: Math.max(0, Number(value) || 0) }));

  const updateForm =
    (field: keyof DrinkForm) => (e: ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  const addDrink = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = form.name.trim();
    const volume = Number(form.volume);
    const abv = Number(form.abv);
    if (!name || volume <= 0 || abv <= 0) return;
    if (drinks.some((d) => d.name === name)) return; // names must be unique
    setCustomDrinks((d) => [
      ...d,
      { name, volume, abv, group: form.group.trim() || "Egen" },
    ]);
    setForm({ ...form, name: "", volume: "", abv: "" });
  };

  const totalMl = drinks.reduce(
    (sum, d) => sum + (counts[d.name] || 0) * alcoholMl(d),
    0
  );
  const totalGrams = totalMl * ETHANOL_DENSITY;
  const totalDrinks = Object.values(counts).reduce((a, b) => a + b, 0);

  // Group drinks by their `group` field, keeping order of first appearance
  const groups = drinks.reduce<Record<string, Drink[]>>((acc, d) => {
    (acc[d.group] ||= []).push(d);
    return acc;
  }, {});

  return (
    <main className="app">
      <h1>Alkoholkalkylator</h1>
      <p className="intro">Ange hur många av varje dryck du druckit för att se mängden ren alkohol.</p>

      <section className="result" aria-live="polite">
        <div className="result-main">
          <span className="result-number">{fmt(totalMl)}</span>
          <span className="result-unit">ml ren alkohol</span>
        </div>
        <div className="result-sub">
          {fmt(totalGrams)} g · {totalDrinks} {totalDrinks === 1 ? "dryck" : "drycker"}
        </div>
        <button className="reset" onClick={() => setCounts({})}>
          Nollställ
        </button>
      </section>

      {Object.entries(groups).map(([group, items]) => (
        <section key={group} className="group">
          <h2>{group}</h2>
          <ul>
            {items.map((d) => (
              <li key={d.name}>
                <label htmlFor={d.name}>
                  <span className="drink-name">{d.name}</span>
                  <span className="drink-meta">
                    {d.volume} ml, {fmt(d.abv, d.abv % 1 ? 1 : 0)} %
                  </span>
                </label>
                <input
                  id={d.name}
                  type="number"
                  min="0"
                  inputMode="numeric"
                  placeholder="0"
                  value={counts[d.name] || ""}
                  onChange={(e) => setCount(d.name, e.target.value)}
                />
                {customNames.has(d.name) && (
                  <button
                    type="button"
                    className="remove"
                    onClick={() => removeDrink(d.name)}
                    aria-label={`Ta bort ${d.name}`}
                  >
                    Ta bort
                  </button>
                )}
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section className="group">
        <h2>Lägg till en dryck</h2>
        <form className="add-form" onSubmit={addDrink}>
          <input placeholder="Namn" value={form.name} onChange={updateForm("name")} />
          <input
            type="number"
            min="1"
            placeholder="Storlek (ml)"
            value={form.volume}
            onChange={updateForm("volume")}
          />
          <input
            type="number"
            min="0.1"
            step="0.1"
            placeholder="Alkoholhalt (%)"
            value={form.abv}
            onChange={updateForm("abv")}
          />
          <input placeholder="Grupp" value={form.group} onChange={updateForm("group")} />
          <button type="submit">Lägg till</button>
        </form>
        <p className="note">
          Drycker du lägger till här sparas i webbläsaren på den här enheten och finns kvar när du laddar om sidan.
        </p>
      </section>
    </main>
  );
}
