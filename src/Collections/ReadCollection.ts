import Enumerable from "./Enumerable";
import IReadCollection from "./IReadCollection";

export default class ReadCollection<T> extends Enumerable<T> implements IReadCollection<T> {
	// Constructors
	public constructor(items?: T[]) {
		super(items);
	}

	// Properties
	public get count(): number {
		return this.items.length;
	}

	// Methods
	public item(index: number): T {
		return this.items[index];
	}
}