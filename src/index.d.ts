type rule = { source: string; target: string; rewire: string }

export as namespace rewireResolverPlugin
export = RewireResolverPlugin

declare class RewireResolverPlugin {
    constructor(rules: rule[])

    public apply(resolver: any): void
}
