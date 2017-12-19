'use strict';

const loaderUtils = require('loader-utils');

function processText(source, options) {
    let { match, replacement } = options;
    let newSource;

    if (match && replacement) {
        newSource = source.replace(match, replacement);
    } else {
        throw new Error('options.match or options.replacement should not be null. ' + JSON.stringify(options));
    }

    return newSource;
}

module.exports = function (source, map) {
    if (this.cacheable) {
        this.cacheable();
    }

    const options = loaderUtils.getOptions(this) || {};

    source = processText(source, options);

    this.callback(null, source, map);
};