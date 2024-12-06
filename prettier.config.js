module.exports = {
    arrowParens: 'always',
    jsxBracketSameLine: false,
    endOfLine: 'lf',
    printWidth: 90,
    singleQuote: true,
    jsxSingleQuote: true,
    bracketSpacing: true,
    semi: true,
    useTabs: false,
    tabWidth: 4,
    trailingComma: 'all',
    plugins: ['@trivago/prettier-plugin-sort-imports'],
    importOrder: [
        '\\.styl$',
        "^react$",
        // may not be necessary, but put here to keep older ordering
        'startSpinner$',
        // required to make open api setup start
        'openApiSetup$',
        // sets up the slave window asap
        'setupSlaveWindowConfig$',
        // sets up a public path required before any imports are done
        'initWebpackSlavePublicPath$',
        // puts all the modules into the modules container, required before usage
        '^\\./modules$',
        // pro version of the above
        '^\\.\\./pro/modules$',
        // better done before importing anything else. May not be necessary.
        'slaveDataSetup$',
        // required because jquery-signalr and velocity expect jquery on window
        '^jqueryAll$',
        // sets up mocks for tests, required before anything else
        'src/frontend/test/specs',
        'src/frontend/test/mocks/config',
        'src/frontend/test/mocks/appVariables',
        'src/frontend/test/customMatchers',

        '<THIRD_PARTY_MODULES>',

        // files in the root of frontend are important and better to pull up than inter-mingle with directories
        '^src/frontend/[a-zA-Z]+$',

        // imports outside the current files area
        '^src/',

        // imports inside the current area. alphabetical sorting puts ../ before ./
        '^[./]',
    ],

    importOrderSeparation: false,
    importOrderSortSpecifiers: true,
    importOrderParserPlugins: ['typescript', 'jsx', 'topLevelAwait'],
    overrides: [
        {
            files: 'package.json',
            options: {
                tabWidth: 4,
            },
        },
        {
            files: '*.less',
            options: {
                parser: 'less',
                singleQuote: false,
            },
        },
        {
            files: '*.md',
            options: {
                parser: 'markdown',
                tabWidth: 2,
            },
        },
    ],
};
