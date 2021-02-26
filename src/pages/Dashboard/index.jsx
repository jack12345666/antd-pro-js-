import React from 'react' 
import { Row, Col, Card } from 'antd'
import styles from './index.less'

export default () => {
    return (
        <div className={styles.box}>
            <Row gutter={10}>
                <Col span="6">
                    <Card>接入设备</Card>
                </Col>
                <Col span="6">
                    <Card>设备型号</Card>
                </Col>
                <Col span="6">
                    <Card>接口调试</Card>
                </Col>
                <Col span="6">
                    <Card>型号试验</Card>
                </Col>
            </Row>
        </div>
    )
}