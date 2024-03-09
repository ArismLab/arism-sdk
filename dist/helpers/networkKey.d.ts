import type { GetAddressRequest, GetAddressResponse, GetPrivateKeyRequest, GetPrivateKeyResponse, Response } from '@types';
export declare const getAddress: (input: GetAddressRequest) => Promise<Response<GetAddressResponse>>;
export declare const constructPrivateKey: ({ idToken, owner, }: GetPrivateKeyRequest) => Promise<Response<GetPrivateKeyResponse>>;
