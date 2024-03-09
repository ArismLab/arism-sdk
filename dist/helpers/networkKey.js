"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructPrivateKey = exports.getAddress = void 0;
var axios_1 = __importDefault(require("axios"));
var arithmetic_1 = require("@libs/arithmetic");
var _common_1 = require("@common");
var NODES = [
    {
        id: 1,
        url: 'http://127.0.0.1:3001',
        publicKey: {
            x: 'bc38813a6873e526087918507c78fc3a61624670ee851ecfb4f3bef55d027b5a',
            y: 'ac4b21229f662a0aefdfdac21cf17c3261a392c74a8790db218b34e3e4c1d56a',
        },
    },
    {
        id: 2,
        url: 'http://127.0.0.1:3002',
        publicKey: {
            x: 'b56541684ea5fa40c8337b7688d502f0e9e092098962ad344c34e94f06d293fb',
            y: '759a998cef79d389082f9a75061a29190eec0cac99b8c25ddcf6b58569dad55c',
        },
    },
    {
        id: 3,
        url: 'http://127.0.0.1:3003',
        publicKey: {
            x: '4b5f33d7dd84ea0b7a1eb9cdefe33dbcc6822933cfa419c0112e9cbe33e84b26',
            y: '7a7813bf1cbc2ee2c6fba506fa5de2af1601a093d93716a78ecec0e3e49f3a57',
        },
    },
];
var ping = function (url) { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios_1.default.get(url)];
            case 1:
                response = _a.sent();
                return [2 /*return*/, (response === null || response === void 0 ? void 0 : response.data) === 'pong!'];
        }
    });
}); };
var fetchNodes = function () { return __awaiter(void 0, void 0, void 0, function () {
    var nodes, _loop_1, i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                nodes = [];
                _loop_1 = function (i) {
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, ping(NODES[i].url).then(function (alive) {
                                    if (alive) {
                                        nodes.push(NODES[i]);
                                    }
                                })];
                            case 1:
                                _b.sent();
                                return [2 /*return*/];
                        }
                    });
                };
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < NODES.length)) return [3 /*break*/, 4];
                return [5 /*yield**/, _loop_1(i)];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                i += 1;
                return [3 /*break*/, 1];
            case 4:
                if (NODES.length < 2)
                    throw new Error('Not enough Nodes');
                return [2 /*return*/, nodes];
        }
    });
}); };
var getAddress = function (input) { return __awaiter(void 0, void 0, void 0, function () {
    var error, nodes, _i, nodes_1, url, owner, data, e_1, message, statusCode;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, fetchNodes()];
            case 1:
                nodes = _c.sent();
                _i = 0, nodes_1 = nodes;
                _c.label = 2;
            case 2:
                if (!(_i < nodes_1.length)) return [3 /*break*/, 7];
                url = nodes_1[_i].url;
                _c.label = 3;
            case 3:
                _c.trys.push([3, 5, , 6]);
                owner = input.owner;
                return [4 /*yield*/, axios_1.default.post("".concat(url, "/wallet"), { owner: owner })];
            case 4:
                data = (_c.sent()).data;
                return [2 /*return*/, { data: data, error: undefined }];
            case 5:
                e_1 = _c.sent();
                message = (_a = e_1.response) === null || _a === void 0 ? void 0 : _a.data.message;
                statusCode = (_b = e_1.response) === null || _b === void 0 ? void 0 : _b.data.statusCode;
                error = { message: message, statusCode: statusCode };
                return [3 /*break*/, 6];
            case 6:
                _i++;
                return [3 /*break*/, 2];
            case 7: return [2 /*return*/, { data: undefined, error: error }];
        }
    });
}); };
exports.getAddress = getAddress;
var constructPrivateKey = function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var tempPrivateKey, tempPublicKey, tempCommitment, nodes, commitments, _i, nodes_2, url, commitment, _c, encryptedMasterShares, _d, nodes_3, _e, url, id, value, _f, thresholdPublicKey, decryptedMasterShares, _g, encryptedMasterShares_1, _h, _j, ephemPublicKey, iv, mac, ciphertext, decryptedMasterShare, masterShares, privateKey, allCombis, _loop_2, _k, allCombis_1, combi;
    var idToken = _b.idToken, owner = _b.owner;
    return __generator(this, function (_l) {
        switch (_l.label) {
            case 0: return [4 /*yield*/, (0, exports.getAddress)({ owner: owner })];
            case 1:
                _l.sent();
                tempPrivateKey = _common_1.C.generatePrivateKey();
                tempPublicKey = _common_1.C.getPublicKey(tempPrivateKey).toString('hex');
                tempCommitment = _common_1.H.keccak256(idToken);
                return [4 /*yield*/, fetchNodes()];
            case 2:
                nodes = _l.sent();
                commitments = [];
                _i = 0, nodes_2 = nodes;
                _l.label = 3;
            case 3:
                if (!(_i < nodes_2.length)) return [3 /*break*/, 8];
                url = nodes_2[_i].url;
                _l.label = 4;
            case 4:
                _l.trys.push([4, 6, , 7]);
                return [4 /*yield*/, axios_1.default.post("".concat(url, "/commitment"), {
                        commitment: tempCommitment,
                        tempPublicKey: tempPublicKey,
                    })];
            case 5:
                commitment = (_l.sent()).data;
                commitments.push(commitment);
                return [3 /*break*/, 7];
            case 6:
                _c = _l.sent();
                return [3 /*break*/, 7];
            case 7:
                _i++;
                return [3 /*break*/, 3];
            case 8:
                if (commitments.length < _common_1.N.GENERATION_THRESHOLD) {
                    return [2 /*return*/, {
                            data: undefined,
                            error: {
                                statusCode: '400',
                                message: 'Not enough Commitments',
                            },
                        }];
                }
                encryptedMasterShares = [];
                _d = 0, nodes_3 = nodes;
                _l.label = 9;
            case 9:
                if (!(_d < nodes_3.length)) return [3 /*break*/, 14];
                _e = nodes_3[_d], url = _e.url, id = _e.id;
                _l.label = 10;
            case 10:
                _l.trys.push([10, 12, , 13]);
                return [4 /*yield*/, axios_1.default.post("".concat(url, "/secret"), {
                        commitments: commitments,
                        owner: owner,
                        idToken: idToken,
                        tempPublicKey: tempPublicKey,
                    })];
            case 11:
                value = (_l.sent()).data;
                encryptedMasterShares.push({ value: value, id: id });
                return [3 /*break*/, 13];
            case 12:
                _f = _l.sent();
                return [3 /*break*/, 13];
            case 13:
                _d++;
                return [3 /*break*/, 9];
            case 14:
                thresholdPublicKey = (0, arithmetic_1.thresholdSame)(encryptedMasterShares.map(function (e) { return e.value.publicKey; }), _common_1.N.DERIVATION_THRESHOLD);
                if (encryptedMasterShares.length < _common_1.N.DERIVATION_THRESHOLD) {
                    return [2 /*return*/, {
                            data: undefined,
                            error: {
                                statusCode: '400',
                                message: 'Not enough Master Shares',
                            },
                        }];
                }
                decryptedMasterShares = [];
                _g = 0, encryptedMasterShares_1 = encryptedMasterShares;
                _l.label = 15;
            case 15:
                if (!(_g < encryptedMasterShares_1.length)) return [3 /*break*/, 18];
                _h = encryptedMasterShares_1[_g].value, _j = _h.metadata, ephemPublicKey = _j.ephemPublicKey, iv = _j.iv, mac = _j.mac, ciphertext = _h.ciphertext;
                return [4 /*yield*/, _common_1.C.decrypt(tempPrivateKey, {
                        ephemPublicKey: Buffer.from(ephemPublicKey, 'hex'),
                        iv: Buffer.from(iv, 'hex'),
                        mac: Buffer.from(mac, 'hex'),
                        ciphertext: Buffer.from(ciphertext, 'hex'),
                    })];
            case 16:
                decryptedMasterShare = _l.sent();
                decryptedMasterShares.push(decryptedMasterShare);
                _l.label = 17;
            case 17:
                _g++;
                return [3 /*break*/, 15];
            case 18:
                masterShares = decryptedMasterShares.reduce(function (acc, curr, index) {
                    if (curr)
                        acc.push({
                            x: _common_1.BN.from(encryptedMasterShares[index].id),
                            y: _common_1.BN.from(curr.toString(), 'hex'),
                        });
                    return acc;
                }, []);
                privateKey = undefined;
                allCombis = (0, arithmetic_1.kCombinations)(masterShares.length, _common_1.N.DERIVATION_THRESHOLD);
                _loop_2 = function (combi) {
                    var derivedPrivateKey = (0, arithmetic_1.lagrangeInterpolation)(masterShares.filter(function (_, index) { return combi.includes(index); }), _common_1.BN.ZERO);
                    if (!derivedPrivateKey) {
                        return "continue";
                    }
                    var decryptedPublicKey = _common_1.C.getPublicKey(Buffer.from(derivedPrivateKey.toString(16, 64), 'hex')).toString('hex');
                    if (thresholdPublicKey === decryptedPublicKey) {
                        privateKey = derivedPrivateKey;
                    }
                };
                for (_k = 0, allCombis_1 = allCombis; _k < allCombis_1.length; _k++) {
                    combi = allCombis_1[_k];
                    _loop_2(combi);
                }
                if (!privateKey) {
                    return [2 /*return*/, {
                            data: undefined,
                            error: {
                                message: 'Could not construct Private Key',
                                statusCode: '400',
                            },
                        }];
                }
                return [2 /*return*/, {
                        data: {
                            address: _common_1.C.privateKeyToAddress(privateKey),
                            privateKey: privateKey.toString('hex', 64),
                        },
                        error: undefined,
                    }];
        }
    });
}); };
exports.constructPrivateKey = constructPrivateKey;
