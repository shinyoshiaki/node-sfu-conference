import { Meta, Story } from "@storybook/react/types-6-0";
import { Provider } from "react-redux";
import createStore from "../redux/redux";
import { addMedia } from "../redux/remote";

import { RemoteMediaList } from "./remoteMediaList";

export default {
  title: "Container/RemoteMediaList",
  component: RemoteMediaList,
} as Meta;

const store = createStore();

navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
  [...Array(5)].forEach((_, i) => {
    store.dispatch(
      addMedia({
        stream,
        info: {
          mediaId: `${i}`,
          kind: "video",
          publisherId: `${i}`,
          simulcast: false,
        },
      })
    );
  });
});

const Template: Story = (args) => (
  <Provider store={store}>
    <RemoteMediaList {...args} />
  </Provider>
);

export const Test = Template.bind({});
