import IParser from "./IParser";
import IParseResult from "./IParseResult";
import IUri from "./IUri";
import ParseResult from "./ParseResult";
import Uri from "urijs";
import UriWrapper from "../src/UriWrapper";

export default class UriParser implements IParser<IUri> {
	// Methods
	public parse(value: string): IParseResult<IUri> {
		try {
			return new ParseResult<IUri>(null, new UriWrapper(new Uri(value)));
		}
		catch(error) {
			return new ParseResult<IUri>(new Error(`Could not parse the value "${value}". -> ${error.message}`), null);
		}
	}
}