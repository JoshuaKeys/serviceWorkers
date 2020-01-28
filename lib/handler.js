const handlers = {};

handlers.defaultPage = (reqPayload, cb)=>{
    cb(302, undefined, {Location: '/index.html'})
}

module.exports = handlers;