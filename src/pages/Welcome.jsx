import React, { useState } from 'react';
import { SearchOutlined, PlusOutlined, FormOutlined, WarningOutlined, CheckOutlined } from '@ant-design/icons'
import { Input, Radio, Table, Button, message, Tag } from 'antd'
import styles from './Welcome.less'

export default () => {
  const [status, setStatus] = useState(null)
  const [searchText, setSearchText] = useState("")
  const [checked, setChecked] = useState(null)
  // const statusObj = {
  //    99:'失败',
  //    1: '测试中',
  //    10: '待测试',
  //    200: '成功',
  //    11: '不可用' 
  // }
  const tagObj = {
    99: <Tag icon={<WarningOutlined />} color="#f50">失败</Tag>,
    1: <Tag>测试中</Tag>,
    10: <Tag color="blue">待测试</Tag>,
    200: <Tag icon={<CheckOutlined />} color="green">成功</Tag>,
    11: <Tag color="#999">不可用</Tag>,
  }
  const options = [
    { label: '全部', value: null },
    { label: '测试中', value: 1 },
    { label: '待测试', value: 10 },
  ];
  const changeStatus = (e) => {
      setStatus(e.target.value)
  }

  const toSearch = (e) => {
    if(e.keyCode === 13) {
      if(e.target.value) {
          setSearchText(e.target.value)
          console.log(searchText)
          // message.success(e.target.value)
      }
      
    }
  }

  const toAdd = () => {
    message.success("执行新建操作")
  }

  const toEdit = () => {
    if(!checked) {
      message.warning("请选择要编辑的设备")
    }else {
      message.success("执行编辑操作")
    }
  }

  const columns = [
    {
      title: 'Name',
      render: (record) => {
        return (
          <>
          <div style={{fontWeight: 'bold'}}>{record.name}</div>
          <div className={styles.colName}>桩编码:  {record.code}</div>
          </>
        )
      },
    },
    {
      title: 'shop',
      dataIndex: 'shop',
      render: text => <span className={styles.colName}>所属厂家:  {text}</span>
    },
    {
      title: 'contact',
      dataIndex: 'contact',
      render: text => <span className={styles.colName}>负责人: {text}</span>
    },
    {
      title: 'createTime',
      dataIndex: 'createTime',
      render: text => <span className={styles.colName}>接入时间: {text}</span>
    },
    {
      title: 'status',
      dataIndex: 'status',
      render: text => tagObj[text]
    },
  ]

  const data = [
    {
      id: '1',
      name: 'xxxxxxxxxx桩设备001',
      code: "300F071OS11",
      shop: 'xxxxxxxxxx',
      contact: '张三',
      status: 1,
      createTime: '2020-02-25 16:32:45'
    },
    {
      id: '2',
      name: 'xxxxxxxxxx桩设备002',
      code: "300F071OS11",
      shop: 'xxxxxxxxxx',
      contact: '张三',
      status: 10,
      createTime: '2020-02-25 16:32:45'
    },
    {
      id: '3',
      name: 'xxxxxxxxxx桩设备003',
      code: "300F071OS11",
      shop: 'xxxxxxxxxx',
      contact: '张三',
      status: 99,
      createTime: '2020-02-25 16:32:45'
    },
    {
      id: '4',
      name: 'xxxxxxxxxx桩设备004',
      code: "300F071OS11",
      shop: 'xxxxxxxxxx',
      contact: '张三',
      status: 200,
      createTime: '2020-02-25 16:32:45'
    },
    {
      id: '5',
      name: 'xxxxxxxxxx桩设备005',
      code: "300F071OS11",
      shop: 'xxxxxxxxxx',
      contact: '张三',
      status: 11,
      createTime: '2020-02-25 16:32:45'
    }
  ]

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setChecked(selectedRows[0])
    },
  }

  return (
    <div className={styles.welcome}>
      <div className={styles.filter}>
         <div className={styles.input}>
          <Input placeholder="输入编号/名称搜索" prefix={<SearchOutlined />} onKeyDown={toSearch}/>
         </div>
         <div className={styles.changeStatus}>
         <Radio.Group
          options={options}
          onChange={changeStatus}
          value={status}
          optionType="button"
          buttonStyle="solid"
        />
         </div>
      </div>
      <div className={styles.line}></div>
      <div className={styles.options}>
       <Button type="primary" className={styles.add} icon={<PlusOutlined />} onClick={toAdd}>新建</Button>
       <Button type={checked ? "primary" : ""} icon={<FormOutlined />} onClick={toEdit}>编辑</Button>
      </div>
      <div className={styles.table}>
      <Table
          rowSelection={{
            type: 'radio',
            ...rowSelection,
          }}
          showHeader={false}
          columns={columns}
          dataSource={data}
          rowKey="id"
        />
      </div>
    </div>
  )
}
