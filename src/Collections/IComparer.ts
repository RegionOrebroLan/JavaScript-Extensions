interface IComparer<T> {
	// Methods
	compare(first: T, second: T): number;
	equals(first: T, second: T): boolean;
}

export default IComparer;