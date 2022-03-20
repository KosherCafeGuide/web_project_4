/*const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');*/
const presets = [
    ['@babel/preset-env', { // preset you want to use
        // browser versions in which we want our code supported
        targets: "defaults, not IE 11, not dead",

        // use polyfills for the browsers specified in the above targets option
        // Babel uses polyfills from the core-js library
        useBuiltIns: "entry",
        corejs: '^3',
    }]
];

module.exports = {
    presets,
    plugins: [
        /*postcss,
        autoprefixer,
        cssnano({ preset: "default" })*/
    ],

};