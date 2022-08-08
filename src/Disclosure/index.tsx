import React from "react";
import {
  Disclosure as DisclosureReach,
  DisclosureButton as DisclosureButtonReach,
  DisclosurePanel as DisclosurePanelReach,
} from "@reach/disclosure";

import { ReactComponent as ArrowDownIcon } from "./media/arrow-down.svg";
import "./index.module.css";

export function Disclosure({
  children,
  isOpen,
  onChange,
}: {
  children: React.ReactNode;
  isOpen?: boolean;
  onChange?: () => void;
}) {
  return (
    <DisclosureReach open={isOpen} onChange={onChange}>
      {children}
    </DisclosureReach>
  );
}

export function DisclosureButton({ label }: { label: string }) {
  return (
    <DisclosureButtonReach style={{ outline: 0 }}>
      <p className="flex items-center font-bold text-gray-700">
        <ArrowDownIcon className="mr-1" />
        {label}
      </p>
    </DisclosureButtonReach>
  );
}

export function DisclosurePanel({ children }: { children: React.ReactNode }) {
  return (
    <DisclosurePanelReach style={{ outline: 0 }} className="pl-5">
      {children}
    </DisclosurePanelReach>
  );
}
