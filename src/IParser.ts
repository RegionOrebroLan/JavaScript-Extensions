import IParseResult from "./IParseResult";

interface IParser<T> {
	// Methods
	parse(value: string): IParseResult<T>;
}

export default IParser;