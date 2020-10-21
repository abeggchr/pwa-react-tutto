export interface Card {
    src: string;
    name: string;
}

export class Deck {
    draw = (): Card => {
        return {
            src: "/cards/bonus-200.jpg",
            name: "Bonus 200"
        }
    }
}