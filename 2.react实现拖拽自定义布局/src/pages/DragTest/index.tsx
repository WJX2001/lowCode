import { Breadcrumb, Card } from 'antd';
import DragContainer from './components/DragContainer';

const App = () => {
  return (
    <div style={{ padding: 24 }}>
      <Breadcrumb style={{ marginBottom: 24 }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="">Application Center</a>
        </Breadcrumb.Item>
      </Breadcrumb>

      <DragContainer
        contentList={[
          <Card key={'aaa'}>111</Card>,
          <Card key={'bbb'}>222</Card>,
          <Card key={'cccc'}>333</Card>,
        ]}
      />
    </div>
  );
};

export default App;
