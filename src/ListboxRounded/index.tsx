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
        className={`${className} h-10 whitespace-nowrap rounded-full border border-gray-300 pr-2.5 pl-3 text-sm text-gray-700 outline-none`}
      >
        <span className="mr-2">
          {isMobile ? "" : title} <b>{options[selected]}</b>
        </span>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="z-menu-overlay rounded-lg bg-gray-900 py-3 text-sm text-gray-200 shadow">
          {(Object.keys(options) as Array<Option>).map((key, i) => (
            <DropdownMenu.Item
              key={`key_${key}`}
              className={`${
                i ? "mt-1" : ""
              } cursor-pointer px-4 outline-none hover:bg-gray-800`}
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
