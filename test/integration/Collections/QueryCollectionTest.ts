import { expect } from "chai";
import IComparer from "../../../src/Collections/IComparer";
import IQueryParameterFactory from "../../../src/Collections/IQueryParameterFactory";
import QueryCollection from "../../../src/Collections/QueryCollection";
import QueryParameterFactory from "../../../src/Collections/QueryParameterFactory";
import QueryValueComparer from "../../../src/Collections/QueryValueComparer";
import QueryValueSetFactory from "../../../src/Collections/QueryValueSetFactory";
import StringComparer from "../../../src/Collections/StringComparer";

const keyComparer: IComparer<string> = new StringComparer(true);
const queryParameterFactory: IQueryParameterFactory = new QueryParameterFactory(new QueryValueSetFactory(new QueryValueComparer(true)));

function createQueryCollection(changeHandler?: { (): void; }, query?: string): QueryCollection {
	return new QueryCollection(keyComparer, queryParameterFactory, changeHandler, query);
}

describe("Integration-tests", () => {
	describe("Collections", () => {
		describe("QueryCollection", () => {
			describe("constructor()", () => {
				it("should not throw an exception if the change-handler is undefined", () => {
					expect(createQueryCollection(undefined, undefined)).is.not.null.and.is.not.undefined;
				});
				it("should fill if sksks", () => {
					let queryCollection = createQueryCollection(undefined, "?Key-1=One,Two,Three&Key-2=One%2cTwo%2cThree");
					expect(queryCollection.count).equal(2);
					expect(queryCollection.item(0).key).equal("Key-1");
					expect(queryCollection.item(1).key).equal("Key-2");

					queryCollection = createQueryCollection(undefined, "?Key-2=One,Two,Three&Key-1=One%2cTwo%2cThree");
					expect(queryCollection.count).equal(2);
					expect(queryCollection.item(0).key).equal("Key-1");
					expect(queryCollection.item(1).key).equal("Key-2");
				});
			});
		});
	});
});