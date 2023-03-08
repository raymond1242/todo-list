import { Layout, Row } from 'antd';
import List from '../TodoPage/index';
import './styles.scss';

const { Content } = Layout;

const Home: React.FC = () => {
    return (
        <Layout className='background w-screen h-full'>
            <Content>
                <Row className='m-8 p-4'>
                    <p className=' text-4xl'>
                        Welcome to the Todo App!
                    </p>
                </Row>
                <List />
            </Content>
        </Layout>
    );
};

export default Home;