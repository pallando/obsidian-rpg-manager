export interface RpgManagerSettingsInterface {
	campaignTag: string;
	adventureTag: string;
	sessionTag: string;
	sceneTag: string;
	npcTag: string;
	pcTag: string;
	locationTag: string;
	factionTag: string;
	eventTag: string;
	clueTag: string;
	timelineTag: string;
	noteTag: string;
	automaticMove: boolean;
	templateFolder: string;
	musicTag: string;
	YouTubeKey: string;
}

export const RpgManagerDefaultSettings: RpgManagerSettingsInterface = {
	campaignTag: 'rpgm/outline/campaign',
	adventureTag: 'rpgm/outline/adventure',
	sessionTag: 'rpgm/outline/session',
	sceneTag: 'rpgm/outline/scene',
	npcTag: 'rpgm/element/character/npc',
	pcTag: 'rpgm/element/character/pc',
	locationTag: 'rpgm/element/location',
	factionTag: 'rpgm/element/faction',
	eventTag: 'rpgm/element/event',
	clueTag: 'rpgm/element/clue',
	timelineTag: 'rpgm/element/timeline',
	noteTag: 'rpgm/outline/note',
	automaticMove: true,
	templateFolder: '',
	musicTag: 'rpgm/element/music',
	YouTubeKey: '',
}