import { BN, EC } from '../common'
import { decodePublicKey, ellipticAddition } from '../common/secp256k1'
import { lagrangeInterpolation, sumMod } from '../libs'
import { Point } from '../types'

describe('sumOfPublicKeys', () => {
    const MASTER_SHARES: Point[] = [
        '4b5f616d2e4b8040b65485b3409f89cb6e28ff2987a84fc73ac31e08c3b25bc0',
        '6f808ef7a21326519ad0146713e78a953b9e0932de8c4b8ddcab809b115fc460',
        '93a1bc8215dacc627f4ba31ae72f8b5f0913133c357047547e93e32d5f0d2d00',
    ].map((e, i) => ({
        x: BN.from(i + 1),
        y: BN.from(e, 16),
    }))

    const SECRETS: BN[] = [
        '71c2ab4d192b1f5857c5b743b20576d75cd3201bfe381cd71133bbd0697f1a24',
        '7f56051073f04f0463dd5277ee900cdfdf0f3aa74075d48174bae8a454e14283',
        '362583852d686bd31635ed43ccc205491f807743a15f02e3d2be758e87dad7ba',
    ].map((e) => BN.from(e, 16))

    it('lagrangeInterpolation', () => {
        const masterSecretFromThreeMasterShares = lagrangeInterpolation(
            MASTER_SHARES,
            BN.ZERO
        )!.toString(16, 64)

        const masterSecretFromTwoMasterShares = lagrangeInterpolation(
            MASTER_SHARES.slice(0, 2),
            BN.ZERO
        )!.toString(16, 64)

        expect(masterSecretFromThreeMasterShares).toEqual(
            masterSecretFromTwoMasterShares
        )

        const masterSecret = sumMod(
            SECRETS.map((e) => e.toString(16, 64)),
            EC.ORDER
        )

        expect(masterSecretFromThreeMasterShares).toEqual(masterSecret)
    })

    it('should sum public keys', () => {
        const publicKeySecrets = SECRETS.map((e) =>
            EC.secp256k1
                .keyFromPrivate(e.toString(16, 64), 'hex')
                .getPublic('hex')
        ).map((e) => ({
            x: BN.from(e.slice(2, 66), 16),
            y: BN.from(e.slice(66), 16),
        }))

        const sumPublicKeySecret = ellipticAddition(
            ellipticAddition(publicKeySecrets[0], publicKeySecrets[1]),
            publicKeySecrets[2]
        )

        const masterSecret = SECRETS.reduce((acc, e) => acc.add(e), BN.ZERO)

        const publicKeyMasterSecret = EC.secp256k1
            .keyFromPrivate(masterSecret.toString(16, 64), 'hex')
            .getPublic('hex')

        expect(
            '04' +
                sumPublicKeySecret.x.toString(16, 64) +
                sumPublicKeySecret.y.toString(16, 64)
        ).toEqual(publicKeyMasterSecret)
    })

    it('test', () => {
        const publicKey =
            '04b7835e3f0aadf3ef8c822e82204c14782f071e340c84a103e4214608506229b8bdbb9f55cbabda0a0412f55c81fbfb611186bc6a4995422d396ed9b8ea7a7965'

        const decodedPublicKey = decodePublicKey(publicKey)
        console.log(decodedPublicKey)
    })
})
