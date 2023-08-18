import { StoryFn, Meta } from "@storybook/react";
import { ReactComponent as CheckCircleIcon } from "./CheckCircleIcon.svg";
import { ReactComponent as InfoIcon } from "./InfoIcon.svg";
import {
  PremiumIcon,
  PremiumIconSvg,
  PremiumIconBoxSvg,
  PremiumIconBox,
} from "./PremiumIcon";
import { ReactNode } from "react";
import { useTemporaryState } from "../useTemporaryState";
import { map } from "lodash";
import { CardName, ContentCard } from "../ContentCard/ContentCard";
import { Spinner } from "./Spinner";

const Icons = { PremiumIconSvg, PremiumIconBoxSvg };
const SvgIcons = { CheckCircleIcon, InfoIcon };

export default {
  title: "Icons",
} as Meta;

const svgImportTemplate = (name: string) =>
  `import { ReactComponent as ${name} } from "@outofaxis/fugo-ui-kit/lib/Icons/${name}.svg";`;

const iconUsageTemplate = (name: string) => `<${name} />`;

const ClipboardCopy = ({
  children,
  name,
  template = svgImportTemplate,
}: {
  children: ReactNode;
  name: string;
  template?: (name: string) => string;
}) => {
  const [isCopied, setIsCopied] = useTemporaryState(2000);
  return (
    <div
      className="flex cursor-pointer items-center space-x-2"
      onClick={() => {
        navigator.clipboard.writeText(template(name));
        setIsCopied(true);
      }}
    >
      <div>{children}</div>
      <div>{isCopied ? "Copied!" : "Copy"}</div>
    </div>
  );
};

export const AllIcons: StoryFn<{ color: string }> = ({ color }) => {
  return (
    <>
      {map(Icons, (Icon, name) => (
        <ClipboardCopy key={name} name={name} template={iconUsageTemplate}>
          <Icon color={color} />
        </ClipboardCopy>
      ))}
      {map(SvgIcons, (Icon, name) => (
        <ClipboardCopy key={name} name={name}>
          <Icon />
        </ClipboardCopy>
      ))}
    </>
  );
};
AllIcons.args = {
  color: "#000",
};

export const SpinnerStory: StoryFn<typeof Spinner> = (props) => (
  <Spinner {...props} />
);
SpinnerStory.args = {
  show: true,
};

export const PremiumIconStory = () => (
  <div className="flex">
    <div className="relative">
      Premium feature
      <PremiumIcon />
    </div>
  </div>
);

export const PremiumIconBoxStory = () => (
  <div className="flex">
    <ContentCard
      preview={
        <img
          src="https://placebear.com/g/200/300"
          className="h-full w-full object-cover"
          alt=""
        />
      }
    >
      <PremiumIconBox />
      <CardName>Premium Bear</CardName>
    </ContentCard>
  </div>
);
