export type NewUser = {
	givenName: string
	familyName: string
	email: string
}

export type User = NewUser & {
	id: string
}

export type UpdateUser = Partial<User> & Pick<User, 'id'>

export interface IUserModel {
	find(): Promise<User[]>

	findById(id: User['id']): Promise<User | undefined>

	findByEmail(email: User['email']): Promise<User | undefined>

	count(): Promise<number>

	create(user: NewUser): Promise<User>

	update(user: UpdateUser): Promise<User | undefined>

	delete(id: User['id']): Promise<void>
}
