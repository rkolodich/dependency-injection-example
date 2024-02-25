import { IDB } from "#src/interfaces"
import { IUserModel } from "#src/models/UserModel"
import { injectable } from "inversify"
import "reflect-metadata"
import UserModel from "./UserModel"

@injectable()
export default class MockDB implements IDB {
	User: IUserModel

	constructor() {
		this.User = new UserModel()
	}
}
