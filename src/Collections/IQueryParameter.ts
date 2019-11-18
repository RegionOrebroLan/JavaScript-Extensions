import IQueryValueSet from "./IQueryValueSet";

interface IQueryParameter {
	readonly key: string;
	readonly values: IQueryValueSet;
}

export default IQueryParameter;