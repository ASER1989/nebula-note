import {Meta, StoryObj} from '@storybook/react';
import CodeEditor, {Props} from './index';

const meta: Meta<Props> = {
  title: 'Components/CodeEditor',
  component: CodeEditor,
  argTypes: {
    lang:{
      type:'string',
      table:{
        type:{
          summary:"jsx | json | tsx | javascript | markdown | typescript | html | yaml"
        }
      }
    },
    onChange: {
      type:'function',
      table:{
        subcategory:'Events',
        disable:false,
        type: {
          summary:'(value:string,viewUpdate:ViewUpdate) => void '
        }
      }
    },
    onSave:{
      type:'function',
      description:'Trigger this event by pressing the ctrl and s keys',
      table:{
        subcategory:'Events',
        type:{
          summary:"() => void",
        }
      }
    },
    onLangChange:{
      type:'function',
      description:'Trigger this event when the language changes',
      table:{
        subcategory:'Events',
        type:{
          summary:"(lang:string) => void",
        }
      }
    },
    editable:{
      type:'boolean',
      description:'Whether the editor is editable',
      table:{
        type:{
          summary:"boolean"
        }
      }
    }
  },

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

