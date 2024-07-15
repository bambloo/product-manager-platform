import { BaseUri } from "../model/base";

export interface ColumnUri extends BaseUri {
    name: string
}

export interface ColumnDesc extends ColumnUri{
}

export class Column {
    desc: ColumnDesc
    referrer: number = 0

    constructor(desc: ColumnDesc) {
        this.desc = desc
    }
}
