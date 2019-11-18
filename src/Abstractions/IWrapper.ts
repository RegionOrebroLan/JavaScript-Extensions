interface IWrapper<T extends any> {
	// Properties
    readonly wrappedInstance: T;
}

export default IWrapper;