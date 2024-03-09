/// <reference types="node" />
import * as Crypto from 'eccrypto';
import { BN } from '@common';
export declare const decrypt: (privateKey: Buffer, opts: Crypto.Ecies) => Promise<Buffer>;
export declare const getPublicKey: (privateKey: Buffer) => Buffer;
export declare const privateKeyToAddress: (privateKey: BN) => string;
export declare const generatePrivateKey: () => Buffer;
