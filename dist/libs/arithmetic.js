"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sumMod = exports.lagrangeInterpolation = exports.kCombinations = exports.thresholdSame = void 0;
var json_stable_stringify_1 = __importDefault(require("json-stable-stringify"));
var _common_1 = require("@common");
var thresholdSame = function (arr, t) {
    var hashMap = {};
    for (var i = 0; i < arr.length; i += 1) {
        var str = (0, json_stable_stringify_1.default)(arr[i]);
        hashMap[str] = hashMap[str] ? hashMap[str] + 1 : 1;
        if (hashMap[str] === t) {
            return arr[i];
        }
    }
    return null;
};
exports.thresholdSame = thresholdSame;
var kCombinations = function (s, k) {
    var set = s;
    if (typeof set === 'number') {
        set = Array.from({ length: set }, function (_, i) { return i; });
    }
    if (k > set.length || k <= 0) {
        return [];
    }
    if (k === set.length) {
        return [set];
    }
    if (k === 1) {
        return set.reduce(function (acc, cur) { return __spreadArray(__spreadArray([], acc, true), [[cur]], false); }, []);
    }
    var combs = [];
    var tailCombs = [];
    for (var i = 0; i <= set.length - k + 1; i += 1) {
        tailCombs = (0, exports.kCombinations)(set.slice(i + 1), k - 1);
        for (var j = 0; j < tailCombs.length; j += 1) {
            combs.push(__spreadArray([set[i]], tailCombs[j], true));
        }
    }
    return combs;
};
exports.kCombinations = kCombinations;
var lagrangeInterpolation = function (points, xPoint) {
    var result = _common_1.BN.ZERO;
    for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
        var _a = points_1[_i], currentX = _a.x, currentY = _a.y;
        var upper = _common_1.BN.ONE;
        var lower = _common_1.BN.ONE;
        for (var _b = 0, points_2 = points; _b < points_2.length; _b++) {
            var otherX = points_2[_b].x;
            if (!currentX.eq(otherX)) {
                upper = upper.mul(xPoint.sub(otherX)).umod(_common_1.EC.ORDER);
                var diff = currentX.sub(otherX);
                diff = diff.umod(_common_1.EC.ORDER);
                lower = lower.mul(diff).umod(_common_1.EC.ORDER);
            }
        }
        var delta = upper.mul(lower.invm(_common_1.EC.ORDER)).umod(_common_1.EC.ORDER);
        delta = delta.mul(currentY).umod(_common_1.EC.ORDER);
        result = result.add(delta).umod(_common_1.EC.ORDER);
    }
    return result;
};
exports.lagrangeInterpolation = lagrangeInterpolation;
var sumMod = function (arr, modulo) {
    return arr
        .reduce(function (acc, current) { return acc.add(_common_1.BN.from(current, 'hex')).umod(modulo); }, _common_1.BN.ZERO)
        .toString('hex');
};
exports.sumMod = sumMod;
