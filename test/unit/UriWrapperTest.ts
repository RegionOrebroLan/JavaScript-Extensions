import { expect } from "chai";
import Uri from "urijs";
import UriWrapper from "../../src/UriWrapper";

describe("Unit-tests", () => {
	describe("UriWrapper", () => {
		//describe("constructor()", () => {
		//	it("should throw an error if the uri parameter is null", () => {
		//		expect(() => {new UriWrapper(null);}).to.throw("The uri can not be null or undefined.");
		//	});
		//	it("should throw an error if the uri parameter is undefined", () => {
		//		expect(() => {new UriWrapper(undefined);}).to.throw("The uri can not be null or undefined.");
		//	});
		//});
		describe("authority", () => {
			it("should return the host and port", () => {
				expect(new UriWrapper(new Uri("http://localhost:8080/a/b/c/")).authority).equal("localhost:8080");
			});
		});
		describe("host", () => {
			it("should return the host", () => {
				expect(new UriWrapper(new Uri("http://localhost:8080/a/b/c/")).host).equal("localhost");
			});
		});
		describe("path", () => {
			it("should return the path", () => {
				expect(new UriWrapper(new Uri("http://localhost")).path).equal("/");
				expect(new UriWrapper(new Uri("http://localhost:8080")).path).equal("/");
				expect(new UriWrapper(new Uri("http://localhost:8080/a/b/c")).path).equal("/a/b/c");
				expect(new UriWrapper(new Uri("http://localhost:8080/a/b/c/")).path).equal("/a/b/c/");
			});
		});
		describe("port", () => {
			it("should return null if the wrapped uri contains an empty port", () => {
				expect(new UriWrapper(new Uri("http://localhost:/a/b/c/")).port).is.null;
			});
			it("should return null if the wrapped uri contains no port", () => {
				expect(new UriWrapper(new Uri("http://localhost/a/b/c/")).port).is.null;
			});
			it("should return the port number if the wrapped uri contains a port", () => {
				expect(new UriWrapper(new Uri("http://localhost:8080/a/b/c/")).port).equal(8080);
			});
		});
		describe("Prerequisite test", () => {
			describe("URI.js", () => {
				it("different checks that should work as expected", () => {
					let uri = new Uri();
					expect(uri.toString()).is.empty;
					uri.scheme("http");
					expect(uri.toString()).equal("http:///");

					uri = new Uri();
					uri.host("test");
					expect(uri.toString()).equal("//test/");

					uri = new Uri();
					uri.port("8080");
					expect(uri.port()).equal("8080");
					expect(uri.toString()).is.empty;

					uri = new Uri();
					uri.host("test")
					uri.port("8080");
					expect(uri.toString()).equal("//test:8080/");

					uri = new Uri();
					uri.path("test")
					uri.port("8080");
					expect(uri.toString()).equal("test");

					uri = new Uri();
					uri.host("test")
					uri.path("test")
					uri.port("8080");
					expect(uri.toString()).equal("//test:8080/test");
				});
				describe("host()", () => {
					it("should return an empty string if the uri is constructed without parameter", () => {
						expect(new Uri().host()).is.empty;
					});
				});
				describe("path()", () => {
					it("should return an empty string if the uri is constructed without parameter", () => {
						expect(new Uri().path()).is.empty;
					});
				});
				describe("port()", () => {
					it("should return an empty string if the uri is constructed without parameter", () => {
						expect(new Uri().port()).is.empty;
					});
				});
			});
		});
		describe("toString()", () => {
			it("should call toString() of the wrapped uri", () => {
				expect(new UriWrapper(new Uri("http://localhost:8080/a/b/c")).toString()).equal("http://localhost:8080/a/b/c");
				expect(new UriWrapper(new Uri("http://localhost:8080/a/b/c/")).toString()).equal("http://localhost:8080/a/b/c/");
				expect(new UriWrapper(new Uri("hTTp://LoCaLhOsT/a/B/c/")).toString()).equal("hTTp://LoCaLhOsT/a/B/c/");
			});
		});
	});
});