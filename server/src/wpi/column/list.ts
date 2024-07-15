import { NextFunction } from "express";
import { Response } from "express";
import { response } from "../../util/secretary";
import { BamblooStatusCode } from "../../status";
import { ColumnModel } from "../../model/column";

export default function handler(params: any, req: Request, res : Response, next: NextFunction) {
    return ColumnModel.instance().then(model => {
        return model.find({}).then(list => {
            response(res, BamblooStatusCode.Success, "栏目列表", list)
        })
    })
}