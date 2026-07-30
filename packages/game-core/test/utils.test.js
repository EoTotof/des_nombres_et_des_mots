// AI-generated tests
import { describe, expect, it, vi, afterEach } from "vitest";
import { popRandomValueFromArray, popNRandomValuesFromArray } from "../src";
afterEach(() => {
    vi.restoreAllMocks();
});
describe("popRandomValueFromArray", () => {
    it("throws if the array is empty", () => {
        expect(() => popRandomValueFromArray([])).toThrow("Array is empty");
    });
    it("returns the popped value and removes it from the array", () => {
        const randomSpy = vi.spyOn(Math, "random").mockReturnValue(0.5);
        const array = [1, 2, 3, 4];
        const [value, remaining] = popRandomValueFromArray(array);
        expect(randomSpy).toHaveBeenCalledOnce();
        expect(value).toBe(3);
        expect(remaining).toEqual([1, 2, 4]);
        // same array instance should be mutated
        expect(array).toBe(remaining);
    });
    it("can pop the first element", () => {
        vi.spyOn(Math, "random").mockReturnValue(0);
        const array = ["a", "b", "c"];
        const [value, remaining] = popRandomValueFromArray(array);
        expect(value).toBe("a");
        expect(remaining).toEqual(["b", "c"]);
    });
    it("can pop the last element", () => {
        vi.spyOn(Math, "random").mockReturnValue(0.999999);
        const array = ["a", "b", "c"];
        const [value, remaining] = popRandomValueFromArray(array);
        expect(value).toBe("c");
        expect(remaining).toEqual(["a", "b"]);
    });
});
describe("popNRandomValuesFromArray", () => {
    it("throws when n is larger than the array length", () => {
        expect(() => popNRandomValuesFromArray(4, [1, 2, 3])).toThrow("Cannot pop more values than array length");
    });
    it("returns n random values and removes them from the array", () => {
        vi.spyOn(Math, "random")
            .mockReturnValueOnce(0) // pop 1
            .mockReturnValueOnce(0); // pop 2
        const array = [1, 2, 3, 4];
        const [values, remaining] = popNRandomValuesFromArray(2, array);
        expect(values).toEqual([1, 2]);
        expect(remaining).toEqual([3, 4]);
        expect(array).toBe(remaining);
    });
    it("can pop every value", () => {
        vi.spyOn(Math, "random").mockReturnValue(0);
        const array = [1, 2, 3];
        const [values, remaining] = popNRandomValuesFromArray(3, array);
        expect(values).toEqual([1, 2, 3]);
        expect(remaining).toEqual([]);
    });
    it("returns an empty selection when n is 0", () => {
        const array = [1, 2, 3];
        const [values, remaining] = popNRandomValuesFromArray(0, array);
        expect(values).toEqual([]);
        expect(remaining).toEqual([1, 2, 3]);
        expect(array).toBe(remaining);
    });
});
//# sourceMappingURL=utils.test.js.map