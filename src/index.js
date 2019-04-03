import * as _ from './lib'  // FxJS Library

function IsValidData(requiredKeys, data) {
    return Array.isArray(requiredKeys) ?
        _.go(requiredKeys,
            _.every(key => data[key]))
        : _.go(_.L.entries(requiredKeys),
            _.every(([key, func]) =>
                Array.isArray(func) ?
                    _.every(fn => fn(data[key]), func) :
                    func(data[key])));
}

export {
    IsValidData,
};
