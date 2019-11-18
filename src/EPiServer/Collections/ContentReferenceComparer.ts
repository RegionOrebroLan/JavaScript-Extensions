import BasicComparer from "../../Collections/BasicComparer";
import IComparer from "../../Collections/IComparer";
import IContentReference from "../IContentReference";
import Utility from "../../Utility";

export default class ContentReferenceComparer extends BasicComparer<IContentReference> {
	// Fields
	private readonly _providerComparer: IComparer<string>;
	private readonly _versionInsensitive: boolean;

	// Constructors
	public constructor(providerComparer: IComparer<string>, versionInsensitive: boolean) {
		super();

		if (Utility.isNullOrUndefined(providerComparer))
			throw new Error("The provider-comparer can not be null.");

		this._providerComparer = providerComparer;
		this._versionInsensitive = versionInsensitive;
	}

	// Properties
	protected get providerComparer(): IComparer<string> {
		return this._providerComparer;
	}

	protected get versionInsensitive(): boolean {
		return this._versionInsensitive;
	}

	// Methods
	protected compareInternal(first: IContentReference, second: IContentReference): number {
		let compare = this.providerComparer.compare(first.provider || "", second.provider || "");

		if (compare !== 0)
			return compare;

		const firstId = first.id;
		const secondId = second.id;

		compare = firstId - secondId;

		if (this.versionInsensitive || compare !== 0)
			return compare;

		const firstVersion = !Utility.isNullOrUndefined(first.version) ? (first.version as number) : 0;
		const secondVersion = !Utility.isNullOrUndefined(second.version) ? (second.version as number) : 0;

		return firstVersion - secondVersion;
	}

    protected equalsInternal(first: IContentReference, second: IContentReference): boolean {
	    return this.compareInternal(first, second) === 0;
    }
}