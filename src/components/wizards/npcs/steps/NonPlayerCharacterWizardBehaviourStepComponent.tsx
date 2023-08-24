import * as React from "react";
import { useTranslation } from "react-i18next";
import TextAreaComponent from "src/components/attributes/primitives/TextAreaComponent";
import ChatGptSuggestionComponent from "src/components/chatgpt/ChatGptSuggestionComponent";
import MarkdownComponent from "src/components/markdowns/MarkdownComponent";
import { useWizard } from "src/hooks/useWizard";
import { ChatGptNonPlayerCharacterModel } from "src/services/ChatGptService/models/ChatGptNonPlayerCharacterModel";

export default function NonPlayerCharacterWizardBehaviourStepComponent({
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

	const [key, setKey] = React.useState<number>(Date.now());
	const [behaviour, setBehaviour] = React.useState<string | undefined>(wizardData.behaviour);

	const updateBehaviour = (value: string) => {
		wizardData.behaviour = value;
		setBehaviour(value);
	};

	const applySuggestion = (suggestion: string) => {
		const updatedBehaviour = behaviour ? `${behaviour}\n${suggestion}` : suggestion;

		updateBehaviour(updatedBehaviour);
		setKey(Date.now());
	};

	async function generateSuggestions(): Promise<string[]> {
		try {
			return await chatGpt.getBehaviour();
		} catch (error) {
			console.error("Failed to fetch behaviour:", error);
		}
	}

	return (
		<>
			<h3 className="!m-0 !text-xl !font-extralight">{t("attributes.behaviour")}</h3>
			<div className="!mt-3 !mb-3">
				<MarkdownComponent value={t("wizards.npc.description", { context: "behaviour", name: name })} />
			</div>
			<div className="">
				<TextAreaComponent
					key={key}
					initialValue={behaviour}
					campaignPath={campaignPath}
					onChange={updateBehaviour}
					className="w-full resize-none overflow-y-hidden border border-[--background-modifier-border] rounded-md"
				/>
			</div>
			{chatGpt && (
				<ChatGptSuggestionComponent generateSuggestions={generateSuggestions} applySuggestions={applySuggestion} />
			)}
		</>
	);
}