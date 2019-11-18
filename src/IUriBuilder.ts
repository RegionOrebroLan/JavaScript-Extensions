import IQueryCollection from "./Collections/IQueryCollection";
import IUri from "./IUri";

interface IUriBuilder {
	// Properties
	fragment: string;
	host: string;
	password: string;
	path: string;
	port: number | null;
	readonly query: IQueryCollection;
	scheme: string;
	readonly uri: IUri;
	userName: string;
}

export default IUriBuilder;