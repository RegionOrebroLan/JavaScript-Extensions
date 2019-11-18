import BasicComparer from "./BasicComparer";

export default class StringComparer extends BasicComparer<string> {
	// Fields
	private readonly _caseInsensitive: boolean;

	// Constructors
	public constructor(caseInsensitive: boolean) {
		super();
		this._caseInsensitive = caseInsensitive;
	}

	// Properties
	protected get caseInsensitive(): boolean {
		return this._caseInsensitive;
	}

	// Methods
	protected compareInternal(first: string, second: string): number {
		return this.stringCompareInternal(first, second);
	}

	protected equalsInternal(first: string, second: string): boolean {
		return this.stringCompareInternal(first, second) === 0;
	}

	protected stringCompareInternal(first: string, second: string): number {
		if (this.caseInsensitive) {
			first = first.toUpperCase();
			second = second.toUpperCase();
		}

		return first.localeCompare(second);
	}
}