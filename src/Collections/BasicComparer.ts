import IComparer from "./IComparer";
import Utility from "../Utility";

export default abstract class BasicComparer<T> implements IComparer<T> {
	// Methods
	public compare(first: T, second: T): number {
		const compare = this.nullCompareInternal(first, second);
		return compare === null || isNaN(compare) ? this.compareInternal(first, second) : compare;
	}

	protected compareInternal(first: T, second: T): number {
		throw new Error("Method not implemented.");
	}

	public equals(first: T, second: T): boolean {
		const equals = this.nullEqualsInternal(first, second);
		return equals === null ? this.equalsInternal(first, second) : equals;
	}

	protected equalsInternal(first: T, second: T): boolean {
		throw new Error("Method not implemented.");
	}

	protected nullCompareInternal(first: T, second: T): number | null {
		if (Utility.isNullOrUndefined(first)) {
			if (Utility.isNullOrUndefined(second))
				return 0;

			return -1;
		}

		if (Utility.isNullOrUndefined(second))
			return 1;

		return null;
	}

	protected nullEqualsInternal(first: T, second: T): boolean | null {
		const compare = this.nullCompareInternal(first, second);
		return Utility.isNullOrUndefined(compare) ? null : compare === 0;
	}
}