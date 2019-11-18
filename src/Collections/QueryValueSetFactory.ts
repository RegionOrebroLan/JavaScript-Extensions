import IComparer from "./IComparer";
import IQueryValueSet from "./IQueryValueSet";
import IQueryValueSetFactory from "./IQueryValueSetFactory";
import QueryValueSet from "./QueryValueSet";
import Utility from "../Utility";

export default class QueryValueSetFactory implements IQueryValueSetFactory {
	// Fields
	private readonly _valueComparer: IComparer<any>;

	// Constructors
	public constructor(valueComparer: IComparer<any>) {
		if(Utility.isNullOrUndefined(valueComparer))
			throw new Error("The value-comparer can not be null or undefined.")

		this._valueComparer = valueComparer;
	}

	// Properties
	protected get valueComparer(): IComparer<any> {
		return this._valueComparer;
	}

	// Methods
	public create(): IQueryValueSet {
		return new QueryValueSet(this.valueComparer);
	}
}