import { describe, expect, it } from "vitest";
import { act, render, screen } from "@testing-library/react";
import NavigationBar from "./NavigationBar";
import { navigation } from "./navigation.constant";
import { TestRouter } from "@/tests/TestRouter";
describe("NavigationBar", () => {
  it("should render all the navigation items", async () => {
    await act(async () =>
      render(<NavigationBar navigation={navigation} />, {
        wrapper: TestRouter,
      }),
    );
    navigation.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    });
  });
});
