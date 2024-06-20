import { RelationshipInterface } from "@/data/interfaces/RelationshipInterface";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { ElementType } from "src/data/enums/ElementType";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import ContainerComponent from "../groups/ContainerComponent";
import RelationshipListComponent from "./RelationshipListComponent";

export default function RelationshipsComponent({
  element,
  displayType,
}: {
  element: ElementInterface;
  displayType?: "list" | "grid";
}): React.ReactElement {
  if (
    element.relationships.filter(
      (relationship: RelationshipInterface) =>
        relationship.component !== undefined &&
        relationship.component.type !== ElementType.Campaign &&
        relationship.component.type !== ElementType.Adventure &&
        relationship.component.type !== ElementType.Chapter &&
        relationship.component.type !== ElementType.Session &&
        relationship.component.type !== ElementType.Scene &&
        relationship.component.type !== ElementType.Conflict,
    ).length === 0
  )
    return null;

  if (!displayType) displayType = "grid";

  const { t } = useTranslation();

  return (
    <ContainerComponent title={t("relationships.relationship", { count: 2 })}>
      <RelationshipListComponent
        key={element.type + "parent"}
        element={element}
        type={element.type}
        parent={true}
        children={false}
        displayType={displayType}
      />
      <RelationshipListComponent
        key={element.type + "children"}
        element={element}
        type={element.type}
        parent={false}
        children={true}
        displayType={displayType}
      />

      {Object.values(ElementType).map((type: ElementType) => {
        if (
          type === ElementType.Campaign ||
          type === ElementType.Adventure ||
          type === ElementType.Chapter ||
          type === ElementType.Conflict ||
          type === ElementType.Session ||
          type === ElementType.Scene
        )
          return null;
        return (
          <RelationshipListComponent
            key={type}
            element={element}
            type={type}
            parent={false}
            children={false}
            displayType={displayType}
          />
        );
      })}
    </ContainerComponent>
  );
}
