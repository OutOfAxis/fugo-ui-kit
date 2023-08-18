import {
  Breadcrumbs,
  BreadcrumbsItemCurrent,
  BreadcrumbsItemLink,
  BreadcrumbsItem,
} from "./";
import { Meta, StoryObj } from "@storybook/react";

const Component = Breadcrumbs;

type Case = StoryObj<typeof Component>;

export default {
  component: Component,
} as Meta<typeof Component>;

export const Base: Case = {
  name: Component.name,
  args: {
    children: [
      <BreadcrumbsItemLink to="./">Home</BreadcrumbsItemLink>,
      <BreadcrumbsItem>Library</BreadcrumbsItem>,
      <BreadcrumbsItemCurrent>Data</BreadcrumbsItemCurrent>,
    ],
  },
};
