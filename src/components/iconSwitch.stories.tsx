import { Meta, Story } from "@storybook/react/types-6-0";
import { IconSwitch, IconSwitchProps } from "./iconSwitch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faMicrophoneSlash,
} from "@fortawesome/free-solid-svg-icons";

export default {
  title: "Components/IconSwitch",
  component: IconSwitch,
} as Meta;

const Template: Story<IconSwitchProps> = (args) => <IconSwitch {...args} />;

export const Sample = Template.bind({});
Sample.args = {
  initial: true,
  active: <FontAwesomeIcon icon={faMicrophone} />,
  inactive: <FontAwesomeIcon icon={faMicrophoneSlash} />,
};
