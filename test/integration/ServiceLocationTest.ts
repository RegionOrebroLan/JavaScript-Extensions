import { expect } from "chai";
import EPiServerQueryValueComparer from "../../src/EPiServer/Collections/QueryValueComparer";
import EPiServerServiceProvider from "../../src/EPiServer/ServiceProvider";
import QueryCollectionFactory from "../../src/Collections/QueryCollectionFactory";
import QueryCollectionParser from "../../src/Collections/QueryCollectionParser";
import QueryParameterFactory from "../../src/Collections/QueryParameterFactory";
import QueryValueSetFactory from "../../src/Collections/QueryValueSetFactory";
import ServiceLocation from "../../src/ServiceLocation";
import UriBuilderFactory from "../../src/UriBuilderFactory";

describe("Integration-tests", () => {
	describe("ServiceLocation", () => {
		describe("instance", () => {
			describe("get", () => {
				it("should return a default populated instance if not set", () => {
					ServiceLocation.setInstance(null);
					const instance = ServiceLocation.instance;
					expect(instance).is.not.null.and.is.not.undefined;
					expect(instance.queryCollectionFactory instanceof QueryCollectionFactory).is.true;
					expect(instance.queryCollectionParser instanceof QueryCollectionParser).is.true;
					expect(instance.queryParameterFactory instanceof QueryParameterFactory).is.true;
					expect(instance.queryValueSetFactory instanceof QueryValueSetFactory).is.true;
					expect(instance.uriBuilderFactory instanceof UriBuilderFactory).is.true;
				});
			});
			describe("set", () => {
				it("should set the instance", () => {
					ServiceLocation.setInstance(new EPiServerServiceProvider());
					const instance = ServiceLocation.instance;
					expect(instance.queryCollectionFactory instanceof QueryCollectionFactory).is.true;
					expect(instance.queryCollectionParser instanceof QueryCollectionParser).is.true;
					expect(instance.queryParameterFactory instanceof QueryParameterFactory).is.true;
					expect(instance.queryValueSetFactory instanceof QueryValueSetFactory).is.true;
					expect(instance.uriBuilderFactory instanceof UriBuilderFactory).is.true;

					expect(instance.queryValueSetFactory["_valueComparer"] instanceof EPiServerQueryValueComparer).is.true;
				});
			});
		});
	});
});