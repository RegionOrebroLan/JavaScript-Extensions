import BasicServiceProvider from "../ServiceProvider";
import ContentReferenceComparer from "./Collections/ContentReferenceComparer";
import ContentReferenceParser from "./ContentReferenceParser";
import IComparer from "../Collections/IComparer";
import IContentReference from "./IContentReference";
import IParser from "../IParser";
import QueryValueComparer from "./Collections/QueryValueComparer";
import StringComparer from "../Collections/StringComparer";

export default class ServiceProvider extends BasicServiceProvider {
	// Fields
	private _contentReferenceComparer: IComparer<IContentReference> | null = null;
	private _contentReferenceParser: IParser<IContentReference> | null = null;
	private _customQueryValueComparer: IComparer<any> | null = null;

	// Properties
	protected get contentReferenceComparer(): IComparer<IContentReference> {
		if(!this._contentReferenceComparer)
			this._contentReferenceComparer = new ContentReferenceComparer(new StringComparer(true), false);

		return this._contentReferenceComparer;
	}

	protected get contentReferenceParser(): IParser<IContentReference> {
		if(!this._contentReferenceParser)
			this._contentReferenceParser = new ContentReferenceParser();

		return this._contentReferenceParser;
	}

	protected get queryValueComparer(): IComparer<any> {
		if(!this._customQueryValueComparer)
			this._customQueryValueComparer = new QueryValueComparer(true, this.contentReferenceComparer, this.contentReferenceParser);

		return this._customQueryValueComparer;
	}
}