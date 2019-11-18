import IQueryParameter from "./IQueryParameter";

interface IQueryParameterFactory {
	// Methods
	create(key: string): IQueryParameter;
}

export default IQueryParameterFactory;