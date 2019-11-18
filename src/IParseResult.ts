interface IParseResult<T> {
	// Properties
	readonly errors: Error[];
	readonly valid: boolean;
	readonly value: T | null;
}

export default IParseResult;