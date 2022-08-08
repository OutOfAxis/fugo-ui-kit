import { ComponentStoryFn, Meta, StoryFn } from "@storybook/react";
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
import Spinner from "./Spinner";

const Icons = { PremiumIconSvg, PremiumIconBoxSvg };

export default {} as Meta;

const ClipboardCopy = ({
  children,
  name,
}: {
  children: ReactNode;
  name: string;
}) => {
  const [isCopied, setIsCopied] = useTemporaryState(2000);
  return (
    <div
      className="flex items-center space-x-2 cursor-pointer"
      onClick={() => {
        navigator.clipboard.writeText(`<${name} />`);
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
        <ClipboardCopy key={name} name={name}>
          <Icon color={color} />
        </ClipboardCopy>
      ))}
    </>
  );
};
AllIcons.args = {
  color: "#000",
};

export const SpinnerStory: ComponentStoryFn<typeof Spinner> = (props) => (
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
          className="w-full h-full object-cover"
          alt=""
        />
      }
    >
      <PremiumIconBox />
      <CardName>Premium Bear</CardName>
    </ContentCard>
  </div>
);
