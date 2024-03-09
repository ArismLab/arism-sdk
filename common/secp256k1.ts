import elliptic from 'elliptic'
import { BN } from '../common'
import { Point } from '../types'

export const secp256k1 = new elliptic.ec('secp256k1')

export const ORDER = secp256k1.curve.n

export const decodePublicKey = (publicKey: string): Point => {
    const x = BN.from(publicKey.slice(2, 66), 16)
    const y = BN.from(publicKey.slice(66), 16)

    return { x, y }
}

export const encodePublicKey = (point: Point): string => {
    return `04${point.x.toString(16, 64)}${point.y.toString(16, 64)}`
}

export const ellipticAddition = (p1: Point, p2: Point): Point => {
    const p1CurvePoint = secp256k1.curve.point(p1.x, p1.y)
    const p2CurvePoint = secp256k1.curve.point(p2.x, p2.y)
    const p3CurvePoint = p1CurvePoint.add(p2CurvePoint)

    return {
        x: p3CurvePoint.getX(),
        y: p3CurvePoint.getY(),
    }
}
