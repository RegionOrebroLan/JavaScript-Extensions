interface IUri {
	// Properties
	readonly authority: string;
	readonly fragment: string;
	readonly host: string;
	readonly password: string;
	readonly path: string;
	readonly port: number | null;
	readonly query: string;
	readonly scheme: string;
	readonly userName: string;
}

export default IUri;