import IQueryParameter from "./IQueryParameter";
import IQueryParameterFactory from "./IQueryParameterFactory";
import IQueryValueSetFactory from "./IQueryValueSetFactory";
import QueryParameter from "./QueryParameter";
import Utility from "../Utility";

export default class QueryParameterFactory implements IQueryParameterFactory {
	// Fields
	private readonly _valueSetFactory: IQueryValueSetFactory;

	// Constructors
	public constructor(valueSetFactory: IQueryValueSetFactory) {
		if(Utility.isNullOrUndefined(valueSetFactory))
			throw new Error("The value-set-factory can not be null or undefined.")

		this._valueSetFactory = valueSetFactory;
	}

	protected get valueSetFactory(): IQueryValueSetFactory {
		return this._valueSetFactory;
	}

	// Methods
	public create(key: string): IQueryParameter {
		return new QueryParameter(key, this.valueSetFactory);
	}
}