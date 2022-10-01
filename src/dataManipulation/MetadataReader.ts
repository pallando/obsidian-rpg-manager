import {AbstractRpgManager} from "../abstracts/AbstractRpgManager";
import {CachedMetadata, parseYaml, SectionCache, TFile} from "obsidian";
import {MetadataReaderInterface} from "../interfaces/dataManipulation/MetadataReaderInterface";

export class MetadataReader extends AbstractRpgManager implements MetadataReaderInterface{
	public async read(
		file: TFile,
	): Promise<any> {
		return this.app.vault.read(file)
			.then((fileContent: string) => {
				const fileCacheMetadata: CachedMetadata|null = this.app.metadataCache.getFileCache(file);
				if (fileCacheMetadata == null) return {};

				return this._getCodeBloksMetadata(fileContent, fileCacheMetadata);
			});
	}

	private async _getCodeBloksMetadata(
		fileContent: string,
		fileCacheMetadata: CachedMetadata,
	): Promise<any>{
		let response: any = {};

		const arrayContent: Array<string> = await fileContent.split('\n');
		const sections: Array<SectionCache>|undefined = fileCacheMetadata.sections;

		if (sections !== undefined) {
			for (let index = 0; index < sections.length; index++) {
				const section: SectionCache | undefined = sections[index];
				if (section !== undefined) {
					if (section.type === 'code') {
						if (arrayContent[section.position.start.line] === '```RpgManager') {
							let codeBlockContent = '';
							for (let index = section.position.start.line + 2; index < arrayContent.length; index++) {
								if (arrayContent[index] === '```') break;
								if (arrayContent[index] !== '') codeBlockContent += arrayContent[index] + '\n';
							}
							if (codeBlockContent !== '') response = {...response, ...parseYaml(codeBlockContent)};
						}
					}
				}
			}
		}

		return response;
	}
}