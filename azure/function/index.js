const {createRequestHandler} = require("./server");

module.exports = createRequestHandler({ build: require("./build") });
