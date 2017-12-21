'use strict';

const loaderUtils = require('loader-utils');

function processText(source, options) {
    let { pattern, replacement } = options;

    if (pattern && replacement) {
        const matches = source.match(pattern);
        Array.isArray(matches) && matches.forEach((match) => {
            source = source.replace(match, replacement);
        });
    } else {
        throw new Error('options.match or options.replacement should not be null. ' + JSON.stringify(options));
    }

    return source;
}

module.exports = function (source, map) {
    if (this.cacheable) {
        this.cacheable();
    }

    const options = loaderUtils.getOptions(this) || {};

    source = processText(source, options);

    this.callback(null, source, map);
};
