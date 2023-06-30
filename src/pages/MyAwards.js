import React, {useEffect, useState} from 'react';
import { Col, Row } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import {getAwards} from "../api/config/awards";
const { Meta } = Card;
function MyAwards(props) {
    const [awards, setAwards] = useState([])
    useEffect(()=>{
        getAwards().then(res=>{
            console.log(res)
            setAwards(res.data)
        })
            .catch(err=>{
                console.log(err)
            })
    },[])
    return (
        <div>
            <Row gutter={16}>
                {
                    awards?.map(item=>(
                        <Col span={8}>
                            <Card
                                cover={
                                    <img
                                        alt="example"
                                        src={item.photo}
                                    />
                                }
                                actions={[
                                    <SettingOutlined key="setting" />,
                                    <EditOutlined key="edit" />,
                                    <EllipsisOutlined key="ellipsis" />,
                                ]}
                            >
                                <Meta
                                    title={`Tashkilot: ${item.company}`}
                                    description={`Mashg'ulot turi: ${item.type}`}
                                />
                            </Card>
                        </Col>
                    ))
                }
            </Row>
        </div>
    );
}

export default MyAwards;
