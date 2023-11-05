"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtVerify = exports.jwtSign = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var secret = "very important secret";
var jwtSign = function (payload, options) {
    if (options === void 0) { options = {}; }
    return new Promise(function (resolve, reject) {
        try {
            var jwt = (0, jsonwebtoken_1.sign)(payload, secret, options);
            resolve(jwt);
        }
        catch (e) {
            reject(e);
        }
    });
};
exports.jwtSign = jwtSign;
var jwtVerify = function (token, options) {
    if (options === void 0) { options = {}; }
    return new Promise(function (resolve, reject) {
        try {
            var decoded = (0, jsonwebtoken_1.verify)(token, secret, options);
            resolve(decoded);
        }
        catch (e) {
            reject(e);
        }
    });
};
exports.jwtVerify = jwtVerify;
