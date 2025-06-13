import type { Meta, StoryObj } from '@storybook/vue3';
import HelloUser from '../components/HelloUser.vue';
import { expect, fn, userEvent, waitFor, within } from 'storybook/internal/test';

const meta: Meta<typeof HelloUser> = {
  title: 'Components/HelloUser',
  component: HelloUser,
  args: {
    name: 'jaewon',
    modelValue: 0, // v-model 바인딩 초기값
  },
  argTypes: {
    modelValue: { control: 'number' },
  },
}
export default meta;

type Story = StoryObj<typeof HelloUser>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = await canvas.findByText('Hit the URL')

    // 클릭 이벤트 발생시키기
    await userEvent.click(button)

    // 버튼 누른 후 화면에 'Success!!'가 표시되는지로 확인
    await canvas.findByText('Success!!')
  },
};

export const IsName: Story = {
  args: {
    name: 'Chat GPT'
  },
};
