import { Operator, NumberTile } from "./types";

export class Operation {
  left: NumberTile;
  right: NumberTile;
  operator: Operator;

  constructor(left: NumberTile, right: NumberTile, operator: Operator) {
    this.left = left;
    this.right = right;
    this.operator = operator;
  }

  get id(): string {
    return this.left.id + "-" + this.right.id;
  }

  get result(): NumberTile {
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
      id: this.left.id + "-" + this.right.id,
      value,
      isInitial: false,
    };
  }

  get isValid(): boolean {
    return (
      this.result.value > 0 &&
      this.result.value === Math.floor(this.result.value)
    );
  }

  static getValidOperations(left: NumberTile, right: NumberTile): Operation[] {
    const result: Operation[] = [];

    function pushOperationIfValid(operation: Operation) {
      if (operation.isValid) {
        result.push(operation);
      }
    }

    pushOperationIfValid(new Operation(left, right, "+"));
    pushOperationIfValid(new Operation(left, right, "*"));

    if (left.value > right.value) {
      pushOperationIfValid(new Operation(left, right, "-"));
      pushOperationIfValid(new Operation(left, right, "/"));
    } else {
      pushOperationIfValid(new Operation(right, left, "-"));
      pushOperationIfValid(new Operation(right, left, "/"));
    }

    return result;
  }
}
