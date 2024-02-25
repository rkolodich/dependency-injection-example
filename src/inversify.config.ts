import { Container } from "inversify"
import { TYPES } from "./types"
import { IDB } from "./interfaces";
import { MockDB, JSONDB } from "./bd";
import UserService from "./services/UserService";

const container = new Container()

container.bind<IDB>(TYPES.DB).to(MockDB)
container.bind<UserService>(TYPES.USER_SERVICE).to(UserService)

export { container }
