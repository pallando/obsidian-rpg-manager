import * as React from "react";
import { useTranslation } from "react-i18next";
import TextAreaComponent from "src/components/attributes/primitives/TextAreaComponent";
import MarkdownComponent from "src/components/markdowns/MarkdownComponent";
import { useWizard } from "src/hooks/useWizard";
import { ChatGptNonPlayerCharacterModel } from "src/services/ChatGptService/models/ChatGptNonPlayerCharacterModel";

export default function NonPlayerCharacterWizardDescriptionStepComponent({
	name,
	campaignPath,
	chatGpt,
}: {
	name: string;
	campaignPath?: string;
	chatGpt?: ChatGptNonPlayerCharacterModel;
}): React.ReactElement {
	const { t } = useTranslation();
	const wizardData = useWizard();

	const updateDescription = (value: string) => {
		wizardData.description = value;
	};

	return (
		<>
			<h3 className="!m-0 !text-xl !font-extralight">{t("attributes.description")}</h3>
			<div className="!mt-3 !mb-3">
				<MarkdownComponent value={t("wizards.npc.description", { context: "description", name: name })} />
			</div>
			<div className="">
				<TextAreaComponent
					initialValue={wizardData.description}
					campaignPath={campaignPath}
					onChange={updateDescription}
					className="w-full resize-none overflow-y-hidden border border-[--background-modifier-border] rounded-md"
				/>
			</div>
		</>
	);
}