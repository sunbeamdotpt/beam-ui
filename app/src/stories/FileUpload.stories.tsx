import type { Meta, StoryObj } from "@storybook/react";
import StoryRender, { SingleFile as SingleFileRender, Disabled as DisabledRender, ImagesOnly as ImagesOnlyRender, Multiple as MultipleRender } from "@sunbeam/beam-ui/components/ui/file-upload.story";

const meta: Meta = {
  title: "UI/FileUpload",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};

export const SingleFile: Story = {
  render: () => <SingleFileRender />,
};

export const Disabled: Story = {
  render: () => <DisabledRender />,
};

export const ImagesOnly: Story = {
  render: () => <ImagesOnlyRender />,
};

export const Multiple: Story = {
  render: () => <MultipleRender />,
};
