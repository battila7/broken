const env = require('@brocan/env').ensure([
    'reportCollector.port'
]);

const logger = require('./logger').child({ component: 'main' });

const collectorServer = require('./collector/server');
const publisher = require('./publisher/publisher');
const orchestrator = require('./orchestrator/orchestrator');

const collectorPromise = collectorServer.listen()
    .then(function collectorStarted() {
        logger.info('Collector started.');
    });

const publisherPromise = publisher.setup()
    .then(function publisherStarted() {
        logger.info('Publisher started.');
    });

Promise.all([ collectorPromise, publisherPromise])
    .then(function readyToGo() {
        return orchestrator.setup();
    })
    .then(function start() {
        return orchestrator.start();
    });
