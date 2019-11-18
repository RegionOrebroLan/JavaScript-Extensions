import { expect } from "chai";
import ContentReference from "../../../src/EPiServer/ContentReference";
import ContentReferenceComparer from "../../../src/EPiServer/Collections/ContentReferenceComparer";
import StringComparer from "../../../src/Collections/StringComparer";

function createContentReferenceComparer(versionInsensitive: boolean): ContentReferenceComparer {
	return new ContentReferenceComparer(new StringComparer(true), versionInsensitive);
}

describe("Integration-tests", () => {
	describe("EPiServer", () => {
		describe("ContentReferenceComparer", () => {
			describe("compare()", () => {
				it("test-1", () => {
					expect(createContentReferenceComparer(true).compare(new ContentReference(1), new ContentReference(1))).equal(0);
				});
				it("test-2", () => {
					expect(createContentReferenceComparer(true).compare(new ContentReference(1), new ContentReference(1, undefined, undefined))).equal(0);
				});
				it("test-3", () => {
					expect(createContentReferenceComparer(true).compare(new ContentReference(1), new ContentReference(1, "", 0))).equal(0);
				});
				it("test-4", () => {
					expect(createContentReferenceComparer(true).compare(new ContentReference(1, "Test"), new ContentReference(10))).equal(1);
				});
				it("test-5", () => {
					expect(createContentReferenceComparer(true).compare(new ContentReference(1, undefined, 1), new ContentReference(1))).equal(0);
				});
			});
			describe("equals()", () => {
				it("test-1", () => {
					expect(createContentReferenceComparer(true).equals(new ContentReference(1), new ContentReference(1))).is.true;
				});
				it("test-2", () => {
					expect(createContentReferenceComparer(true).equals(new ContentReference(1), new ContentReference(1, undefined, undefined))).is.true;
				});
				it("test-3", () => {
					expect(createContentReferenceComparer(true).equals(new ContentReference(1), new ContentReference(1, "", 0))).is.true;
				});
				it("test-4", () => {
					expect(createContentReferenceComparer(true).equals(new ContentReference(1, "Test"), new ContentReference(10))).is.false;
				});
			});
		});
	});
});