"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keccak256 = void 0;
var keccak = require('keccak');
function keccak256(data) {
    var hash = keccak('keccak256').update(data).digest('hex');
    return "0x".concat(hash);
}
exports.keccak256 = keccak256;
