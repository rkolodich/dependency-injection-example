import { container } from "./inversify.config";
import UserService from "./services/UserService";
import { TYPES } from "./types";
import { JSONFilePreset } from "lowdb/node";

const run = async () => {
	const userService: UserService = container.get(TYPES.USER_SERVICE)
	let count = await userService.count()
	console.log(`Users count: ${count}.`)

	const user = await userService.create({
		givenName: 'Melissa',
		familyName: 'Fowler',
		email: 'Melissa.Fowler@yaho.com'
	}).catch(console.error)


	const users = await userService.find()
	count = await userService.count()
	console.log(`Users list (${count}):`, users)

	if (!user) {
		return
	}

	await userService.delete(user.id)
	count = await userService.count()
	console.log(`User ${user.givenName} ${user.familyName} was deleted. Users count: ${count}.`)
}

run()

