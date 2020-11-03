import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { Media, MediaProps } from "./media";

export default {
  title: "Components/Media",
  component: Media,
} as Meta;

const Template: Story<MediaProps> = (args) => <Media {...args} />;

export const Local = Template.bind({});
