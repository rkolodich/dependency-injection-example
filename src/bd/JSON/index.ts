import { IDB } from "#src/interfaces";
import { IUserModel, User } from "#src/models/UserModel";
import { injectable } from "inversify";
import { Low, LowSync } from "lowdb";
import { JSONFile, JSONFileSync } from "lowdb/node";
import "reflect-metadata";
import UserModel from "./UserModel";

@injectable()
export default class JSONDB implements IDB {
	User: IUserModel

	private dbPath: string = 'db.json'

	constructor() {
		const defaultData: JSONDBStructure = {
			users: []
		}

		const jsonFile = new JSONFileSync<JSONDBStructure>(this.dbPath)
		const data = jsonFile.read()
		const db = new LowSync(jsonFile, data || defaultData)

		this.User = new UserModel(db)
	}
}

export type JSONDBStructure = {
	users: User[]
}
