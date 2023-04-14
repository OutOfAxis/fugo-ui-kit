import { forwardRef, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { ReactComponent as BulbIcon } from "./icons/bulb.svg";

export const TopTip = forwardRef<
  HTMLDivElement,
  {
    children: ReactNode;
    className?: string;
  }
>(({ children, className = "" }, ref) => {
  const { t } = useTranslation();

  return (
    <div className={`mt-12 text-center text-gray-800 ${className}`} ref={ref}>
      <BulbIcon className="mr-1 inline align-text-bottom text-purple-600" />
      <span className="font-bold">
        {t("components.topTip", "ProTip!")}
      </span>{" "}
      {children}
    </div>
  );
});
TopTip.displayName = "TopTip";
