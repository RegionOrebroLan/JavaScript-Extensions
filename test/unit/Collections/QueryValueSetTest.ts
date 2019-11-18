import { expect } from "chai";
import IComparer from "../../../src/Collections/IComparer";
import QueryValueSet from "../../../src/Collections/QueryValueSet";
import Utility from "../../../src/Utility";

class ComparerMock implements IComparer<any> {
	// Methods
	public compare(first: any, second: any): number {
		if(first === null) {
			if(second === null)
				return 0;

			return -1;
		}

		if(second === null)
			return 1;

		if(first === undefined) {
			if(second === undefined)
				return 0;

			return -1;
		}

		if(second === undefined)
			return 1;

		return first.toString().localeCompare(second.toString());
	}

	public equals(first: any, second: any): boolean {
		return this.compare(first, second) === 0;
	}
}

describe("Unit-tests", () => {
	describe("Collections", () => {
		describe("QueryValueSet", () => {
			describe("add()", () => {
				it("should add the item if it does not exist and return one", () => {
					const comparer = new ComparerMock();
					const queryValueSet = new QueryValueSet(comparer);
					expect(queryValueSet.count).equal(0);
					expect(queryValueSet.add("Value")).equal(1);
					expect(queryValueSet.count).equal(1);
					expect(queryValueSet.item(0)).equal("Value");
				});
				it("should add the items if they do not exist and return the number of items added", () => {
					const comparer = new ComparerMock();
					const queryValueSet = new QueryValueSet(comparer);
					expect(queryValueSet.count).equal(0);
					expect(queryValueSet.add([null,undefined,"","One","Two","Three"])).equal(6);
					expect(queryValueSet.count).equal(6);
					expect(queryValueSet.item(0)).is.null
					expect(queryValueSet.item(1)).equal("");
					expect(queryValueSet.item(2)).equal("One");
					expect(queryValueSet.item(3)).equal("Three");
					expect(queryValueSet.item(4)).equal("Two");
					expect(queryValueSet.item(5)).is.undefined; // Undefined always get last - https://stackoverflow.com/questions/4783242/javascript-array-sort-with-undefined-values
				});
				it("should not add the item if it already exist and return zero", () => {
					const comparer = new ComparerMock();
					const queryValueSet = new QueryValueSet(comparer);
					queryValueSet.add([null,undefined,"","One","Two","Three"]);
					expect(queryValueSet.count).equal(6);
					expect(queryValueSet.add(null)).equal(0);
					expect(queryValueSet.count).equal(6);
					expect(queryValueSet.add(undefined)).equal(0);
					expect(queryValueSet.count).equal(6);
					expect(queryValueSet.add("")).equal(0);
					expect(queryValueSet.count).equal(6);
					expect(queryValueSet.add("One")).equal(0);
					expect(queryValueSet.count).equal(6);
				});
				it("should not add the items if they already exist and return zero", () => {
					const comparer = new ComparerMock();
					const queryValueSet = new QueryValueSet(comparer);
					queryValueSet.add([null,undefined,"","One","Two","Three"]);
					expect(queryValueSet.count).equal(6);
					expect(queryValueSet.add([null,"One","",undefined,"",null,undefined,"One"])).equal(0);
					expect(queryValueSet.count).equal(6);
				});
				it("should sort the items", () => {
					const comparer = new ComparerMock();
					const queryValueSet = new QueryValueSet(comparer);
					expect(queryValueSet.count).equal(0);
					expect(queryValueSet.add([null,undefined,"","One","Two","Three"])).equal(6);
					expect(queryValueSet.count).equal(6);
					expect(queryValueSet.item(0)).is.null
					expect(queryValueSet.item(1)).equal("");
					expect(queryValueSet.item(2)).equal("One");
					expect(queryValueSet.item(3)).equal("Three");
					expect(queryValueSet.item(4)).equal("Two");
					expect(queryValueSet.item(5)).is.undefined; // Undefined always get last - https://stackoverflow.com/questions/4783242/javascript-array-sort-with-undefined-values
				});
			});
			describe("remove()", () => {
				it("should remove the item if it exists and return one", () => {
					const comparer = new ComparerMock();

					let queryValueSet = new QueryValueSet(comparer);
					expect(queryValueSet.count).equal(0);
					expect(queryValueSet.add([null,undefined,"","One","Two","Three"])).equal(6);
					expect(queryValueSet.count).equal(6);
					expect(queryValueSet.remove(undefined)).equal(1);
					expect(queryValueSet.count).equal(5);
					expect(queryValueSet.contains(undefined)).is.false;

					queryValueSet = new QueryValueSet(comparer);
					expect(queryValueSet.count).equal(0);
					expect(queryValueSet.add([null,undefined,"","One","Two","Three"])).equal(6);
					expect(queryValueSet.count).equal(6);
					expect(queryValueSet.remove(null)).equal(1);
					expect(queryValueSet.count).equal(5);
					expect(queryValueSet.contains(null)).is.false;
				});
			});
			describe("set()", () => {
				it("should remove previous items and then add the items and return the number of items added", () => {
					const comparer = new ComparerMock();
					let queryValueSet = new QueryValueSet(comparer);
					expect(queryValueSet.add([null,undefined,"","One","Two","Three"])).equal(6);
					expect(queryValueSet.count).equal(6);
					expect(queryValueSet.set(["Four","Five",undefined])).equal(3);
					expect(queryValueSet.count).equal(3);
				});
			});
			describe("toString()", () => {
				it("should return a string with comma separated items", () => {
					const comparer = new ComparerMock();
					let queryValueSet = new QueryValueSet(comparer);
					queryValueSet.add([null,undefined,"","One","Two","Three"]);
					expect(queryValueSet.toString()).equal(",,One,Three,Two,");
				});
			});
		});
	});
});