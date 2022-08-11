import {AbstractListView} from "../abstracts/AbstractListView";
import {Component, MarkdownRenderer} from "obsidian";
import {TimelineListInterface} from "../data/TimelineData";
import {CampaignDataInterface} from "../data/CampaignData";

export class TimelineView extends AbstractListView {
	async render(
		data: TimelineListInterface
	): Promise<void> {
		let response : string = this.header(
			data.campaign,
		);

		data.elements.forEach((timeline) => {
			const fileLink = document.createElement('h3');
			MarkdownRenderer.renderMarkdown(
				timeline.link,
				fileLink,
				this.dv.currentFilePath,
				null as unknown as Component,
			);

			const synopsis = document.createElement('span');
			MarkdownRenderer.renderMarkdown(
				timeline.synopsis,
				synopsis,
				this.dv.currentFilePath,
				null as unknown as Component,
			);

			const date = this.functions.formatDate(timeline.time, "short");
			const time = this.functions.formatTime(timeline.time);
			response += '<li>' +
				'<div class="bullet' + timeline.getEventColour() + '"></div>' +
				'<div class="event-time">' + date + (time !== '00:00' ? '<br/>' + time : '') + '</div>' +
				'<div class="event-type' + timeline.getEventColour() + '">' + timeline.type + '</div>' +
				'<div class="event-details">' +
				fileLink.outerHTML +
				synopsis.outerHTML +
				'</div>' +
				'</li>'
		});

		response += this.footer();

		this.dv.container.innerHTML = response;
	}

	private header(
		campaign: CampaignDataInterface|null,
	): string {
		return '<div class="rpgm-container">' +
			'<div class="rpgm-header"' + (campaign?.imageSrc !== null ? campaign?.imageSrc : '') + '>' +
			'<div class="rpgm-header-overlay">' +
			'<div class="rpgm-header-title">Timeline</div>' +
			'<div class="rpgm-campaign-name">' + (campaign !== null ? campaign.name : "Campaign") + '</div>' +
			'<div class="rpgm-current-date">' + (campaign !== null ? this.functions.formatDate(campaign.currentDate, "long") : "") + '</div>' +
			'</div>' +
			'</div>' +
			'<div class="rpgm-timeline"><ul>';
	}

	private footer(
	): string {
		return '</ul></div></div>';
	}
}
