import IQueryValueSet from "./IQueryValueSet";

interface IQueryValueSetFactory {
	// Methods
	create(): IQueryValueSet;
}

export default IQueryValueSetFactory;