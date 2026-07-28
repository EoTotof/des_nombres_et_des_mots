import { Operator, Tile } from "./types";

export default class Operation {
  left: Tile;
  right: Tile;
  operator: Operator;

  constructor(left: Tile, right: Tile, operator: Operator) {
    this.left = left;
    this.right = right;
    this.operator = operator;
  }

  get result(): Tile {
    let value: number = NaN;
    switch (this.operator) {
      case "+":
        value = this.left.value + this.right.value;
        break;
      case "-":
        value = this.left.value - this.right.value;
        break;
      case "*":
        value = this.left.value * this.right.value;
        break;
      case "/":
        if (this.right.value !== 0) {
          value = this.left.value / this.right.value;
        }
        break;
    }

    return {
      id: this.left.id * 10 + this.right.id,
      value,
      isInitial: false,
    };
  }

  isValid(): boolean {
    return (
      this.result.value > 0 &&
      this.result.value === Math.floor(this.result.value)
    );
  }
}
