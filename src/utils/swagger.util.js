import __dirname from '../dirname.js';

const opts = {
    definition: {
        openapi: '3.1.0',
        info: {
            title: 'Backend III',
            version: '1.0.0',
            description: 'Part 3 of the Backend project',
        },
    },
    apis: [`${__dirname}/src/docs/*.docs.yaml`],
}

export default opts;