import IEnumerable from "./IEnumerable";

interface IReadCollection<T> extends IEnumerable<T> {
	// Properties
	readonly count: number;

	// Methods
	item(index: number): T;
}

export default IReadCollection;