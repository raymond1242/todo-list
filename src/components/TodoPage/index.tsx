import React, { useEffect, useState } from 'react';
import { Layout, Table, Button, Form, Input } from 'antd';
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { FormInstance } from 'antd/es/form';

const { Content } = Layout;

const INITIAL_STATE = [
    {
        key: 1,
        title: 'Todo 1',
        description: 'Todo 1 description',
        completed: false,
    },
    {
        key: 2,
        title: 'Todo 2',
        description: 'Todo 2 description',
        completed: false,
    },
    {
        key: 3,
        title: 'Todo 3',
        description: '',
        completed: false,
    },
    {
        key: 4,
        title: 'Todo 4',
        description: 'Todo 4 description',
        completed: false,
    },
];

interface Todo {
    key: React.Key;
    title: string;
    description: string;
    completed: boolean;
}

const CompletedColumns: ColumnsType<Todo> = [
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
    },
];

const List: React.FC = () => {
    const [count, setCount] = useState(5);
    const [todo, setTodo] = useState<Todo[]>([]);
    const [completed, setCompleted] = useState<Todo[]>([]);
    const formRef = React.useRef<FormInstance>(null);

    useEffect(() => {
        setTodo(INITIAL_STATE);
    }, []);

    const TodoColumns: ColumnsType<Todo> = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Setting',
            render: (todo: Todo) => (
                <div className='flex mr-4 gap-2 float-right'>
                    <Button
                        className='border-0'
                        icon={<EditTwoTone twoToneColor='blue' />}
                    ></Button>
                    <Button
                        className='border-0'
                        onClick={() => {
                            deleteTodo(todo.key);
                        }}
                        icon={<DeleteTwoTone twoToneColor='red' />}
                    ></Button>
                </div>
            )
        }
    ];

    const deleteTodo = (key: React.Key) => {
        const newTodo = todo.filter((item) => item.key !== key);
        setTodo(newTodo);
    };

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: Todo[]) => {
            const newTodo = todo.filter((item) => !selectedRows.includes(item));
            setTodo(newTodo);
            setCompleted([...completed, ...selectedRows]);
        },
    };

    const expandable = {
        expandedRowRender: (record: Todo) => (
            <p style={{ marginLeft: 8 }}>{record.description}</p>
        ),
        rowExpandable: (record: Todo) => record.description !== '',
    }

    const onFinish = (values: {title: string, description: string}) => {
        const newTodo = {
            key: count,
            title: values.title,
            description: values.description,
            completed: false,
        };
        setTodo([...todo, newTodo]);
        setCount(count + 1);
        formRef.current?.resetFields();
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };

    return (
        <Content className='m-10 p-6 grid lg:grid-cols-2 grid-cols-1'>
            <div className='p-2 border-2 border-gray-400 rounded-2xl w-fit m-auto'>
                <Form
                    name='todo'
                    ref={formRef}
                    className='mx-auto px-6 pt-4'
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    style={{ minWidth: '450px', maxWidth: '600px' }}
                >
                    <Form.Item
                        label='Todo Title'
                        name='title'
                        rules={[{ required: true, message: 'Please input your todo!' }]}
                    >
                        <Input placeholder='Title' />
                    </Form.Item>
                    <Form.Item
                        label='Description'
                        name='description'
                        rules={[{ required: false }]}
                    >
                        <Input.TextArea rows={2} />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType='submit'>Submit</Button>
                    </Form.Item>
                </Form>
            </div>
            <div>
                <h1 className='text-2xl my-4'>Todo Tasks</h1>
                <Table
                    style={{ width: '650px', margin: 'auto' }}
                    columns={TodoColumns}
                    dataSource={todo}
                    size="small"
                    showHeader={false}
                    pagination={{position: ['bottomLeft']}}
                    rowSelection={{...rowSelection}}
                    expandable={expandable}
                    locale={{emptyText: 'No todo tasks yet!'}}
                />
                <h1 className='text-2xl my-4'>Completed Tasks</h1>
                <Table
                    style={{ width: '600px', margin: 'auto' }}
                    size='small'
                    columns={CompletedColumns}
                    dataSource={completed}
                    showHeader={false}
                    pagination={{position: ['bottomLeft']}}
                    expandable={expandable}
                    locale={{emptyText: 'No completed tasks yet!'}}
                />
            </div>
        </Content>
    );
};

export default List;
