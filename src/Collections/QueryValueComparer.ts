import BasicComparer from "./BasicComparer";
import StringComparer from "./StringComparer";
import IComparer from "./IComparer";

export default class QueryValueComparer extends BasicComparer<any> {
	// Fields
	private readonly _stringComparer: IComparer<string>;

	// Constructors
	public constructor(caseInsensitive: boolean) {
		super();
		this._stringComparer = new StringComparer(caseInsensitive);
	}

	// Properties
	protected get stringComparer(): IComparer<string> {
		return this._stringComparer;
	}

	// Methods
	protected compareInternal(first: any, second: any): number {
		first = this.tryGetValueAsInteger(first);
		second = this.tryGetValueAsInteger(second);

		if(first && typeof first === "number")
		{
			if(second && typeof second === "number") {
				const firstNumber: number = first;
				const secondNumber: number = second;
				return firstNumber - secondNumber;
			}

			return -1;
		}

		if(second && typeof second === "number")
			return 1;

		return this.stringComparer.compare(first, second);
	}

	protected equalsInternal(first: any, second: any): boolean {
		return this.compareInternal(first, second) === 0;
	}

	protected tryGetValueAsInteger(value: any): any {
		if(value && typeof value === "string")
		{
			const integer = parseInt(value);
			if(!isNaN(integer))
				return integer;
		}

		return value;
	}
}