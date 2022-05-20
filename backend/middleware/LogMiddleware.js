const Log = require('../models/LogModel');
const asyncHandler = require('express-async-handler');

const logMiddleware = asyncHandler(async (req, res, next) => {
    const log = await Log.create({
        text: req.body ? req.body.text : '',
        url: req.baseUrl + req.url,
        user: req.user.id
    });
    req.app.locals.logid = log.id;
    next();
});

module.exports = {logMiddleware}