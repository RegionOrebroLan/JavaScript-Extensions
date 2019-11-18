import IParser from "../IParser";
import IParseResult from "../IParseResult";
import IQueryCollection from "./IQueryCollection";
import IQueryCollectionFactory from "./IQueryCollectionFactory";
import ParseResult from "../ParseResult";
import Utility from "../Utility";

export default class QueryCollectionParser implements IParser<IQueryCollection> {
	// Fields
	private readonly _factory: IQueryCollectionFactory;

	// Constructors
	public constructor(factory: IQueryCollectionFactory) {
		if(Utility.isNullOrUndefined(factory))
			throw new Error("The factory can not be null or undefined.")

		this._factory = factory;
	}

	// Properties
	protected get factory(): IQueryCollectionFactory {
		return this._factory;
	}

	// Methods
	public parse(value: string): IParseResult<IQueryCollection> {
		if (!value)
			return new ParseResult<IQueryCollection>(null, null);

		try {
			const queryCollection = this.factory.create(undefined, value);

			return new ParseResult<IQueryCollection>(null, queryCollection);
		}
		catch (error) {
			return new ParseResult<IQueryCollection>(new Error(`Could not parse the value "${value}". -> ${error.message}`), null);
		}
	}
}