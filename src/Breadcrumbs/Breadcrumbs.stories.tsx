import Breadcrumbs from "./";
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
      <a href="./">Home</a>,
      <a href="./">Library</a>,
      <span>Data</span>,
    ],
  },
};
