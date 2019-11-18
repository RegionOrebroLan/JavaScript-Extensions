import IReadCollection from "./IReadCollection";

interface IQueryValueSet extends IReadCollection<any> {
	// Methods
	add(items: any | any[]): number;
	clear(): void;
	contains(item: any): boolean;
	remove(items: any | any[]): number;
	removeAt(index: number): void;
	set(items: any | any[]): number;
}

export default IQueryValueSet;