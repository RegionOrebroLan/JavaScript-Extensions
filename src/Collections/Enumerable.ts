import "core-js/features/symbol";
import IEnumerable from "./IEnumerable";

export default class Enumerable<T> implements IEnumerable<T> {
	// Fields
	private readonly _items;

	// Constructors
	public constructor(items?: T[]) {
		this._items = items || [];
	}

	// Properties
	protected get items(): T[] {
		return this._items;
	}

	// Methods
	public [Symbol.iterator](): Iterator<T> {
		return this.items[Symbol.iterator]();
	}

	public forEach(callbackfn: (value: T, index: number, iterable: Iterable<T>) => void, thisArg?: any): void {
		this.items.forEach(callbackfn, thisArg);
	}
}