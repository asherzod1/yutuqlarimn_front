import React, {useState} from 'react';
import {Form, Input, Upload, Button} from "antd";
import { PlusOutlined } from '@ant-design/icons';
import axios from "axios";
import {BASE_URL, TOKEN_ACCESS} from "../api/host";

function UploadAward(props) {

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };
    const [formData, setFormData] = useState({
        company: '',
        type: '',
        photo: null,
    });

    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);

    const onFinish = async (values) => {
        const token = localStorage.getItem(TOKEN_ACCESS); // Replace with the actual JWT token

        const formData = new FormData();
        formData.append('company', values.company);
        formData.append('type', values.type);
        fileList.forEach((file) => {
            formData.append('photo', file.originFileObj);
        });

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            const response = await axios.post(`${BASE_URL}/api/award/`, formData, config);
            console.log('Award created:', response.data);
            // Handle any success or redirect logic here
        } catch (error) {
            console.error('Error creating award:', error.response.data);
            // Handle any error logic here
        }
    };

    const onUploadChange = ({ fileList }) => {
        setFileList(fileList);
    };
    return (
        <div>
            <Form
                labelCol={{
                    span: 24,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                style={{
                    maxWidth: '100%',
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    label="O'tkazuvchi tashkilot"
                    name={"company"}
                >
                    <Input placeholder={"Tashkilotni kiriting"}/>
                </Form.Item>
                <Form.Item
                    label="Mashg'ulot turi"
                    name={'type'}
                >
                    <Input placeholder={"Mashg'ulotni kiriting"}/>
                </Form.Item>
                <Form.Item label="" valuePropName="fileList" getValueFromEvent={normFile}>
                    <Upload
                        name="photo"
                        fileList={fileList}
                        onChange={onUploadChange}
                        beforeUpload={() => false}
                    >
                        <div >
                            <div className="d-flex justify-content-center">
                                <PlusOutlined />

                            </div>
                            <div
                                style={{
                                    marginTop: 8,
                                }}
                            >
                                Rasmini yuklash
                            </div>
                        </div>
                    </Upload>
                </Form.Item>
                <Button type={'primary'} htmlType={'submit'}>
                    Yuklash
                </Button>
            </Form>
        </div>
    );
}

export default UploadAward;
