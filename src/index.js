function ruleMatches(sourcePath, sourceRequest) {
    return function(rule) {
        const matchesSource = sourcePath.includes('node_modules/' + rule.source)
        const matchesTarget = sourceRequest === rule.target
        return matchesSource && matchesTarget
    }
}

function tryRules(rules, request) {
    return rules.find(ruleMatches(request.path, request.request))
}

function rewireHook(rules) {
    return function(request, resolveContext, callback) {
        const rule = tryRules(rules, request)
        if (rule) {
            const rewiredRequest = { ...request, request: rule.rewire }
            return resolver.doResolve(target, rewiredRequest, null, resolveContext, callback)
        }
        return callback()
    }
}

class RewireResolverPlugin {
    constructor(rules) {
        this.rules = rules
    }

    apply(resolver) {
        const target = resolver.ensureHook('resolve')
        resolver.getHook('resolve').tapAsync('RewireResolverPlugin', rewireHook(this.rules))
    }
}

module.exports = RewireResolverPlugin
