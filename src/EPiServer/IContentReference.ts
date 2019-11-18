interface IContentReference {
	// Properties
	readonly id: number;
	readonly provider: string;
	readonly version: number | null;
}

export default IContentReference;