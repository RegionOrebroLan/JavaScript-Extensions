export default class Utility {
	// Methods
	public static isNull(value: any) {
		return value === null;
	}

	public static isNullOrUndefined(value: any) {
		return Utility.isNull(value) || Utility.isUndefined(value);
	}

	public static isUndefined(value: any) {
		return value === undefined;
	}
}