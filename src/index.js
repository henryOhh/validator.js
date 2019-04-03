import * as _ from './lib'  // FxJS Library

function IsValidData(requiredKeys, data) {
    return _.go(
        Array.isArray(requiredKeys) ? requiredKeys : _.L.entries(requiredKeys),
        Array.isArray(requiredKeys) ?
            _.every(key => data[key]) :
            _.every(([key, func]) =>
                Array.isArray(func) ?
                    _.every(fn => fn(data[key]), func) :
                    func(data[key])),
        bool => !!bool
    );
}

export {
    IsValidData,
};
