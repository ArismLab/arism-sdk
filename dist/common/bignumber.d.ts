/// <reference types="node" />
import * as BigNumber from 'bn.js';
export type BN = BigNumber;
export declare const ZERO: import("bn.js");
export declare const ONE: import("bn.js");
export declare const from: (value: number | string | number[] | Uint8Array | Buffer | BN, base?: number | 'hex', endian?: BigNumber.Endianness) => BN;
export declare const to: (value: BN) => string;
export declare const randomHex: (bytes: number) => string;
