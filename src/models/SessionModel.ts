import {AbstractModel} from "../abstracts/AbstractModel";
import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {SessionInterface} from "../interfaces/data/SessionInterface";
import {DataType} from "../enums/DataType";
import {SceneInterface} from "../interfaces/data/SceneInterface";
import {MusicTableComponent} from "../components/MusicTableComponent";
import {SceneTableComponent} from "../components/SceneTableComponent";
import {RecordInterface} from "../interfaces/database/RecordInterface";
import {CharacterTableComponent} from "../components/CharacterTableComponent";
import {LocationTableComponent} from "../components/LocationTableComponent";
import {FactionTableComponent} from "../components/FactionTableComponent";
import {ClueTableComponent} from "../components/ClueTableComponent";
import {EventTableComponent} from "../components/EventTableComponent";

export class SessionModel extends AbstractModel {
	protected currentElement: SessionInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		await this.response.addComponent(
			MusicTableComponent,
			this.currentElement.getRelationships(DataType.Music, false),
		);

		await this.response.addComponent(
			SceneTableComponent,
			this.app.plugins.getPlugin('rpg-manager').database.readListParametrised<SceneInterface>(
				DataType.Scene,
				this.currentElement.campaign.campaignId,
				this.currentElement.adventure.adventureId,
				this.currentElement.sessionId,
				undefined,
			).sort(function (leftData: SceneInterface, rightData: SceneInterface) {
				if (leftData.sceneId > rightData.sceneId) return +1;
				if (leftData.sceneId < rightData.sceneId) return -1;
				return 0;
			}),
		);

		await this.response.addComponent(
			CharacterTableComponent,
			this.currentElement.getRelationships(DataType.Character|DataType.NonPlayerCharacter),
		);

		await this.response.addComponent(
			LocationTableComponent,
			this.currentElement.getRelationships(DataType.Location),
		);

		await this.response.addComponent(
			FactionTableComponent,
			this.currentElement.getRelationships(DataType.Faction),
		);

		await this.response.addComponent(
			ClueTableComponent,
			this.currentElement.getRelationships(DataType.Clue),
		);

		await this.response.addComponent(
			EventTableComponent,
			this.currentElement.getRelationships(DataType.Character|DataType.Event),
		);

		return this.response;
	}
}
