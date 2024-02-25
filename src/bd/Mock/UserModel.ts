import { IUserModel, NewUser, User } from "#src/models/UserModel"
import { v4 as uuidv4 } from 'uuid'

export default class UserModel implements IUserModel {
	private users: User[] = [
		{
			id: 'b73f4c92-089b-4cc7-9c87-3da2f7b0cbce',
			givenName: 'Monty',
			familyName: 'Fry',
			email: 'Monty.Fry@yahoo.com'
		},
		{
			id: '16919b7d-3b6e-4a91-b43b-2ff68b0449e8',
			givenName: 'Marquis',
			familyName: 'VonRueden',
			email: 'Marquis.VonRueden@yahoo.com'
		},
		{
			id: '0bd27a18-fff6-49fa-9875-2bc98fe85322',
			givenName: 'Stephania',
			familyName: 'Kessler',
			email: 'Stephania.Kessler@yahoo.com'
		},
	]

	async find() {
		return this.users
	}

	async findById(id: User['id']) {
		const index = this.findIndexById(id)
		if (index === -1) {
			return
		}
		return this.users[index]
	}

	async findByEmail(email: User['email']) {
		return this.users.find(user => user.email === email)
	}

	async create(user: NewUser): Promise<User> {
		const _user: User = { id: uuidv4(), ...user }
		this.users.push(_user)
		return _user
	}

	async update(user: Partial<User> & Pick<User, "id">) {
		const index = this.findIndexById(user.id)
		if (index === -1) {
			return
		}

		this.users[index] = {
			...this.users[index],
			...user,
		}
		return this.users[index]
	}

	async count(): Promise<number> {
		return this.users.length
	}

	async delete(id: User['id']) {
		const index = this.findIndexById(id)
		if (index === -1) {
			return
		}

		this.users.splice(index, 1)
	}

	private findIndexById(id: User['id']) {
		return this.users.findIndex(user => user.id === id)
	}
}
