import { assert, expect } from "chai";
import Utility from "../../src/Utility";

describe("Unit-tests", () => {
	describe("Utility", () => {
		describe("isNullOrUndefined()", () => {
			it("should return false if a variable that is set to an empty string is passed as parameter", () => {
				const variable = "";
				expect(Utility.isNullOrUndefined(variable)).is.false;
			});
			it("should return false if a variable that is set to false is passed as parameter", () => {
				const variable = false;
				expect(Utility.isNullOrUndefined(variable)).is.false;
			});
			it("should return false if a variable that is set to true is passed as parameter", () => {
				const variable = true;
				expect(Utility.isNullOrUndefined(variable)).is.false;
			});
			it("should return false if a variable that is set to zero is passed as parameter", () => {
				const variable = 0;
				expect(Utility.isNullOrUndefined(variable)).is.false;
			});
			it("should return true if a variable that is not declared is passed as parameter", () => {
				let variable;
				expect(Utility.isNullOrUndefined(variable)).is.true;
			});
			it("should return true if a variable that is set to null is passed as parameter", () => {
				const variable = null;
				expect(Utility.isNullOrUndefined(variable)).is.true;
			});
			it("should return true if null is passed directly as parameter", () => {
				expect(Utility.isNullOrUndefined(null)).is.true;
			});
			it("should return true if undefined is passed directly as parameter", () => {
				expect(Utility.isNullOrUndefined(undefined)).is.true;
			});
		});
		describe("Prerequisite test", () => {
			it("different checks that should work as expected", () => {
				let integer: any = 0;
				expect(integer).equal(0);
				expect(isNaN(integer)).is.false;

				integer = 10;
				expect(integer).equal(10);
				expect(isNaN(integer)).is.false;

				integer = -10;
				expect(integer).equal(-10);
				expect(isNaN(integer)).is.false;

				integer = true;
				expect(isNaN(integer)).is.false;

				integer = false;
				expect(isNaN(integer)).is.false;

				integer = null;
				expect(isNaN(integer)).is.false;

				let variable: any;
				expect(variable == undefined).is.true;
				expect(variable === undefined).is.true;
				expect(variable == null).is.true;
				expect(variable === null).is.false;

				variable = null;
				expect(variable == undefined).is.true;
				expect(variable === undefined).is.false;
				expect(variable == null).is.true;
				expect(variable === null).is.true;
			});
		});
	});
});