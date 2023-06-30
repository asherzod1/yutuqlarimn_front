import React, {useState} from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    GlobalOutlined,
    CarryOutOutlined,
    DownOutlined
} from '@ant-design/icons';
import {Layout, Menu, Button, theme, Dropdown, Space} from 'antd';
import {Outlet, useNavigate} from "react-router-dom";

const { Header, Sider, Content } = Layout;

const items = [
    {
        key: '1',
        icon: <GlobalOutlined />,
        label: 'Yangiliklar',
    },
    {
        key: '2',
        icon: <UploadOutlined />,
        label: 'Yutuqlarni joylash',
    },
    {
        key: '3',
        icon: <CarryOutOutlined />,
        label: 'Yutuqlarim',
    },
]

const dropdownItems = [
    {
        label: <a href="https://www.antgroup.com">1st menu item</a>,
        key: '0',
    },
    {
        label: <a href="https://www.aliyun.com">2nd menu item</a>,
        key: '1',
    },
    {
        type: 'divider',
    },
    {
        label: '3rd menu item',
        key: '3',
    },
];

function LayOut(props) {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const [current, setCurrent] = useState(['1'])
    const navigate = useNavigate()
    const menuChange=(e)=>{
        if(e.selectedKeys[0] === '1')
            navigate('/')
        else if (e.selectedKeys[0] === '2')
            navigate('/upload-awards')
        else if (e.selectedKeys[0] === '3')
            navigate('/my-awards')
        setCurrent(e.selectedKeys)
        console.log(e)
    }

    return (
        <Layout style={{minHeight:"100vh"}}>
            <Sider theme={"dark"} trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <div className="d-flex justify-content-center mt-4 mb-3">
                    <div style={{
                        width:'80%',
                        height:'80px',
                        background:"#ddd"
                    }}>
                    </div>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    selectedKeys={current}
                    onSelect={(e)=>menuChange(e)}
                    items={items}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >

                    <div className="d-flex justify-content-between">
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />
                        <div style={{fontWeight:"600"}}>
                            {items.find(item=>item.key === current[0]).label}
                        </div>
                        <div>
                            <div className="d-flex" style={{paddingRight:"30px"}}>
                                <div style={{marginRight:"20px"}}>Solixov Jamoliddin</div>
                                    <Dropdown
                                        menu={{
                                            items,
                                        }}
                                        trigger={['click']}
                                    >
                                        <a style={{color:"#333"}} onClick={(e) => e.preventDefault()}>
                                            <Space>
                                                <img src="/logo192.png" alt="" style={{width:"35px", height:"35px"}}/>
                                                <DownOutlined />
                                            </Space>
                                        </a>
                                    </Dropdown>
                            </div>
                        </div>
                    </div>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}

export default LayOut;
