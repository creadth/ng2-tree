export function isEmpty(value) {
    if (typeof value === 'string') {
        return !/\S/.test(value);
    }
    if (Array.isArray(value)) {
        return value.length === 0;
    }
    return isNil(value);
}
export function trim(value) {
    return isNil(value) ? '' : value.trim();
}
export function has(value, prop) {
    return value && typeof value === 'object' && value.hasOwnProperty(prop);
}
export function isFunction(value) {
    return typeof value === 'function';
}
export function get(value, path, defaultValue) {
    var result = value;
    for (var _i = 0, _a = path.split('.'); _i < _a.length; _i++) {
        var prop = _a[_i];
        if (!result || !Reflect.has(result, prop)) {
            return defaultValue;
        }
        result = result[prop];
    }
    return isNil(result) || result === value ? defaultValue : result;
}
export function omit(value, propsToSkip) {
    if (!value) {
        return value;
    }
    var normalizedPropsToSkip = typeof propsToSkip === 'string' ? [propsToSkip] : propsToSkip;
    return Object.keys(value).reduce(function (result, prop) {
        var _a;
        if (includes(normalizedPropsToSkip, prop)) {
            return result;
        }
        return Object.assign(result, (_a = {}, _a[prop] = value[prop], _a));
    }, {});
}
export function size(value) {
    return isEmpty(value) ? 0 : value.length;
}
export function once(fn) {
    var result;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (fn) {
            result = fn.apply(null, args);
            fn = null;
        }
        return result;
    };
}
export function defaultsDeep(target) {
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    return [target].concat(sources).reduce(function (result, source) {
        if (!source) {
            return result;
        }
        Object.keys(source).forEach(function (prop) {
            if (isNil(result[prop])) {
                result[prop] = source[prop];
                return;
            }
            if (typeof result[prop] === 'object' && !Array.isArray(result[prop])) {
                result[prop] = defaultsDeep(result[prop], source[prop]);
                return;
            }
        });
        return result;
    }, {});
}
export function includes(target, value) {
    if (isNil(target)) {
        return false;
    }
    var index = typeof target === 'string' ? target.indexOf(value) : target.indexOf(value);
    return index > -1;
}
export function isNil(value) {
    return value === undefined || value === null;
}
//# sourceMappingURL=fn.utils.js.map