//un essai: c'est l'affichage des formes et leur choix par l'utilisateur. en gros c'est une question
import { Item } from "./Item.js";

export class Trial {

  constructor(trialData) {
    this.typeEssai = trialData.type;
    this.nbItems = trialData.nbItems;
    this.items = this._buildItems(trialData);
  }

  /**
   * Construit le tableau d'items à partir du format trials.js :
   *   TRAITSIMPLE  → target (×1) + distractor (× nbItems-1)
   *   CONJONCTION  → target (×1) + distractors répartis équitablement (× nbItems-1)
   */
  _buildItems(trialData) {
    const total = trialData.nbItems;
    const itemList = [];

    // 1 cible
    itemList.push(new Item(trialData.target.color, trialData.target.shape, true));

    if (trialData.type === "TRAITSIMPLE") {
      // nbItems-1 distracteurs identiques
      for (let i = 1; i < total; i++) {
        itemList.push(new Item(trialData.distractor.color, trialData.distractor.shape, false));
      }

    } else {
      // CONJONCTION : alterner entre les deux types de distracteurs
      const distractors = trialData.distractors;
      for (let i = 1; i < total; i++) {
        const d = distractors[(i - 1) % distractors.length];
        itemList.push(new Item(d.color, d.shape, false));
      }
    }

    // Mélanger pour que la cible ne soit pas toujours en position 0
    return this._shuffle(itemList);
  }

  _shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

}

export const TypeEssai = {
  TRAITSIMPLE: "TRAITSIMPLE",
  CONJONCTION: "CONJONCTION",
};

export const Color = [
  "red",
  "green",
  "blue",
  "yellow"
];

export const Shape = [
  "square",
  "circle",
  "triangle"
];