import IComparer from "./Collections/IComparer";
import IParser from "./IParser";
import IQueryCollection from "./Collections/IQueryCollection";
import IQueryCollectionFactory from "./Collections/IQueryCollectionFactory";
import IQueryParameterFactory from "./Collections/IQueryParameterFactory";
import IQueryValueSetFactory from "./Collections/IQueryValueSetFactory";
import IServiceProvider from "./IServiceProvider";
import IUriBuilderFactory from "./IUriBuilderFactory";
import QueryCollectionFactory from "./Collections/QueryCollectionFactory";
import QueryCollectionParser from "./Collections/QueryCollectionParser";
import QueryParameterFactory from "./Collections/QueryParameterFactory";
import QueryValueComparer from "./Collections/QueryValueComparer";
import QueryValueSetFactory from "./Collections/QueryValueSetFactory";
import StringComparer from "./Collections/StringComparer";
import UriBuilderFactory from "./UriBuilderFactory";

export default class ServiceProvider implements IServiceProvider {
	// Fields
	private _queryCollectionFactory: IQueryCollectionFactory | null = null;
	private _queryCollectionParser: IParser<IQueryCollection> | null = null;
	private _queryParameterFactory: IQueryParameterFactory | null = null;
	private _queryValueComparer: IComparer<any> | null = null;
	private _queryValueSetFactory: IQueryValueSetFactory | null = null;
	private _uriBuilderFactory: IUriBuilderFactory | null = null;

	// Properties
	public get queryCollectionFactory(): IQueryCollectionFactory {
		if(!this._queryCollectionFactory)
			this._queryCollectionFactory = new QueryCollectionFactory(new StringComparer(true), this.queryParameterFactory);

		return this._queryCollectionFactory;
	}

	public get queryCollectionParser(): IParser<IQueryCollection> {
		if(!this._queryCollectionParser)
			this._queryCollectionParser = new QueryCollectionParser(this.queryCollectionFactory);

		return this._queryCollectionParser;
	}

	public get queryParameterFactory(): IQueryParameterFactory {
		if(!this._queryParameterFactory)
			this._queryParameterFactory = new QueryParameterFactory(this.queryValueSetFactory);

		return this._queryParameterFactory;
	}

	protected get queryValueComparer(): IComparer<any> {
		if(!this._queryValueComparer)
			this._queryValueComparer = new QueryValueComparer(true);

		return this._queryValueComparer;
	}

	public get queryValueSetFactory(): IQueryValueSetFactory {
		if(!this._queryValueSetFactory)
			this._queryValueSetFactory = new QueryValueSetFactory(this.queryValueComparer);

		return this._queryValueSetFactory;
	}

	public get uriBuilderFactory(): IUriBuilderFactory {
		if(!this._uriBuilderFactory)
			this._uriBuilderFactory = new UriBuilderFactory(this.queryCollectionFactory);

		return this._uriBuilderFactory;
	}
}