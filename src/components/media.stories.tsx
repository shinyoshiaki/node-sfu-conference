import { Meta, Story } from "@storybook/react/types-6-0";
import { Media, MediaProps } from "./media";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

export default {
  title: "Components/Media",
  component: Media,
} as Meta;

const Template: Story<MediaProps> = (args) => <Media {...args} />;

export const Local = Template.bind({});
Local.args = {
  controls: (
    <div style={{ display: "flex" }}>
      <FontAwesomeIcon icon={faCoffee} />
      <FontAwesomeIcon icon={faCoffee} />
      <FontAwesomeIcon icon={faCoffee} />
      <FontAwesomeIcon icon={faCoffee} />
    </div>
  ),
};
