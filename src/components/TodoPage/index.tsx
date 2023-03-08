import { useEffect, useState } from 'react';
import { Layout, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

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

const TodoColumns: ColumnsType<Todo> = [
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: 'Completed',
        dataIndex: 'completed',
        key: 'completed',
        render: (completed: boolean) => completed ? 'Yes' : 'No',
    },
];

const List: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        setTodos(INITIAL_STATE);
    }, []);

    return (
        <Content className='m-10 p-6'>
            <Table
                style={{ width: '600px' }}
                columns={TodoColumns}
                dataSource={todos}
                size="small"
                showHeader={false}
                pagination={{position: ['bottomLeft']}}
                expandable={{
                    expandedRowRender: (record: Todo) => (
                        <p style={{ marginLeft: 8 }}>{record.description}</p>
                    ),
                    rowExpandable: (record: Todo) => record.description !== '',
                }}
            />
        </Content>
    );
};

export default List;
