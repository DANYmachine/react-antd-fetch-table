import {Table, Space, Dropdown, Button} from 'antd';
import { DownloadOutlined, EditOutlined, DeleteOutlined, DownOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';

function App() {
  const [columns, setColumns] = useState([]);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    fetch('') //МЕСТО ДЛЯ ВАШЕГО API
    .then(res => res.json())
    .then((result) => {
      const list = result.quotes || []
      const firstObject = list[0] || {}
      const cols = []
      for(const key in firstObject){
        var render = (value) => {
          return <span>{String(value)}</span>;
        }

        if(typeof firstObject[key] === 'file'){
          render = (value) => {
            return <Space size="middle">
              <Button type="primary" shape="round" icon={<DownloadOutlined />} />
            </Space>;
          }
        } else if(typeof firstObject[key] === 'file'){
          const items = [
            {
              label: 'Update',
              key: '1',
              icon: <EditOutlined />,
            },
            {
              label: 'Delete',
              key: '2',
              icon: <DeleteOutlined />,
              danger: true,
            },
          ];

          const handleMenuClick = (e) => {
            console.log('click', e);
          };
          
          const menuProps = {
            items,
            onClick: handleMenuClick,
          };

          render = (value) => {
            return <Space size="middle">
              <Dropdown menu={menuProps}>
                <Button>
                  <Space>
                    Actions
                    <DownOutlined />
                  </Space>
                </Button>
              </Dropdown>
            </Space>;
          }
        }
        
        const col = {
          title: key,
          dataIndex: key,
          render: render,
        }
        cols.push(col);
      }
      setColumns(cols);
      setDataSource(result.quotes);
    });
  }, []);
  
  return (
    <div>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
}

export default App;
