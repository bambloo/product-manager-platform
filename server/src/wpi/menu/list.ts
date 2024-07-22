import { NextFunction } from 'express'
import { Response } from 'express'
import { response } from '../../util/secretary'
import { BamblooStatusCode } from '../../status'
import { MenuModel } from '../../model/menu'

export default function handler(params: any, req: Request, res: Response, next: NextFunction) {
  return MenuModel.instance().then((model) => {
    return model.find({}).then((list) => {
      response(res, BamblooStatusCode.Success, '菜单列表', list)
    })
  })
}
