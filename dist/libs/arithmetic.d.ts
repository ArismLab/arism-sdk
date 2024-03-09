import { BN } from '@common';
import { Point } from '@types';
export declare const thresholdSame: <T>(arr: T[], t: number) => T | null;
export declare const kCombinations: (s: number | number[], k: number) => number[][];
export declare const lagrangeInterpolation: (points: Point[], xPoint: BN) => BN | null;
export declare const sumMod: (arr: string[], modulo: BN) => string;
