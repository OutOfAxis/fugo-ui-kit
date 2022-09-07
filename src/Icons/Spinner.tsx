import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export const Spinner = ({
  className = "",
  show,
}: {
  className?: string;
  show?: boolean;
}) => {
  if (!show) return null;

  return (
    <FontAwesomeIcon className={className || "mr-1"} icon={faSpinner} spin />
  );
};
Spinner.displayName = "Spinner";
