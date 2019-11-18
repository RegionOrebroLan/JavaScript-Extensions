import { expect } from "chai";
import Uri from "urijs";

describe("URI.js prerequisite tests", () => {
	describe("constructor()", () => {
		it("if no parameter", () => {
			expect(new Uri().toString()).equal("");
		});
		it("should throw an error if parameter is null", () => {
			const value: any = null;
			expect(() => {new Uri(value);}).to.throw("null is not a valid argument for URI");
		});
		it("whitespace-test", () => {
			expect(new Uri(" ").toString()).equal(" ");
			expect(new Uri("     ").toString()).equal("     ");
		});
	});
	describe("direct construction", () => {
		it("if no parameter", () => {
			expect(Uri().toString()).equal("");
		});
		it("should throw an error if parameter is null", () => {
			const value: any = null;
			expect(() => {Uri(value);}).to.throw("null is not a valid argument for URI");
		});
		it("whitespace-test", () => {
			expect(Uri(" ").toString()).equal(" ");
			expect(Uri("     ").toString()).equal("     ");
		});
	});
	describe("parseQuery()", () => {
		it("test-1", () => {
			expect(Object.getOwnPropertyNames(Uri.parseQuery("Key-1=One,Two,Three&Key-2=One")).length).equal(2);
		});
		it("test-2", () => {
			expect(Object.getOwnPropertyNames(Uri.parseQuery("Key-1=One,Two,Three&key-1=One,Two%2cThree&Key-2=One")).length).equal(3);
		});
		it("test-3", () => {
			expect(Object.getOwnPropertyNames(Uri.parseQuery("Key-1=One,Two,Three&key-1=One,Two%2cThree&Key-2=One&Key-2=Two")).length).equal(3);
		});
		it("test-4", () => {
			const query = Uri.parseQuery("Key-1=One,Two,Three&key-1=One,Two%2cThree&Key-2=One&Key-2=Two&Key-1=Four%2cFive%2cFive%2cSix%2cOne%2cTwo");
			expect(Object.getOwnPropertyNames(query).length).equal(3);
			expect(Object.getOwnPropertyNames(query)[0]).equal("Key-1");
			expect(Object.getOwnPropertyNames(query)[1]).equal("key-1");
			expect(Object.getOwnPropertyNames(query)[2]).equal("Key-2");
		});
		it("test-5", () => {
			const query = Uri.parseQuery("Key-1=One,Two,Three&key-1=One,Two%2cThree&Key-2=One&Key-2=Two&Key-1=Four%2cFive%2cFive%2cSix%2cOne%2cTwo");
			expect(query["Key-1"].length).equal(2);
			expect(query["key-1"].length).equal(13); // This is a string
			expect(query["Key-2"].length).equal(2);
		});
	});
	describe("scheme()", () => {
		it("test-1", () => {
			expect(Uri("http://localhost/").scheme()).equal("http");
		});
	});
});