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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomHex = exports.to = exports.from = exports.ONE = exports.ZERO = void 0;
var web3_1 = __importDefault(require("web3"));
var BigNumber = __importStar(require("bn.js"));
exports.ZERO = new BigNumber.BN(0);
exports.ONE = new BigNumber.BN(1);
var from = function (value, base, endian) {
    return new BigNumber.BN(value, base, endian);
};
exports.from = from;
var to = function (value) {
    return value.toString();
};
exports.to = to;
var randomHex = function (bytes) {
    return web3_1.default.utils.randomHex(bytes);
};
exports.randomHex = randomHex;
