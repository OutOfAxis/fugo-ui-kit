import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { ReactComponent as BulbIcon } from "./icons/bulb.svg";

const TopTip = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  const { t } = useTranslation();

  return (
    <div className={`text-gray-800 mt-12 text-center ${className}`}>
      <BulbIcon className="inline align-text-bottom mr-1 text-purple-600" />
      <span className="font-bold">
        {t("components.topTip", "ProTip!")}
      </span>{" "}
      {children}
    </div>
  );
};

export default TopTip;
