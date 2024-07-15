import { Response } from "express";
import { BamblooError, BamblooStatusCode } from "../status";

export interface ResponsePacket {
    code: BamblooStatusCode,
    msg?: string
    data?: any
}

export function response(r: Response, code: BamblooStatusCode | ResponsePacket, msg?: string, data?: any) {
    if (typeof(code) =='object') {
        r.end(JSON.stringify(code))
    } else {
        var packet: ResponsePacket = { code: code }
        if (typeof(msg) != 'undefined') {
            packet.msg = msg
        }
        if (typeof(data) != 'undefined') {
            packet.data = data
        }
        r.end(JSON.stringify(packet))
    }
}

