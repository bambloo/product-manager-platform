import { ColumnDesc, ColumnUri } from "../entity/column";
import { Mutex } from "../util/mutex";
import { BaseModel } from "./base";

export class ColumnModel extends BaseModel<ColumnUri, ColumnDesc> {

    private static global = new ColumnModel('columns', ['uri'])
    // private static inited = false
    // private static mutex = new Mutex

    static instance(): Promise<ColumnModel> {
        return Promise.resolve(this.global)
    //     return new Promise((resolve, reject) => {
    //         if (this.inited) {
    //             resolve(this.global)
    //         }
    //         return this.mutex.do(() => {
    //             if (this.inited) {
    //                 return resolve(this.global)
    //             }
    //             return this.global.init().then(() => {
    //                 this.inited = true
    //                 resolve(this.global)
    //             })
    //         })
    //         .catch(reject)
    //     })
    }
}