export interface Card {
  src: string;
  name: string;
  occurence: number;
}

export class Deck {
  private readonly unshuffled: Card[];
  private shuffled: Card[];

  constructor() {
    this.unshuffled = [];
    cards.forEach((c) => {
      for (let i = 0; i < c.occurence; i++) {
        this.unshuffled.push({ ...c });
      }
    });
    this.shuffled = [];
  }

  draw = (): Card => {
    if (this.shuffled.length === 0) {
      this.shuffled = this.shuffle([...this.unshuffled]);
    }
    return this.shuffled.pop()!;
  };

  // See: https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
  private shuffle(a: Card[]) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
}

const cards: Card[] = [
  { src: "/cards/bonus-200.jpg", name: "Bonus 200", occurence: 5 },
  { src: "/cards/bonus-300.jpg", name: "Bonus 300", occurence: 5 },
  { src: "/cards/bonus-400.jpg", name: "Bonus 400", occurence: 5 },
  { src: "/cards/bonus-500.jpg", name: "Bonus 500", occurence: 5 },
  { src: "/cards/bonus-600.jpg", name: "Bonus 600", occurence: 5 },
  { src: "/cards/fireworks.jpg", name: "Feuerwerk", occurence: 5 },
  { src: "/cards/kleeblatt.jpg", name: "Kleeblatt", occurence: 1 },
  { src: "/cards/plus-minus.jpg", name: "Plus/Minus", occurence: 5 },
  { src: "/cards/stop.jpg", name: "Stop", occurence: 10 },
  { src: "/cards/street.jpg", name: "Strasse", occurence: 5 },
  { src: "/cards/x2.jpg", name: "x2", occurence: 5 },
];
