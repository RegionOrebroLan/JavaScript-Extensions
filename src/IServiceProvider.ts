import IParser from "./IParser";
import IQueryCollection from "./Collections/IQueryCollection";
import IQueryCollectionFactory from "./Collections/IQueryCollectionFactory";
import IQueryParameterFactory from "./Collections/IQueryParameterFactory";
import IQueryValueSetFactory from "./Collections/IQueryValueSetFactory";
import IUriBuilderFactory from "./IUriBuilderFactory";

interface IServiceProvider {
	// Properties
	readonly queryCollectionFactory: IQueryCollectionFactory;
	readonly queryCollectionParser: IParser<IQueryCollection>;
	readonly queryParameterFactory: IQueryParameterFactory;
	readonly queryValueSetFactory: IQueryValueSetFactory;
	readonly uriBuilderFactory: IUriBuilderFactory;
}

export default IServiceProvider;