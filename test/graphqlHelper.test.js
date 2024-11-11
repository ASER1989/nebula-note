const Benchmark = require('benchmark');
const {
    getSchemaByQueryName,
    loopFindSchemaTypeChild,
} = require('../utils/graphql-helper');
const schema = require('./mock/schema.json');
const _ = require('lodash');

const test = (queryName) => {
    const params = {
        queryName: queryName,
        preciseMatch: true,
    };
    const querySchema = getSchemaByQueryName(
        schema,
        params?.queryName,
        params?.preciseMatch,
    );
    if (querySchema) {
        console.time(`${queryName} executeTime`);
        const queryFullSchema = loopFindSchemaTypeChild(schema, querySchema);
        console.timeEnd(`${queryName} executeTime`);
        return queryFullSchema;
    }
};

const suite = new Benchmark.Suite('graphqlTools', {
    maxTime: 3,
    minSamples: 1,
});

// add tests
suite
    .add('buildSchemaTree#CDD', test.bind(null, 'cddNoteList'))
    .add('buildSchemaTree#ALARM', test.bind(null, 'alarm'))
    .on('cycle', function (event, ...args) {
        console.log(String(event.target), args);
    })
    .on('complete', function () {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    // run async
    .run({ async: true });

//
// const speedSuite = new Benchmark.Suite('clone speed');
//
// speedSuite
//     .add('DeepClone#Lodash', () => {
//         _.cloneDeep(schema)
//     })
//     .add('DeepClone#StructuredClone', () => {
//         structuredClone(schema)
//     })
//     .add('DeepClone#JSON', () => {
//         JSON.parse(JSON.stringify(schema))
//     })
//     .on('cycle', function (event, ...args) {
//         console.log(String(event.target), args);
//     })
//     .on('complete', function () {
//         console.log('Fastest is ' + this.filter('fastest').map('name'));
//     })
//     // run async
//     .run({'async': true});
