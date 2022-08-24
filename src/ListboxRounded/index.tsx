import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import useMedia from "use-media";

const MAX_MOBILE_SIZE = 640;

export function ListboxRounded<Option extends string = string>({
  className = "",
  selected,
  onSelect,
  title,
  options,
}: {
  className?: string;
  selected: Option;
  onSelect: (newValue: Option) => void;
  title: string;
  options: Record<Option, string>;
}) {
  const isMobile = useMedia({ maxWidth: MAX_MOBILE_SIZE });

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        className={`${className} text-gray-700 border border-gray-300 rounded-full pr-2.5 pl-3 text-sm outline-none h-10 whitespace-nowrap`}
      >
        <span className="mr-2">
          {isMobile ? "" : title} <b>{options[selected]}</b>
        </span>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="z-menu-overlay text-gray-200 bg-gray-900 py-3 text-sm rounded-lg shadow">
          {(Object.keys(options) as Array<Option>).map((key, i) => (
            <DropdownMenu.Item
              key={`key_${key}`}
              className={`${
                i ? "mt-1" : ""
              } px-4 outline-none hover:bg-gray-800 cursor-pointer`}
              onSelect={() => onSelect(key)}
            >
              {title} <b>{options[key]}</b>
            </DropdownMenu.Item>
          ))}
          <DropdownMenu.Arrow />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
ListboxRounded.displayName = "ListboxRounded";
