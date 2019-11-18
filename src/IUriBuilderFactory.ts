import IUri from "./IUri";
import IUriBuilder from "./IUriBuilder";

interface IUriBuilderFactory {
	// Methods
	create(uri?: string | IUri): IUriBuilder;
}

export default IUriBuilderFactory;