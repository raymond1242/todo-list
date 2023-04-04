import { Layout, Row } from 'antd';
import List from '../TodoPage/index';
import './styles.scss';

const { Content } = Layout;

const Home: React.FC = () => {
    return (
        <Content className='w-screen bg-gray-50'>
            <Row className='my-8 p-10 bg-gray-300'>
                <p className='text-5xl'>
                    Welcome to the Todo App!
                </p>
            </Row>
            <List />
        </Content>
    );
};

export default Home;