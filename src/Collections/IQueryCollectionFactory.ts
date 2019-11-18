import IQueryCollection from "./IQueryCollection";

interface IQueryCollectionFactory {
	// Methods
	create(changeHandler?: { (): void; }, query?: string): IQueryCollection;
}

export default IQueryCollectionFactory;