interface IEnumerable<T> extends Iterable<T> {
	// Methods
	forEach(callbackfn: (value: T, index: number, iterable: Iterable<T>) => void, thisArg?: any): void;
}

export default IEnumerable;