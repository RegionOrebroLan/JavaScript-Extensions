import { expect } from "chai";
import IQueryCollectionFactory from "../../../src/Collections/IQueryCollectionFactory";
import QueryCollectionFactory from "../../../src/Collections/QueryCollectionFactory";
import QueryCollectionParser from "../../../src/Collections/QueryCollectionParser";
import QueryParameterFactory from "../../../src/Collections/QueryParameterFactory";
import QueryValueComparer from "../../../src/Collections/QueryValueComparer";
import QueryValueSetFactory from "../../../src/Collections/QueryValueSetFactory";
import StringComparer from "../../../src/Collections/StringComparer";

const queryCollectionFactory: IQueryCollectionFactory = new QueryCollectionFactory(new StringComparer(true), new QueryParameterFactory(new QueryValueSetFactory(new QueryValueComparer(true))));

function createQueryCollectionParser(): QueryCollectionParser {
	return new QueryCollectionParser(queryCollectionFactory);
}

describe("Integration-tests", () => {
	describe("Collections", () => {
		describe("QueryCollectionParser", () => {
			describe("parse()", () => {
				it("should return a result where valid is true and value is null if parameter is null", () => {
					const value: any = null;
					const result = createQueryCollectionParser().parse(value);
					expect(result.valid).is.true;
					expect(result.value).is.null;
				});
			});
		});
	});
});