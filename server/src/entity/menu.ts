import { BaseUri } from '../model/base'

export interface MenuUri extends BaseUri {
  id: number
  label: string
}

export interface MenuDesc extends MenuUri {}

export class Menu {
  desc: MenuDesc

  constructor(desc: MenuDesc) {
    this.desc = desc
  }
}
