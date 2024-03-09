"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePrivateKey = exports.privateKeyToAddress = exports.getPublicKey = exports.decrypt = void 0;
var web3_utils_1 = require("web3-utils");
var Crypto = __importStar(require("eccrypto"));
var _common_1 = require("@common");
var decrypt = function (privateKey, opts) {
    return Crypto.decrypt(privateKey, opts);
};
exports.decrypt = decrypt;
var getPublicKey = function (privateKey) {
    return Crypto.getPublic(privateKey);
};
exports.getPublicKey = getPublicKey;
var privateKeyToAddress = function (privateKey) {
    var key = _common_1.EC.secp256k1.keyFromPrivate(privateKey.toString('hex', 64), 'hex');
    var publicKey = key.getPublic().encode('hex', false).slice(2);
    var lowercaseAddress = "0x".concat(_common_1.H.keccak256(Buffer.from(publicKey, 'hex')).slice(64 - 38));
    return (0, web3_utils_1.toChecksumAddress)(lowercaseAddress);
};
exports.privateKeyToAddress = privateKeyToAddress;
var generatePrivateKey = function () {
    return Crypto.generatePrivate();
};
exports.generatePrivateKey = generatePrivateKey;
