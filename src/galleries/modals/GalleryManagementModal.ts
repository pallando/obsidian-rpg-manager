import {AbstractModal} from "../../modals/abstracts/AbstractModal";
import {GalleryViewType} from "../enums/GalleryViewType";
import {App} from "obsidian";
import {ComponentInterface} from "../../components/interfaces/ComponentInterface";

export class GalleryManagementModal extends AbstractModal {
	protected title = 'Gallery Manager';

	private _containerEl: HTMLDivElement;

	constructor(
		app: App,
		private _component: ComponentInterface,
	) {
		super(app);
	}

	onClose() {
		super.onClose();

		this.rpgmContainerEl.empty();
	}

	onOpen() {
		super.onOpen();
		this.modalEl.style.width = 'var(--modal-max-width)';

		this._containerEl = this.rpgmContainerEl.createDiv({cls:'gallery'});

		const view = this.factories.imageView.create(GalleryViewType.ModalNavigation, this._component);
		view.render(this._containerEl);
	}
}