import { expect } from "chai";
import BasicComparer from "../../../src/Collections/BasicComparer";

class BasicComparerMock<T> extends BasicComparer<T> {
	// Fields
	public compareInternalCalled: boolean = false;
	public equalsInternalCalled: boolean = false;

	protected compareInternal(first: T, second: T): number {
		this.compareInternalCalled = true;
		return 0;
	}

	protected equalsInternal(first: T, second: T): boolean {
		this.equalsInternalCalled = true;
		return true;
	}
}

describe("Unit-tests", () => {
	describe("Collections", () => {
		describe("BasicComparer", () => {
			describe("compare()", () => {
				it("should call compareInternal() if no parameter is null", () => {
					const anyComparer = new BasicComparerMock<any>();
					expect(anyComparer.compareInternalCalled).is.false;
					anyComparer.compare(new Object(), new Object());
					expect(anyComparer.compareInternalCalled).is.true;

					const numberComparer = new BasicComparerMock<number>();
					expect(numberComparer.compareInternalCalled).is.false;
					numberComparer.compare(0, 0);
					expect(numberComparer.compareInternalCalled).is.true;

					const stringComparer = new BasicComparerMock<string>();
					expect(stringComparer.compareInternalCalled).is.false;
					stringComparer.compare("", "");
					expect(stringComparer.compareInternalCalled).is.true;
				});
				it("should return negative one if only first parameter is null", () => {
					expect(new BasicComparerMock<any>().compare(null, new Object())).equal(-1);
					expect(new BasicComparerMock<number | null>().compare(null, -10)).equal(-1);
					expect(new BasicComparerMock<string | null>().compare(null, "Value")).equal(-1);
				});
				it("should return positive one if only second parameter is null", () => {
					expect(new BasicComparerMock<any>().compare(new Object(), null)).equal(1);
					expect(new BasicComparerMock<number | null>().compare(-10, null)).equal(1);
					expect(new BasicComparerMock<string | null>().compare("Value", null)).equal(1);
				});
				it("should return zero if both parameters are null", () => {
					expect(new BasicComparerMock<any>().compare(null, null)).equal(0);
					expect(new BasicComparerMock<number | null>().compare(null, null)).equal(0);
					expect(new BasicComparerMock<string | null>().compare(null, null)).equal(0);
				});
			});
			describe("equals()", () => {
				it("should call equalsInternal() if no parameter is null", () => {
					const anyComparer = new BasicComparerMock<any>();
					expect(anyComparer.equalsInternalCalled).is.false;
					anyComparer.equals(new Object(), new Object());
					expect(anyComparer.equalsInternalCalled).is.true;

					const numberComparer = new BasicComparerMock<number>();
					expect(numberComparer.equalsInternalCalled).is.false;
					numberComparer.equals(0, 0);
					expect(numberComparer.equalsInternalCalled).is.true;

					const stringComparer = new BasicComparerMock<string>();
					expect(stringComparer.equalsInternalCalled).is.false;
					stringComparer.equals("", "");
					expect(stringComparer.equalsInternalCalled).is.true;
				});
				it("should return false if only first parameter is null", () => {
					expect(new BasicComparerMock<any>().equals(null, new Object())).is.false;
					expect(new BasicComparerMock<number | null>().equals(null, -10)).is.false;
					expect(new BasicComparerMock<string | null>().equals(null, "Value")).is.false;
				});
				it("should return false if only second parameter is null", () => {
					expect(new BasicComparerMock<any>().equals(new Object(), null)).is.false;
					expect(new BasicComparerMock<number | null>().equals(-10, null)).is.false;
					expect(new BasicComparerMock<string | null>().equals("Value", null)).is.false;
				});
				it("should return true if both parameters are null", () => {
					expect(new BasicComparerMock<any>().equals(null, null)).is.true;
					expect(new BasicComparerMock<number | null>().equals(null, null)).is.true;
					expect(new BasicComparerMock<string | null>().equals(null, null)).is.true;
				});
			});
		});
	});
});