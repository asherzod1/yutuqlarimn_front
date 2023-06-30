import React, {useState} from 'react';
import {Button, Checkbox, Form, Input, message} from 'antd';
import axios from "axios";
import {BASE_URL, TOKEN_ACCESS} from "../api/host";
import {useNavigate} from "react-router-dom";

function Login(props) {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const onFinish = (values) => {
        setLoading(true)
        axios.post(`${BASE_URL}/api/login/`, values).then(res=>{
            localStorage.setItem(TOKEN_ACCESS, res.data.access)
            message.success('Muvafaqiyatli login qildingiz')
            navigate('/')
            setLoading(false)
        })
            .catch(err=>{
                message.error("Ma'lumotlarni tekshirib qayta urinib ko'ring")
                setLoading(false)
            })
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        message.error("Ma'lumotlarni kiriting")
    };
    return (
        <div className="d-flex">
            <div style={{width:"50%"}} className="d-flex align-items-center">
                <img style={{width:'100%', height:'100%'}} src="/real-logo.png" alt=""/>
            </div>

            <div className="d-flex justify-content-center align-items-center flex-column" style={{height:"100vh", width:'50%'}}>
                <Form
                    name="basic"
                    labelCol={{
                        span: 24,
                    }}
                    wrapperCol={{
                        span: 24,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            // offset: 8,
                            span: 24,
                        }}
                    >
                        <Button loading={loading} type="primary" htmlType="submit" style={{width:"100%"}}>
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default Login;
