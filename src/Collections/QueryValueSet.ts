import IComparer from "./IComparer";
import IQueryValueSet from "./IQueryValueSet";
import ReadCollection from "./ReadCollection";
import Utility from "../Utility";

export default class QueryValueSet extends ReadCollection<any> implements IQueryValueSet {
    // Fields
	private readonly _comparer: IComparer<any>;
	public static readonly valueSeparator: string = ",";

	// Constructors
	public constructor(comparer: IComparer<any>) {
		super();

		if (Utility.isNullOrUndefined(comparer))
			throw new Error("The comparer can not be null or undefined.");

		this._comparer = comparer;
	}

	// Properties
	protected get comparer(): IComparer<any> {
		return this._comparer;
	}

	// Methods
	public add(items: any | any[]): number {
		let added: number = 0;

		if(!(items instanceof Array))
			items = [items];

		items.forEach((item) => {
			if(!this.contains(item)) {
				this.items.push(item);
				added++;
			}
		});

		this.items.sort((first: any, second: any) => {
			return this.comparer.compare(first, second);
		});

		return added;
	}

	public clear(): void {
		this.items.length = 0;
	}

	public contains(item: any): boolean {
		for (let value of this.items) {
			if (this.comparer.equals(item, value))
				return true;
		}

		return false;
	}

	public remove(items: any | any[]): number {
		let removed = 0;

		if(!(items instanceof Array))
			items = [items];

		items.forEach((item) => {
			for(let i = this.count - 1; i >= 0; i--) {
				if (this.comparer.equals(item, this.items[i])) {
					this.removeAt(i);
					removed++;
					continue;
				}
			}
		});

		return removed;
	}

	public removeAt(index: number): void {
		this.items.splice(index, 1);
	}

	public set(items: any | any[]): number {
		this.clear();
		return this.add(items);
	}

	public toString(): string {
		return this.items.join(QueryValueSet.valueSeparator);
	}
}