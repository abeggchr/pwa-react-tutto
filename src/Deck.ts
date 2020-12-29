export interface Card {
  src: string;
  name: string;
  occurence: number;
  description: string;
  validInputs: number[] | undefined;
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

const bonusDescription =
  "Würfelt der Spieler ein «Tutto», erhält er, zusätzlich zu den erwürfelten Punkten, die auf der Karte angegebenen Bonuspunkte. Würfelt er kein «Tutto», erhält er nur die erwürfelten Punkte ohne den Bonus.";

const cards: Card[] = [
  {
    src: "/cards/bonus-200.jpg",
    name: "Bonus 200",
    occurence: 5,
    description: bonusDescription,
    validInputs: undefined,
  },
  {
    src: "/cards/bonus-300.jpg",
    name: "Bonus 300",
    occurence: 5,
    description: bonusDescription,
    validInputs: undefined,
  },
  {
    src: "/cards/bonus-400.jpg",
    name: "Bonus 400",
    occurence: 5,
    description: bonusDescription,
    validInputs: undefined,
  },
  {
    src: "/cards/bonus-500.jpg",
    name: "Bonus 500",
    occurence: 5,
    description: bonusDescription,
    validInputs: undefined,
  },
  {
    src: "/cards/bonus-600.jpg",
    name: "Bonus 600",
    occurence: 5,
    description: bonusDescription,
    validInputs: undefined,
  },
  {
    src: "/cards/fireworks.jpg",
    name: "Feuerwerk",
    occurence: 5,
    description:
      "Der Spieler muss so lange würfeln, bis er eine Niete wirft. Er muss bei jedem Wurf alle gültigen Würfel und Drillinge herauslegen.  Bei einem «Tutto» muss er weitermachen, ohne eine neue Karte aufzudecken. Sein Zug endet erst, wenn er eine Niete würfelt. Er bekommt alle Punkte aufgeschrieben, die er in diesem Zug erwürfelt hat.",
    validInputs: undefined,
  },

  {
    src: "/cards/kleeblatt.jpg",
    name: "Kleeblatt",
    occurence: 1,
    description:
      "Der Spieler muss versuchen, in diesem Zug zweimal «Tutto» zu würfeln. Schafft er es, ist das Spiel sofort beendet, und er ist der Gewinner – unabhängig vom Punktestand! Schafft er es nicht, ist der nächste Spieler an der Reihe.",
    validInputs: undefined,
  },
  {
    src: "/cards/plus-minus.jpg",
    name: "Plus/Minus",
    occurence: 500,
    description:
      "Würfelt der Spieler ein «Tutto», erhält er 1000 Punkte und dem führenden Spieler werden 1000 Punkte abgezogen. Die erwürfelten Punkte werden nicht berücksichtigt. Führen mehrere Spieler (dieselbe Punktzahl), bekommt jeder von ihnen 1000 Punkte abgezogen. Der würfelnde Spieler erhält aber trotzdem nur 1000 Punkte gutgeschrieben. Deckt der führende Spieler selbst die «Plus / Minus»-Karte auf, muss er sich natürlich keine Punkte abziehen. Er setzt aus, und der nächste Spieler ist an der Reihe",
    validInputs: undefined,
  },
  {
    src: "/cards/stop.jpg",
    name: "Stop",
    occurence: 10,
    description:
      "Pech gehabt! Der Spieler muss aussetzen, und sein linker Nachbar kommt an die Reihe.",
    validInputs: [0],
  },
  {
    src: "/cards/street.jpg",
    name: "Strasse",
    occurence: 5,
    description:
      "Der Spieler muss versuchen, eine Strasse zu würfeln. Er muss nach jedem Wurf mindestens einen Würfel heraus legen. Hat er die Strasse geschafft, erhält er dafür 2000 Punkte, anderenfalls bekommt er keinen Punkt, und der nächste Spieler ist an der Reihe. Ein Strasse gilt als «Tutto». Der Spieler darf also weitermachen.",
    validInputs: [0, 2000],
  },
  {
    src: "/cards/x2.jpg",
    name: "x2",
    occurence: 5,
    description:
      " Würfelt der Spieler ein «Tutto», werden alle in diesem Zug erwürfelten Punkte verdoppelt. Würfelt er kein «Tutto», werden die Punkte auch nicht verdoppelt.",
    validInputs: undefined,
  },
];
