import { expect } from "chai";
import ContentReference from "../src/EPiServer/ContentReference";
import IContentReference from "../src/EPiServer/IContentReference";

describe("Experimental tests", () => {
	describe("equal or equals", () => {
		it("equal()", () => {
			expect(1).equal(1);
		});
		it("equals()", () => {
			expect(1).equals(1);
		});
	});
	describe("number", () => {
		it("empty string as number", () => {
			let value: any = "";
			expect(value as number).equal("");
		});
		it("empty string as number is a number", () => {
			let value: any = "";
			expect(isNaN(value as number)).is.false;
		});
		it("string as number", () => {
			let value: any = "Test";
			expect(value as number).equal("Test");
		});
		it("string as number is not a number", () => {
			let value: any = "Test";
			expect(isNaN(value as number)).is.true;
		});
	});
	describe("typeof", () => {
		it("test-1", () => {
			const value: any = null;
			expect(typeof value).equal("object");
		});
		it("test-2", () => {
			const value: any = "";
			expect(typeof value).equal("string");
		});
		it("test-3", () => {
			const value: any = "1";
			expect(typeof value).equal("string");
		});
		it("test-4", () => {
			const value: any = 1;
			expect(typeof value).equal("number");
		});
		it("test-5", () => {
			const value: IContentReference = new ContentReference(1);
			expect(value instanceof ContentReference).is.true;
		});
	});
	describe("(variable instanceof Error)", () => {
		it("should return false when the variable is null", () => {
			let variable: any = null;
			expect(variable instanceof Error).is.false;
		});
		it("should return false when the variable is undefined", () => {
			let variable: any = undefined;
			expect(variable instanceof Error).is.false;
		});
	});
});