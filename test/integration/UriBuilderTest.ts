import { expect } from "chai";
import IQueryCollectionFactory from "../../src/Collections/IQueryCollectionFactory";
import IUri from "../../src/IUri";
import QueryCollectionFactory from "../../src/Collections/QueryCollectionFactory";
import QueryParameterFactory from "../../src/Collections/QueryParameterFactory";
import QueryValueComparer from "../../src/Collections/QueryValueComparer";
import QueryValueSetFactory from "../../src/Collections/QueryValueSetFactory";
import StringComparer from "../../src/Collections/StringComparer";
import Uri from "urijs";
import UriBuilder from "../../src/UriBuilder";
import UriWrapper from "../../src/UriWrapper";

const queryCollectionFactory: IQueryCollectionFactory = new QueryCollectionFactory(new StringComparer(true), new QueryParameterFactory(new QueryValueSetFactory(new QueryValueComparer(true))));

function createUriBuilder(uri?: string | IUri): UriBuilder {
	return new UriBuilder(queryCollectionFactory, uri);
}

describe("Integration-tests", () => {
	describe("UriBuilder", () => {
		describe("constructor()", () => {
			it("should create an empty uri-builder if no uri-parameter", () => {
				const uriBuilder = createUriBuilder();
				expect(uriBuilder.fragment).is.empty;
				expect(uriBuilder.port).is.null;
			});
			it("should work correctly if the parameter is a valid url-string", () => {
				const uriBuilder = createUriBuilder("http://company.net:1234/a/");
				expect(uriBuilder.fragment).is.empty;
				expect(uriBuilder.port).equal(1234);
			});
			it("should work correctly if the parameter is a uri", () => {
				const uriBuilder = createUriBuilder(new UriWrapper(new Uri("http://company.net:1234/a/")));
				expect(uriBuilder.fragment).is.empty;
				expect(uriBuilder.port).equal(1234);
			});
		});
		describe("fragment", () => {
			it("should return correctly when set", () => {
				const uriBuilder = createUriBuilder();
				expect(uriBuilder.fragment).is.empty;

				uriBuilder.fragment = "test";
				expect(uriBuilder.fragment).equal("test");
				expect(uriBuilder.toString()).equal("/#test");

				uriBuilder.fragment = "TeSt";
				expect(uriBuilder.fragment).equal("TeSt");
				expect(uriBuilder.toString()).equal("/#TeSt");

				uriBuilder.fragment = "#test";
				expect(uriBuilder.fragment).equal("test");
				expect(uriBuilder.toString()).equal("/#test");

				uriBuilder.fragment = "##test";
				expect(uriBuilder.fragment).equal("#test");
				expect(uriBuilder.toString()).equal("/#test");

				uriBuilder.fragment = "###test";
				expect(uriBuilder.fragment).equal("##test");
				expect(uriBuilder.toString()).equal("/##test");
			});
		});
		describe("query", () => {
			it("test-1", () => {
				const uriBuilder = createUriBuilder("https://company.com/a/b/c/?Key-1=One,Two,Three&Key-2=4,3,2,1#my-fragment");
				expect(uriBuilder.query.toString()).equal("?Key-1=One%2cThree%2cTwo&Key-2=1%2c2%2c3%2c4");
			});
		});
		describe("port", () => {
			it("should return correctly when set", () => {
				const uriBuilder = createUriBuilder();
				expect(uriBuilder.port).is.null;

				uriBuilder.port = 1234;
				expect(uriBuilder.port).equal(1234);

				uriBuilder.port = parseInt("not a number");
				expect(uriBuilder.port).is.null;

				uriBuilder.port = null;
				expect(uriBuilder.port).is.null;
			});
		});
		describe("toString()", () => {

		});
		describe("uri", () => {
			it("should return the same instance until the uri-builder is modified", () => {
				const uriBuilder = createUriBuilder();

				let uri = uriBuilder.uri;
				expect(uri).equal(uriBuilder.uri);

				uriBuilder.fragment = "test";
				expect(uri).not.equal(uriBuilder.uri);

				uri = uriBuilder.uri;
				expect(uri).equal(uriBuilder.uri);
			});
		});
	});
});