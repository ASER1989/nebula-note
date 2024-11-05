import React from 'react';
import {Meta, StoryObj} from '@storybook/react';
import CodeEditor, {Props} from './index';
import {ViewUpdate} from "@uiw/react-codemirror";

const meta: Meta<Props> = {
  title: 'Components/CodeEditor',
  component: CodeEditor,
  parameters: {docs: {description: {component: ViewUpdate}}},
  args: {
    value: 'const App: React.FC = () => (\n' +
      '  <>\n' +
      '    <Divider orientation="left">Default Size</Divider>\n' +
      '    <List\n' +
      '      header={<div>Header</div>}\n' +
      '      footer={<div>Footer</div>}\n' +
      '      bordered\n' +
      '      dataSource={data}\n' +
      '      renderItem={(item) => (\n' +
      '      <% _.map(data.graphqlSchemaList,(item)=>{%>\n' +
      '        <List.Item>\n' +
      '          <Typography.Text mark><%=item.description%></Typography.Text>\n' +
      '        </List.Item>\n' +
      '      <%})%>\n' +
      '      )}\n' +
      '    />\n' +
      '  </>)'
  }
};
export default meta;
export type Story = StoryObj<Props>
export const Primary: Story = {
  args: {},
}

