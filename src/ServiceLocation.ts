import IServiceProvider from "./IServiceProvider";
import ServiceProvider from "./ServiceProvider";

export default class ServiceLocation {
	// Fields
	private static _instance: IServiceProvider | null;

	// Properties
	public static get instance(): IServiceProvider {
		if(!ServiceLocation._instance) {
			ServiceLocation.setInstance(new ServiceProvider());
		}

		return ServiceLocation._instance as IServiceProvider;
	}

	// Methods
	public static setInstance(instance: IServiceProvider | null) {
		ServiceLocation._instance = instance;
	}
}