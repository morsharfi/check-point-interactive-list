import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { InteractiveList } from "../components/InteractiveList";
import { InteractiveListProps } from "../components/InteractiveList/types";

const Wrapper = (args: Omit<InteractiveListProps, "onChange">) => {
  const [items, setItems] = useState<string[]>(args.items ?? []);

  return <InteractiveList {...args} items={items} onChange={setItems} />;
};

const meta: Meta<typeof Wrapper> = {
  title: "Components/InteractiveList",
  component: Wrapper,
  tags: ["autodocs"],
  argTypes: {
    customValidate: { control: false },
    regexValidate: { control: false },
  },
};

export default meta;

type Story = StoryObj<typeof Wrapper>;

export const Default: Story = {
  render: () => <Wrapper items={["www.google.com/", "www.github.com/"]} />,
};

export const EmptyList: Story = {
  render: () => <Wrapper items={[]} emptyMessage="No items added yet" />,
};

export const LoadingState: Story = {
  render: () => <Wrapper items={["initial item"]} loading={true} />,
};

export const RegexValidation: Story = {
  render: () => {
    const urlRegex = /^www\.[A-Za-z0-9.-]+\.[A-Za-z]{2,}\//;

    return <Wrapper items={[]} regexValidate={urlRegex} />;
  },
};
