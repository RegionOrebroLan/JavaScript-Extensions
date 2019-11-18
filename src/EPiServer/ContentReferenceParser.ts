import ContentReference from "./ContentReference";
import IContentReference from "./IContentReference";
import IParser from "../IParser";
import IParseResult from "../IParseResult";
import ParseResult from "../ParseResult";
import Utility from "../Utility";

export default class ContentReferenceParser implements IParser<IContentReference> {
	public parse(value: string): IParseResult<IContentReference> {
		if (Utility.isNullOrUndefined(value))
			return new ParseResult<IContentReference>(new Error("The value can not be null."), null);

		if (value.length === 0)
			return new ParseResult<IContentReference>(null, new ContentReference(0));

		const separator: string = "_";

		const parts = value.split(separator, 3);

		try {
			const id = parseInt(parts[0]);
			const provider: string = parts.length > 2 ? parts[2] : "";
			const version = parts.length > 1 ? parseInt(parts[1]) : undefined;

			const contentReference = new ContentReference(id, provider, version);

			return new ParseResult<IContentReference>(null, contentReference);
		}
		catch (error) {
			return new ParseResult<IContentReference>(new Error(`Could not parse the value "${value}". -> ${error.message}`), null);
		}
	}
}