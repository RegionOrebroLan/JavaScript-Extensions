import IQueryCollection from "./Collections/IQueryCollection";
import IQueryCollectionFactory from "./Collections/IQueryCollectionFactory";
import IUri from "./IUri";
import IUriBuilder from "./IUriBuilder";
import Uri from "urijs";
import UriWrapper from "./UriWrapper";
import Utility from "./Utility";

export default class UriBuilder implements IUriBuilder {
	// Fields
	private _fragment: string;
	private _host: string;
	private _modified: boolean = false;
	private _password: string;
	private _path: string;
	private _port: number | null;
	private _query: IQueryCollection;
	private _scheme: string;
	private _uri: IUri | null = null;
	private _userName: string;
	private _validationInstance: uri.URI = new Uri();

	// Constructors
	public constructor(queryCollectionFactory: IQueryCollectionFactory, uri?: string | IUri) {
		if(Utility.isNullOrUndefined(queryCollectionFactory))
			throw new Error("The query-collection-factory can not be null or undefined.")

		if(Utility.isNullOrUndefined(uri))
			uri = new UriWrapper(new Uri());
		else if(typeof uri === "string")
			uri = new UriWrapper(new Uri(uri));
		else
			uri = uri as IUri;

		this._fragment = uri.fragment;
		this._host = uri.host;
		this._password = uri.password;
		this._path = uri.path;
		this._port = uri.port;
		this._query = queryCollectionFactory.create(this.onQueryChanged, uri.query);
		this._scheme = uri.scheme;
		this._userName = uri.userName;
	}

	// Properties
	public get fragment(): string {
		return this._fragment;
	}

	public set fragment(value: string) {
		if(this._fragment === value)
			return;

		this.validationInstance.fragment(value);
		this._fragment = this.validationInstance.fragment();
		this.modified = true;
	}

	public get host(): string {
		return this._host;
	}

	public set host(value: string) {
		if (this._host === value)
			return;

		this.validationInstance.hostname(value);
		this._host = this.validationInstance.hostname();
		this.modified = true;
	}

	protected get modified(): boolean {
		return this._modified;
	}

	protected set modified(value: boolean) {
		this._modified = value;
	}

	public get password(): string {
		return this._password;
	}

	public set password(value: string) {
		if (this._password === value)
			return;

		this.validationInstance.password(value);
		this._password = this.validationInstance.password();
		this.modified = true;
	}

	public get path(): string {
		return this._path;
	}

	public set path(value: string) {
		if (this._path === value)
			return;

		this.validationInstance.path(value);
		this._path = this.validationInstance.path();
		this.modified = true;
	}

	public get port(): number | null {
		return this._port;
	}

	public set port(value: number | null) {
		if(this._port === value)
			return;

		const port: number | null = value === null ? null : isNaN(value) ? null : value;
		this.validationInstance.port(port === null ? "" : port.toString());
		this._port = port;
		this.modified = true;
	}

	public get query(): IQueryCollection {
		return this._query;
	}

	public get scheme(): string {
		return this._scheme;
	}

	public set scheme(value: string) {
		if (this._scheme === value)
			return;

		this.validationInstance.scheme(value);
		this._scheme = this.validationInstance.scheme();
		this.modified = true;
	}

	public get uri(): IUri {
		if (this._uri === null || this.modified) {
			this._uri = this.createUri();
			this.modified = false;
		}

		return this._uri;
	}

	public get userName(): string {
		return this._userName;
	}

	public set userName(value: string) {
		if (this._userName === value)
			return;

		this.validationInstance.username(value);
		this._userName = this.validationInstance.username();
		this.modified = true;
	}

	protected get validationInstance(): uri.URI {
		return this._validationInstance;
	}

	// Methods
	protected createUri(): IUri {
		const uri = new Uri();

		uri.fragment(this.fragment);
		uri.hostname(this.host);
		uri.path(this.path);
		uri.password(this.password);
		uri.port((this.port || "").toString());
		uri.query(this.query.toString());
		uri.scheme(this.scheme);
		uri.username(this.userName);

		return new UriWrapper(uri);
	}

	protected onQueryChanged(): void {
		this.modified = true;
	}

	public toString(): string {
		return this.uri.toString();
	}
}