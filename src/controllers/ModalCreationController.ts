import { MarkdownView, Modal, Scope, TFile } from "obsidian";
import { createElement } from "react";
import { Root, createRoot } from "react-dom/client";
import { RpgManagerInterface } from "src/RpgManagerInterface";
import CreationComponent from "src/components/creation/CreationComponent";
import { ApiContext } from "src/contexts/ApiContext";
import { ElementType } from "src/data/enums/ElementType";

export class ModalCreationController extends Modal {
	constructor(
		private _api: RpgManagerInterface,
		private _type?: ElementType,
		private _addToCurrentNote: boolean = false
	) {
		super(app);

		this.scope = new Scope();

		this.scope.register([], "Escape", (evt) => {
			evt.preventDefault();
		});
	}

	onOpen() {
		super.onOpen();

		const { contentEl } = this;
		contentEl.empty();
		const root: Root = createRoot(contentEl);
		this.modalEl.style.width = "var(--modal-max-width)";

		let file: TFile | undefined = undefined;
		if (this._addToCurrentNote) {
			const activeView = app.workspace.getActiveViewOfType(MarkdownView);
			file = activeView.file;
		}

		const creationComponent = createElement(CreationComponent, {
			type: this._type,
			currentNote: file,
			controller: this,
		});
		const reactComponent = createElement(ApiContext.Provider, { value: this._api }, creationComponent);

		root.render(reactComponent);
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
		super.onClose();
	}
}