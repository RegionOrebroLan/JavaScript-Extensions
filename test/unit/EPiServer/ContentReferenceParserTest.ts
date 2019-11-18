import { expect } from "chai";
import ContentReferenceParser from "../../../src/EPiServer/ContentReferenceParser";

describe("Unit-tests", () => {
	describe("EPiServer", () => {
		describe("ContentReferenceParser", () => {
			describe("parse()", () => {
				it("should return a valid result with an empty content-reference if the parameter is an empty string", () => {
					const result = new ContentReferenceParser().parse("");
					expect(result.valid).is.true;
					expect(result.value).is.not.null;
					expect(result.value).is.not.undefined;
					expect(result.value ? result.value.id : Number.MIN_SAFE_INTEGER).equal(0);
					expect(Number.MIN_SAFE_INTEGER).equal(-9007199254740991);
				});
				it("should return an invalid result with a null-value if the parameter is a whitespace-string", () => {
					const result = new ContentReferenceParser().parse(" ");
					expect(result.valid).is.false;
					expect(result.value).is.null;
				});
				it("should return an invalid result with a null-value if the parameter is null", () => {
					const result = new ContentReferenceParser().parse(null as any);
					expect(result.valid).is.false;
					expect(result.value).is.null;
				});
				it("should return an invalid result with a null-value if the parameter is undefined", () => {
					const result = new ContentReferenceParser().parse(undefined as any);
					expect(result.valid).is.false;
					expect(result.value).is.null;
				});
			});
		});
	});
});