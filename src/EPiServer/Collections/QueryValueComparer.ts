import ContentReference from "../ContentReference";
import IComparer from "../../Collections/IComparer";
import IContentReference from "../IContentReference";
import InheritedQueryValueComparer from "../../Collections/QueryValueComparer";
import IParser from "../../IParser";

export default class QueryValueComparer extends InheritedQueryValueComparer {
	// Fields
	private readonly _contentReferenceComparer: IComparer<IContentReference>;
	private readonly _contentReferenceParser: IParser<IContentReference>;

	// Constructors
	public constructor(caseInsensitive: boolean, contentReferenceComparer: IComparer<IContentReference>, contentReferenceParser: IParser<IContentReference>) {
		if (!contentReferenceComparer)
			throw new Error("The content-reference-comparer can not be null.");

		if (!contentReferenceParser)
			throw new Error("The content-reference-parser can not be null.");

		super(caseInsensitive);

		this._contentReferenceComparer = contentReferenceComparer;
		this._contentReferenceParser = contentReferenceParser;
	}

	// Properties
	protected get contentReferenceComparer(): IComparer<IContentReference> {
		return this._contentReferenceComparer;
	}

	protected get contentReferenceParser(): IParser<IContentReference> {
		return this._contentReferenceParser;
	}

	// Methods
	protected compareInternal(first: any, second: any): number {
		first = this.tryGetValueAsContentReference(first);
		second = this.tryGetValueAsContentReference(second);

		if(first && first instanceof ContentReference)
		{
			if(second && second instanceof ContentReference)
				return this.contentReferenceComparer.compare(first, second);

			return -1;
		}

		if(second && second instanceof ContentReference)
			return 1;

		return super.compareInternal(first, second);
	}

	protected tryGetValueAsContentReference(value: any): any {
		if(value && typeof value === "string")
		{
			const parseResult = this.contentReferenceParser.parse(value);
			if(parseResult.valid)
				return parseResult.value;
		}

		return value;
	}
}