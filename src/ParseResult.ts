import IParseResult from "./IParseResult";

export default class ParseResult<T> implements IParseResult<T> {
	// Fields
	private readonly _errors: Error[];
	private readonly _value: T | null;

	// Constructors
	public constructor(errors?: Error | Error[] | null, value?: T | null) {
		if (errors instanceof Error)
			errors = [errors];

		this._errors = errors || [];
		this._value = value || null;
	}

	// Properties
	public get errors(): Error[] {
		return this._errors;
	}

	public get valid(): boolean {
		return this.errors.length === 0;
	}

	public get value(): T | null {
		return this._value;
	}
}