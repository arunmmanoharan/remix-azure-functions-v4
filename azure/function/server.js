const {Request} = require("@remix-run/node");
const {createRequestHandler: createNodeRequestHandler } = require("@remix-run/node");
const {installGlobals } = require("@remix-run/node");

installGlobals();

function createRemixRequest(req) {
    console.log('####req', req)
    let body;
    if (req.body && req.method !== "get" && req.method !== "head") {
        body = req.isBase64Encoded
            ? Buffer.from(req.body, "base64").toString()
            : req.body;
    }

    if (req.cookies) {
        req.headers.cookie = req.cookies.join(";");
    }

    const originalUrl = req.headers["x-ms-original-url"];
    return new Request(originalUrl, {
        method: req.method,
        headers: req.headers,
        body,
    });
}

function createRequestHandler({ build, mode = process.env.NODE_ENV }) {
    const handleRequest = createNodeRequestHandler(build, mode);

    return async (request, context) => {
        const response = await handleRequest(createRemixRequest(request.req));
        const text = await response.text();

        return {
            status: response.status,
            headers: Object.fromEntries(response.headers),
            body: text,
        };
    };
}

module.exports = {
    createRequestHandler
}
