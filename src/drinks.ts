// Lägg till nya drycker här. Det är den enda filen du behöver redigera.
//
//   name:    namnet som visas i listan (måste vara unikt)
//   volume:  portionsstorlek i milliliter (ml)
//   abv:     alkoholhalt i volymprocent (t.ex. 5 = 5 %)
//   group:   rubrik i listan (nya grupper dyker upp automatiskt)

export interface Drink {
    name: string;
    volume: number;
    abv: number;
    group: string;
}

export const DRINKS: Drink[] = [




    // Öl
    { name: "Norrlands Guld Export (33 cl)", volume: 330, abv: 5.3, group: "Öl" },

    // Cider 
    { name: "Somersby päron (33 cl)", volume: 330, abv: 4.5, group: "Cider" },
    { name: "Halmstad Crush (33 cl)", volume: 330, abv: 7, group: "Cider" },

    // Vin
    { name: "Zensa Primitivo (glas, 15 cl)", volume: 150, abv: 13.5, group: "Vin" },
    { name: "Zensa Primitivo (hel flaska, 75 cl)", volume: 750, abv: 13.5, group: "Vin" },

    // Sprit
    { name: "Vodka (shot, 4 cl)", volume: 40, abv: 40, group: "Sprit" },
    { name: "Jägermeister (shot, 4 cl)", volume: 40, abv: 35, group: "Sprit" },
];