import type {
    GetAddressRequest,
    GetAddressResponse,
    ConstructPrivateKeyRequest,
    ConstructPrivateKeyResponse,
    Response,
} from '@types'
export declare const getAddress: (
    input: GetAddressRequest
) => Promise<Response<GetAddressResponse>>
export declare const constructPrivateKey: ({
    idToken,
    owner,
}: ConstructPrivateKeyRequest) => Promise<Response<ConstructPrivateKeyResponse>>
