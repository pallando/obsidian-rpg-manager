import {AbstractFactory} from "../abstracts/AbstractFactory";
import {RelationshipTypeFactoryInterface} from "../interfaces/factories/RelationshipTypeFactoryInterface";
import {RelationshipType} from "../database/relationships/enums/RelationshipType";

export class RelationshipTypeFactory extends AbstractFactory implements RelationshipTypeFactoryInterface {
	createRelationshipType(
		readableRelationshipType: string,
	): RelationshipType {
		readableRelationshipType = readableRelationshipType[0].toUpperCase() + readableRelationshipType.substring(1).toLowerCase();
		return RelationshipType[readableRelationshipType.toLowerCase() as keyof typeof RelationshipType];
	}

	createReadableRelationshipType(
		type: RelationshipType,
	): string {
		return RelationshipType[type].toString().toLowerCase();
	}
}