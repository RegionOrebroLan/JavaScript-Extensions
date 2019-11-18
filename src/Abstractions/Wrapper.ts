import IWrapper from "./IWrapper";
import Utility from "../Utility";

export default abstract class Wrapper<T extends any> implements IWrapper<T> {
	// Fields
	private readonly _wrappedInstance: T;

	// Constructors
	protected constructor(wrappedInstance: T, parameterName?: string) {
		if (Utility.isNullOrUndefined(wrappedInstance))
			throw new Error(`The ${parameterName || "wrapped instance"} can not be null or undefined.`);

		this._wrappedInstance = wrappedInstance;
	}

	// Properties
	public get wrappedInstance(): T {
		return this._wrappedInstance;
    }

	// Methods
    public toString(): string {
	    return this.wrappedInstance.toString();
    }
}