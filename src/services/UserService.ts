import { IDB } from "#src/interfaces";
import { NewUser, UpdateUser, User } from "#src/models/UserModel";
import { TYPES } from "#src/types";
import { inject, injectable } from "inversify";
import "reflect-metadata";

@injectable()
export default class UserService {
	constructor(
		@inject(TYPES.DB) private db: IDB
	) {}

	async find() {
		return this.db.User.find()
	}

	async findById(id: User['id']) {
		return this.db.User.findById(id)
	}

	async findByEmail(email: User['email']) {
		return this.db.User.findByEmail(email)
	}

	async count() {
		return this.db.User.count()
	}

	async create(user: NewUser) {
		try {
			let _user = await this.db.User.findByEmail(user.email)
			if (_user) {
				throw new Error(`User exists with ${user.email} email`)
			}

			return await this.db.User.create(user)
		}
		catch (error) {
			throw error
		}
	}

	async update(user: UpdateUser) {
		try {
			let _user = this.findById(user.id)
			if (!_user) {
				throw new Error(`User doesn't exists with ${user.id} ID`)
			}

			return await this.db.User.update(user)
		}
		catch (error) {
			throw error
		}
	}

	async delete(id: User['id']) {
		try {
			await this.db.User.delete(id)
		}
		catch (error) {
			throw error
		}
	}
}
