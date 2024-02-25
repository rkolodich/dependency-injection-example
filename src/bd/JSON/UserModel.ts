import { IUserModel, NewUser, User } from "#src/models/UserModel"
import { v4 as uuidv4 } from 'uuid'
import BaseModel from "./BaseModel"

export default class UserModel extends BaseModel implements IUserModel {
	async find() {
		return this.db.data.users
	}

	async findById(id: User['id']) {
		return this.db.data.users.find(user => user.id === id)
	}

	async findByEmail(email: User['email']) {
		return this.db.data.users.find(user => user.email === email)
	}

	async create(user: NewUser): Promise<User> {
		const _user = {
			id: uuidv4(),
			...user
		}
		this.db.data.users.push(_user)
		await this.db.write()
		return _user
	}

	async update(user: Partial<User> & Pick<User, "id">) {
		const index = this.findIndexById(user.id)
		if (index === -1) {
			return
		}

		const _user = { ...this.db.data.users[index], user }
		this.db.data.users.splice(index, 1, _user)
		await this.db.write()
		return _user
	}

	async count(): Promise<number> {
		return this.db.data.users.length
	}

	async delete(id: User['id']) {
		const index = this.findIndexById(id)
		if (index === -1) {
			return
		}

		this.db.data.users.splice(index, 1)
		await this.db.write()
	}

	private findIndexById(id: User['id']) {
		return this.db.data.users.findIndex(user => user.id === id)
	}
}
