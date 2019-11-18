import IQueryCollectionFactory from "./Collections/IQueryCollectionFactory";
import IUri from "./IUri";
import IUriBuilder from "./IUriBuilder";
import IUriBuilderFactory from "./IUriBuilderFactory";
import UriBuilder from "./UriBuilder";
import Utility from "./Utility";

export default class UriBuilderFactory implements IUriBuilderFactory {
	// Fields
	private readonly _queryCollectionFactory: IQueryCollectionFactory;

	// Constructors
	public constructor(queryCollectionFactory: IQueryCollectionFactory) {
		if (Utility.isNullOrUndefined(queryCollectionFactory))
			throw new Error("The query-collection-factory can not be null or undefined.");

		this._queryCollectionFactory = queryCollectionFactory;
	}

	// Properties
	protected get queryCollectionFactory(): IQueryCollectionFactory {
		return this._queryCollectionFactory;
	}

	// Methods
	public create(uri?: string | IUri): IUriBuilder {
		return new UriBuilder(this.queryCollectionFactory);
	}
}