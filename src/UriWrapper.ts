import IUri from "./IUri";
import Wrapper from "./Abstractions/Wrapper";

export default class UriWrapper extends Wrapper<uri.URI> implements IUri {
	// Fields
	private readonly _port: number | null = null;

	// Constructors
	public constructor(uri: uri.URI) {
		super(uri, "uri");
		if(uri.port()) {
			const port = parseInt(uri.port());
			this._port = isNaN(port) ? null : port;
		}
	}

	// Properties
	public get authority(): string {
		return this.wrappedInstance.host();
	}

	public get fragment(): string {
		return this.wrappedInstance.fragment();
	}

	public get host(): string {
		return this.wrappedInstance.hostname();
	}

	public get password(): string {
		return this.wrappedInstance.password();
	}

	public get path(): string {
		return this.wrappedInstance.pathname();
	}

	public get port(): number | null {
		return this._port;
	}

	public get query(): string {
		return this.wrappedInstance.query();
	}

	public get scheme(): string {
		return this.wrappedInstance.protocol();
	}

	public get userName(): string {
		return this.wrappedInstance.username();
	}
}