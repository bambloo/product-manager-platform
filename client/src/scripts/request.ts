import axios, { AxiosError } from 'axios'
import result from './result'

export interface ResponsePacket {
  code: number
  msg?: string
  data?: any
}
type ResponseCallback = (packet: ResponsePacket) => any

let global_error_callback: ResponseCallback

export function onError(callback: ResponseCallback) {
  global_error_callback = callback
}

export function post(url: string, data: any): Promise<ResponsePacket> {
  return axios(url, {
    method: 'post',
    data: data
  })
    .then((response) => {
      const data = response.data as ResponsePacket
      if (data.code == result.Success) {
        return data
      } else {
        throw data
      }
    })
    .catch((err) => {
      if (err instanceof AxiosError) {
        throw { code: result.NetworkInvalid, msg: err.message }
      } else {
        throw err
      }
    })
}
