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
    { name: "Pripps blå (33 cl)", volume: 330, abv: 5, group: "Öl" },
    { name: "Mariestads Export (33 cl)", volume: 330, abv: 5.3, group: "Öl" },
    { name: "Carlsberg Export (33 cl)", volume: 330, abv: 5.0, group: "Öl" },
    { name: "Erdinger Weissbier (50 cl)", volume: 500, abv: 5.3, group: "Öl" },
    { name: "Ey'bro (33 cl)", volume: 330, abv: 5.0, group: "Öl" },

    // Cider 
    { name: "Somersby päron (33 cl)", volume: 330, abv: 4.5, group: "Cider" },
    { name: "Halmstad Crush (33 cl)", volume: 330, abv: 7, group: "Cider" },
    { name: "Halmstad Crush Lemon (33 cl)", volume: 330, abv: 4.5, group: "Cider" },
    { name: "THe Bellini Project (33 cl)", volume: 330, abv: 4.5, group: "Cider" },

    // Vin
    { name: "Zensa Primitivo (glas, 15 cl)", volume: 150, abv: 13.5, group: "Vin" },

    // Bubbel
    { name: "Asti Martini (glas, 15cl)", volume: 150, abv: 7, group: "Bubbel" },

    // Sprit
    { name: "Vodka (shot, 4 cl)", volume: 40, abv: 40, group: "Sprit" },
    { name: "Jägermeister (shot, 4 cl)", volume: 40, abv: 35, group: "Sprit" },
    { name: "Bäska Droppar (shot, 4 cl)", volume: 40, abv: 37.5, group: "Mina drycker" },
    { name: "Koskenkorva Salmiakki (shot, 4 cl)", volume: 40, abv: 30, group: "Mina drycker" },


];