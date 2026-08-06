import { ActionBarProps, ActionId } from "../../types";
import ActionButton from "../action-button/action-button";
import useChatActions from "../../hooks/use-chat-actions";
import { Tooltip } from "../tooltip/tooltip";
import buttonsMeta, { toggleActions } from "../../meta/buttons";
import { Fragment } from "react/jsx-runtime";
import { useEffect, useMemo, useRef, useState } from "react";
import { Check } from "lucide-react";

const resolveText = (text?: string | (() => string)) =>
  typeof text === "function" ? text() : text;

export const ActionBar = ({
  messageId,
  actions,
  onAction,
  visible = true,
  transparent = false,
  loading,
  disabled,
  activeActions,
  defaultActiveActions,
  onActiveActionsChange,
  copyText,
  speakText,
  icons,
  ariaLabel = "Message actions",
  tooltip = true,
  liquidGlass,
  theme = "light-pill",
}: ActionBarProps) => {
  const toggleIds = useMemo(() => {
    const ids = new Set<string>(toggleActions);
    actions.forEach((item) => {
      if (typeof item !== "string" && item.toggle) ids.add(item.id);
    });
    return ids;
  }, [actions]);

  const { isActive, handleAction, setActionActive } = useChatActions({
    messageId,
    onAction,
    toggleIds,
    activeActions,
    defaultActiveActions,
    onActiveActionsChange,
  });

  const barRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);

  const [copied, setCopied] = useState(false);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(
    () => () => {
      clearTimeout(copyTimeoutRef.current);
      if (utteranceRef.current) {
        utteranceRef.current = null;
        window.speechSynthesis?.cancel();
      }
    },
    []
  );

  const runCopy = () => {
    const text = resolveText(copyText);
    if (!text || typeof navigator === "undefined" || !navigator.clipboard) {
      return;
    }
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        clearTimeout(copyTimeoutRef.current);
        copyTimeoutRef.current = setTimeout(() => setCopied(false), 1600);
      })
      .catch(() => {});
  };

  const runSpeak = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }
    if (isActive("speak")) {
      utteranceRef.current = null;
      window.speechSynthesis.cancel();
      return;
    }
    const text = resolveText(speakText);
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => {
      // only the utterance still owning the ref may deactivate
      if (utteranceRef.current === utterance) {
        utteranceRef.current = null;
        setActionActive("speak", false);
      }
    };
    utteranceRef.current = utterance;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const handleClick = (id: ActionId) => {
    if (id === "copy" && copyText !== undefined) runCopy();
    if (id === "speak" && speakText !== undefined) runSpeak();
    handleAction(id);
  };

  const handleButtonEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!liquidGlass || !pillRef.current || !barRef.current) return;

    const btn = e.currentTarget;
    const btnRect = btn.getBoundingClientRect();
    const barRect = barRef.current.getBoundingClientRect();

    const pill = pillRef.current;
    pill.style.translate = `${btnRect.left - barRect.left}px 0`;
    pill.style.width = `${btnRect.width}px`;
    pill.style.height = `${btnRect.height}px`;
    pill.classList.add("ca-glass-pill--visible");

    pill.classList.remove("ca-glass-pill--animate");
    requestAnimationFrame(() => pill.classList.add("ca-glass-pill--animate"));
  };

  const handleBarLeave = () => {
    if (!liquidGlass || !pillRef.current) return;
    pillRef.current.classList.remove("ca-glass-pill--visible");
  };

  // roving tabindex: one tab stop for the whole toolbar, arrows move focus
  const [focusIdx, setFocusIdx] = useState(0);

  const buttonStates = actions
    .filter((item) => item !== "divider")
    .map((item) => {
      const id = typeof item === "string" ? item : item.id;
      return {
        id,
        disabled: Boolean(disabled?.includes(id) || loading?.includes(id)),
      };
    });
  const firstEnabled = buttonStates.findIndex((b) => !b.disabled);
  const tabbableIdx =
    buttonStates[focusIdx] && !buttonStates[focusIdx].disabled
      ? focusIdx
      : firstEnabled;

  const handleBarKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const keys = ["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp", "Home", "End"];
    if (!keys.includes(e.key) || !barRef.current) return;

    const all = Array.from(
      barRef.current.querySelectorAll<HTMLButtonElement>(".ca-btn")
    );
    const enabled = all.filter((btn) => !btn.disabled);
    if (!enabled.length) return;
    e.preventDefault();

    const pos = enabled.indexOf(document.activeElement as HTMLButtonElement);
    let next: number;
    if (e.key === "Home") next = 0;
    else if (e.key === "End") next = enabled.length - 1;
    else {
      const delta = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : -1;
      next = pos === -1 ? 0 : (pos + delta + enabled.length) % enabled.length;
    }

    const target = enabled[next];
    target.focus();
    setFocusIdx(all.indexOf(target));
  };

  if (!visible) return null;
  return (
    <div
      data-theme={theme}
      className={`ca-bar${transparent ? " transparent" : ""}`}
      ref={barRef}
      role="toolbar"
      aria-label={ariaLabel}
      aria-orientation="horizontal"
      onKeyDown={handleBarKeyDown}
      onMouseLeave={handleBarLeave}
    >
      {liquidGlass && (
        <>
          <div ref={pillRef} className="ca-glass-pill" />
          <svg style={{ position: "absolute", width: 0, height: 0 }}>
            <filter id="ca-glass-filter" primitiveUnits="objectBoundingBox">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="0.04"
                result="blur"
              />
              <feDisplacementMap
                in="blur"
                in2="SourceGraphic"
                scale="0.5"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </svg>
        </>
      )}
      {actions.reduce<{ nodes: React.ReactNode[]; btnIdx: number }>(
        (acc, item, index) => {
          if (item === "divider") {
            acc.nodes.push(
              <div
                key={`divider-${index}`}
                className="ca-divider"
                role="separator"
                aria-orientation="vertical"
              />
            );
            return acc;
          }
          const btnIdx = acc.btnIdx++;
          const isCustom = typeof item !== "string";
          const id: ActionId = isCustom ? item.id : item;
          const meta = isCustom
            ? { icon: item.icon, label: item.label }
            : buttonsMeta[item];
          const showCopied = copied && id === "copy";
          const customIcon = !isCustom ? icons?.[item] : undefined;
          const icon = showCopied
            ? <Check size={16} />
            : (customIcon ?? meta.icon);
          const label = showCopied ? "Copied" : meta.label;
          const active = isActive(id);

          const button = (
            <ActionButton
              icon={icon}
              label={label}
              liquidGlass={liquidGlass}
              active={active}
              loading={loading?.includes(id)}
              disabled={disabled?.includes(id)}
              tabIndex={btnIdx === tabbableIdx ? 0 : -1}
              onFocus={() => setFocusIdx(btnIdx)}
              onClick={() => handleClick(id)}
              onMouseEnter={handleButtonEnter}
            />
          );

          acc.nodes.push(
            tooltip ? (
              <Tooltip
                key={`${id}-${index}`}
                label={label}
                disabled={disabled?.includes(id)}
              >
                {button}
              </Tooltip>
            ) : (
              <Fragment key={`${id}-${index}`}>{button}</Fragment>
            )
          );
          return acc;
        },
        { nodes: [], btnIdx: 0 }
      ).nodes}
    </div>
  );
};
