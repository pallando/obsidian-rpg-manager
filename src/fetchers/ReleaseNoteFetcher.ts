import {AbstractFetcher} from "../abstracts/AbstractFetcher";
import {MarkdownFetcherInterface} from "../interfaces/fetchers/MarkdownFetcherInterface";

export class ReleaseNoteFetcher extends AbstractFetcher implements MarkdownFetcherInterface{
	public fetchUrl = 'https://raw.githubusercontent.com/carlonicora/obsidian-rpg-manager/ver-2.0-acts/ChangeLog.md';

	public async fetchMarkdown(
	): Promise<string | null | undefined> {
		const apiResponse: any|undefined = await fetch(this.fetchUrl);
		if (apiResponse === undefined) return undefined;

		const response = await apiResponse.text();

		return response;
	}


}