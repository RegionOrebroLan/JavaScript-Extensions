import IQueryParameter from "./IQueryParameter";
import IReadCollection from "./IReadCollection";

interface IQueryCollection extends IReadCollection<IQueryParameter> {
	// Methods
	add(key: string, values: any | any[]): number;
	clear(): void;
	get(key: string): IQueryParameter | null;
	remove(key: string, values?: any | any[]): number;
	set(key: string, values: any | any[]): number;
	toUrlString(encode: boolean): string;
}

export default IQueryCollection;