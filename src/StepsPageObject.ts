import { getByText, RenderResult } from "@testing-library/react";

export class StepsPageObject {
    constructor(private renderResult: RenderResult) {
    }

    get container () {
        return this.renderResult.getByTestId("steps-container")
    }

    isActive(name: string) {
        const nameElement = getByText(this.container, name);
        const item = nameElement.closest(".ant-steps-item");
        return item?.classList.contains("ant-steps-item-active");
    }
}