import { expect } from "chai";
import Wrapper from "../../../src/Abstractions/Wrapper";

class WrapperMock<T> extends Wrapper<T> {
	public constructor(wrappedInstance: T) {
		super(wrappedInstance);
	}
}

describe("Unit-tests", () => {
	describe("Abstractions", () => {
		describe("Wrapper", () => {
			describe("constructor()", () => {
				it("should throw an error if the wrapped instance parameter is null", () => {
					expect(() => {new WrapperMock<any>(null);}).to.throw("The wrapped instance can not be null or undefined.");
					expect(() => {new WrapperMock<number | null>(null);}).to.throw("The wrapped instance can not be null or undefined.");
					expect(() => {new WrapperMock<string | null>(null);}).to.throw("The wrapped instance can not be null or undefined.");
				});
				it("should throw an error if the wrapped instance parameter is undefined", () => {
					expect(() => {new WrapperMock<any>(undefined);}).to.throw("The wrapped instance can not be null or undefined.");
					expect(() => {new WrapperMock<number | undefined>(undefined);}).to.throw("The wrapped instance can not be null or undefined.");
					expect(() => {new WrapperMock<string | undefined>(undefined);}).to.throw("The wrapped instance can not be null or undefined.");
				});
			});
			describe("toString()", () => {
				it("should call toString() of the wrapped instance", () => {
					expect(new WrapperMock<object>(new Object()).toString()).equal("[object Object]");
					expect(new WrapperMock<number>(7).toString()).equal("7");
					expect(new WrapperMock<string>("Test").toString()).equal("Test");
				});
			});
		});
	});
});



