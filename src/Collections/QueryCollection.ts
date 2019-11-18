import IComparer from "./IComparer";
import IQueryCollection from "./IQueryCollection";
import IQueryParameter from "./IQueryParameter";
import IQueryParameterFactory from "./IQueryParameterFactory";
import QueryParameter from "./QueryParameter";
import QueryValueSet from "./QueryValueSet";
import ReadCollection from "./ReadCollection";
import URLSearchParams from "core-js/web/url-search-params";
import Utility from "../Utility";

export default class QueryCollection extends ReadCollection<IQueryParameter> implements IQueryCollection {
	// Fields
	private readonly _changeHandler: { (): void; };
	private readonly _keyComparer: IComparer<string>;
	private readonly _parameterFactory: IQueryParameterFactory;
	private static readonly _parameterSeparator: string = "&";
	private static readonly _questionMark: string = "?";

	// Constructors
	public constructor(keyComparer: IComparer<string>, parameterFactory: IQueryParameterFactory, changeHandler?: { (): void; }, query?: string) {
		if(Utility.isNullOrUndefined(keyComparer))
			throw new Error("The key-comparer can not be null or undefined.")

		if(Utility.isNullOrUndefined(parameterFactory))
			throw new Error("The parameter-factory can not be null or undefined.")

		super();

		this._changeHandler = (() => {});
		this._keyComparer = keyComparer;
		this._parameterFactory = parameterFactory;

		for(const entry of new URLSearchParams(query || "").entries()) {
			this.add(entry[0], entry[1].split(QueryValueSet.valueSeparator));
		}

		if(changeHandler)
			this._changeHandler = changeHandler;
	}

	// Properties
	protected  get changeHandler(): { (): void; } {
		return this._changeHandler;
	}

	protected get keyComparer(): IComparer<string> {
		return this._keyComparer;
	}

	protected get parameterFactory(): IQueryParameterFactory {
		return this._parameterFactory;
	}

	// Methods
	public add(key: string, values: any | any[]): number {
		const added = this.addInternal(key, values);

		if(added > 0)
			this.changeHandler();

		return added;
	}

	protected addInternal(key: string, values: any | any[]): number {
		let parameterCreated = false;
		let parameter = this.get(key);

		if(!parameter) {
			parameter = this.parameterFactory.create(key);
			parameterCreated = true;
		}

		const added = parameter.values.add(values);

		if(added > 0 && parameterCreated) {
			this.items.push(parameter);

			this.items.sort((first, second) => {
				return this.keyComparer.compare(first.key, second.key);
			});
		}

		return added;
	}

	public clear(): void {
		const count = this.count;

		this.items.length = 0;

		if(count > 0)
			this.changeHandler();
	}

	public get(key: string): IQueryParameter | null {
		for(const item of this.items) {
			if(this.keyComparer.equals(key, item.key))
				return item;
		}

		return null;
	}

	public remove(key: string, values?: any | any[]): number {
		const result = this.removeInternal(key, values);

		if(result[0] || result[1] > 0)
			this.changeHandler();

		return result[1];
	}

	protected removeInternal(key: string, values?: any | any[]): [boolean, number] {
		let keyRemoved = false;
		let valuesRemoved = 0;

		for(let i = this.count - 1; i >= 0; i--) {
			let parameter = this.items[i];
			if(this.keyComparer.equals(key, parameter.key)) {
				valuesRemoved = values ? parameter.values.remove(values) : parameter.values.count;

				if(!values) {
					this.items.splice(i, 1);
					keyRemoved = true;
				}

				break;
			}
		}

		return [keyRemoved, valuesRemoved];
	}

	public set(key: string, values: any | any[]): number {
		const removeResult = this.removeInternal(key);
		const added = this.addInternal(key, values);

		if(added > 0 || removeResult[0] || removeResult[1] > 0)
			this.changeHandler();

		return added;
	}

	public toString(): string {
		return this.toUrlString();
	}

	public toUrlString(encode: boolean = true): string {
		const parts: string[] = [];

		this.forEach((item) => {
			let key = item.key;
			let valueString = item.values.toString();

			if(encode) {
				key = encodeURIComponent(key);
				valueString = encodeURIComponent(valueString).replace(/%2C/g, "%2c");
			}

			parts.push(key + QueryParameter.keyValueSeparator + valueString);
		});

		return (parts.length > 0 ? QueryCollection._questionMark : "") + parts.join(QueryCollection._parameterSeparator);
	}
}