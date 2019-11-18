import IQueryParameter from "./IQueryParameter";
import IQueryValueSet from "./IQueryValueSet";
import IQueryValueSetFactory from "./IQueryValueSetFactory";
import Utility from "../Utility";

export default class QueryParameter implements IQueryParameter {
	// Fields
	private readonly _key: string;
	private readonly _values: IQueryValueSet;
	public static readonly keyValueSeparator: string = "=";

	// Constructors
	public constructor(key: string, valueSetFactory: IQueryValueSetFactory) {
		if(Utility.isNullOrUndefined(key))
			throw new Error("The key can not be null or undefined.")

		if(Utility.isNullOrUndefined(valueSetFactory))
			throw new Error("The value-set-factory can not be null or undefined.")

		this._key = key;
		this._values = valueSetFactory.create();
	}

	// Properties
	public get key(): string {
		return this._key;
	}

	public get values(): IQueryValueSet {
		return this._values;
	}
}