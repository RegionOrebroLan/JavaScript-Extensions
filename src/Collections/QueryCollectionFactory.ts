import IComparer from "./IComparer";
import IQueryCollection from "./IQueryCollection";
import IQueryCollectionFactory from "./IQueryCollectionFactory";
import IQueryParameterFactory from "./IQueryParameterFactory";
import QueryCollection from "./QueryCollection";
import Utility from "../Utility";

export default class QueryCollectionFactory implements IQueryCollectionFactory {
	// Fields
	private readonly _keyComparer: IComparer<string>;
	private readonly _queryParameterFactory: IQueryParameterFactory;

	// Constructors
	public constructor(keyComparer: IComparer<string>, queryParameterFactory: IQueryParameterFactory) {
		if(Utility.isNullOrUndefined(keyComparer))
			throw new Error("The key-comparer can not be null or undefined.")

		if(Utility.isNullOrUndefined(queryParameterFactory))
			throw new Error("The query-parameter-factory can not be null or undefined.")

		this._keyComparer = keyComparer;
		this._queryParameterFactory = queryParameterFactory;
	}

	// Properties
	protected get keyComparer(): IComparer<string> {
		return this._keyComparer;
	}

	protected get queryParameterFactory(): IQueryParameterFactory {
		return this._queryParameterFactory;
	}

	// Methods
	public create(changeHandler?: { (): void; }, query?: string): IQueryCollection {
		return new QueryCollection(this.keyComparer, this.queryParameterFactory, changeHandler, query);
	}
}