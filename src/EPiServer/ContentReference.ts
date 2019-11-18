import IContentReference from "./IContentReference";
import Utility from "../Utility";

export default class ContentReference implements IContentReference {
	// Fields
	private readonly _id: number;
	private readonly _provider: string;
	private readonly _version: number | null;

	// Constructors
	public constructor(id: number, provider?: string, version?: number) {
		if (Utility.isNullOrUndefined(id))
			throw new Error("The id can not be null.");

		if (isNaN(id))
			throw new Error("The id is not a number.");

		if (id < 0)
			throw new Error("The id can not be less than zero.");

		if (!Utility.isNullOrUndefined(provider) && (provider as string).indexOf("_") > -1)
			throw new Error("The provider can not contain underscores.");

		if(!Utility.isNullOrUndefined(version) && isNaN(version as number))
			throw new Error("The version is not a number.");

		if ((version as number) < 0)
			throw new Error("The version can not be less than zero.");

		this._id = id;
		this._provider = provider || "";
		this._version = Utility.isNullOrUndefined(version) || version === 0 ? null : (version as number);
	}

	// Properties
	public get id(): number {
		return this._id;
	}

	public get provider(): string {
		return this._provider;
	}

	public get version(): number | null {
		return this._version;
	}
}