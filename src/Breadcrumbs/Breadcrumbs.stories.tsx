import {
  Breadcrumbs,
  BreadcrumbsItemCurrent,
  BreadcrumbsItemLink,
  BreadcrumbsItem,
} from "./";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

const Component = Breadcrumbs;

type Case = ComponentStoryObj<typeof Component>;

export default {
  component: Component,
} as ComponentMeta<typeof Component>;

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
