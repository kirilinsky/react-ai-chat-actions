import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { ActionBar } from "./action-bar";
import { ActionId } from "../../types";

afterEach(cleanup);

const noop = () => {};

describe("ActionBar", () => {
  it("renders a labelled toolbar with buttons and separators", () => {
    render(
      <ActionBar
        messageId="m1"
        actions={["like", "divider", "copy"]}
        onAction={noop}
      />
    );

    const toolbar = screen.getByRole("toolbar", { name: "Message actions" });
    expect(toolbar).toBeTruthy();
    expect(screen.getByRole("button", { name: "Like" })).toBeTruthy();
    expect(screen.getByRole("separator")).toBeTruthy();
  });

  it("calls onAction on every click, including toggling off", () => {
    const onAction = vi.fn();
    render(<ActionBar messageId="m1" actions={["like"]} onAction={onAction} />);

    const like = screen.getByRole("button", { name: "Like" });
    fireEvent.click(like);
    expect(like.getAttribute("aria-pressed")).toBe("true");
    fireEvent.click(like);
    expect(like.getAttribute("aria-pressed")).toBe("false");
    expect(onAction).toHaveBeenCalledTimes(2);
    expect(onAction).toHaveBeenCalledWith("m1", "like");
  });

  it("keeps like and dislike mutually exclusive", () => {
    render(
      <ActionBar messageId="m1" actions={["like", "dislike"]} onAction={noop} />
    );

    const like = screen.getByRole("button", { name: "Like" });
    const dislike = screen.getByRole("button", { name: "Dislike" });
    fireEvent.click(like);
    fireEvent.click(dislike);
    expect(like.getAttribute("aria-pressed")).toBe("false");
    expect(dislike.getAttribute("aria-pressed")).toBe("true");
  });

  it("supports controlled active state", () => {
    const onChange = vi.fn();
    const Controlled = () => {
      const [active, setActive] = useState<ActionId[]>(["pin"]);
      return (
        <ActionBar
          messageId="m1"
          actions={["like", "pin"]}
          activeActions={active}
          onActiveActionsChange={(id, next) => {
            onChange(id, next);
            setActive(next);
          }}
          onAction={noop}
        />
      );
    };
    render(<Controlled />);

    expect(
      screen.getByRole("button", { name: "Pin" }).getAttribute("aria-pressed")
    ).toBe("true");

    fireEvent.click(screen.getByRole("button", { name: "Like" }));
    expect(onChange).toHaveBeenCalledWith("m1", ["pin", "like"]);
    expect(
      screen.getByRole("button", { name: "Like" }).getAttribute("aria-pressed")
    ).toBe("true");
  });

  it("seeds uncontrolled state from defaultActiveActions", () => {
    render(
      <ActionBar
        messageId="m1"
        actions={["like"]}
        defaultActiveActions={["like"]}
        onAction={noop}
      />
    );
    expect(
      screen.getByRole("button", { name: "Like" }).getAttribute("aria-pressed")
    ).toBe("true");
  });

  it("renders custom actions and tracks toggle state", () => {
    const onAction = vi.fn();
    render(
      <ActionBar
        messageId="m1"
        actions={[
          { id: "explain", icon: <span>E</span>, label: "Explain" },
          { id: "raw", icon: <span>R</span>, label: "Raw", toggle: true },
        ]}
        onAction={onAction}
      />
    );

    const explain = screen.getByRole("button", { name: "Explain" });
    const raw = screen.getByRole("button", { name: "Raw" });

    fireEvent.click(explain);
    expect(onAction).toHaveBeenCalledWith("m1", "explain");
    expect(explain.getAttribute("aria-pressed")).toBe("false");

    fireEvent.click(raw);
    expect(raw.getAttribute("aria-pressed")).toBe("true");
  });

  it("renders custom icons for built-in actions in place of the default", () => {
    render(
      <ActionBar
        messageId="m1"
        actions={["like", "dislike"]}
        icons={{ like: <span data-testid="custom-like">L</span> }}
        onAction={noop}
      />
    );

    const like = screen.getByRole("button", { name: "Like" });
    expect(like.querySelector('[data-testid="custom-like"]')).toBeTruthy();

    const dislike = screen.getByRole("button", { name: "Dislike" });
    expect(dislike.querySelector('[data-testid="custom-like"]')).toBeFalsy();
  });

  it("copies via built-in handler when copyText is set", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });

    render(
      <ActionBar
        messageId="m1"
        actions={["copy"]}
        copyText="hello"
        onAction={noop}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Copy" }));
    expect(writeText).toHaveBeenCalledWith("hello");
    expect(await screen.findByRole("button", { name: "Copied" })).toBeTruthy();
  });

  it("moves focus with arrow keys via roving tabindex", () => {
    render(
      <ActionBar
        messageId="m1"
        actions={["like", "dislike", "copy"]}
        onAction={noop}
      />
    );

    const like = screen.getByRole("button", { name: "Like" });
    const dislike = screen.getByRole("button", { name: "Dislike" });
    expect(like.getAttribute("tabindex")).toBe("0");
    expect(dislike.getAttribute("tabindex")).toBe("-1");

    like.focus();
    fireEvent.keyDown(screen.getByRole("toolbar"), { key: "ArrowRight" });
    expect(document.activeElement).toBe(dislike);
    expect(dislike.getAttribute("tabindex")).toBe("0");
    expect(like.getAttribute("tabindex")).toBe("-1");
  });

  it("marks loading buttons busy and disabled", () => {
    render(
      <ActionBar
        messageId="m1"
        actions={["regenerate"]}
        loading={["regenerate"]}
        onAction={noop}
      />
    );
    const btn = screen.getByRole("button", { name: "Regenerate" });
    expect(btn.getAttribute("aria-busy")).toBe("true");
    expect((btn as HTMLButtonElement).disabled).toBe(true);
  });
});
