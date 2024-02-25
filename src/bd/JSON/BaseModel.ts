import { Low, LowSync } from "lowdb/lib";
import { JSONDBStructure } from ".";

export default class BaseModel {
	constructor(
		public db: Low<JSONDBStructure> | LowSync<JSONDBStructure>
	) {}
}
