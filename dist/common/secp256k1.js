"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ORDER = exports.secp256k1 = void 0;
var elliptic_1 = __importDefault(require("elliptic"));
exports.secp256k1 = new elliptic_1.default.ec('secp256k1');
exports.ORDER = exports.secp256k1.curve.n;
