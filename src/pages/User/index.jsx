import React, { useState, useEffect } from 'react'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { connect } from 'umi'
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { QueryFilter, ProFormText, ProFormDateRangePicker } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import { changeUserStatus, deleteUser } from '@/services/user'
import { Space, Button, Switch, Modal, message, Popconfirm } from 'antd';
import UserModal from './components/userModal'
import styles from './index.less'


const namespace = 'user'
const { confirm } = Modal;
const UserSetting = (props) => {
    const { dispatch, dataLoading } = props
    const { userList, userTotal, userSearchConf } = props[namespace]
    const [showModal, setShowModal] = useState(false)
    const [modalData, setModalData] = useState(null)

    const fetchUserList = () => {
        dispatch({
            type: `${namespace}/fetchUserList`
        })
    }

    useEffect(() => {
        fetchUserList()
    }, [])

    const toSearch = values => {
        const { userName, phone, email, date } = values
        const beginTime = date && date.length > 0 ? date[0] : ''
        const endTime = date && date.length > 0 ? date[1] : ''
        userSearchConf.userName = userName
        userSearchConf.phone = phone
        userSearchConf.email = email
        userSearchConf.pageNum = 1
        userSearchConf.page = 1
        userSearchConf.beginTime = beginTime
        userSearchConf.endTime = endTime
        dispatch({
            type: `${namespace}/changeSearchConf`,
            payload: userSearchConf
        })
        fetchUserList()
    }

    const onReset = () => {
        userSearchConf.userName = ''
        userSearchConf.phone = ''
        userSearchConf.email = ''
        userSearchConf.pageNum = 1
        userSearchConf.beginTime = ''
        userSearchConf.endTime = ''
        dispatch({
            type: `${namespace}/changeSearchConf`,
            payload: userSearchConf
        })
        fetchUserList()
    }

    const onChangeStatus = (record) => {
         const item = record.props.text
            confirm({
                title: `确定${item.enabled === '0' ? '禁用' : '启用'}${item.fullName}账号?`,
                icon: <ExclamationCircleOutlined />,
                onOk: async () => {
                  const data = {
                      id: item.id,
                      enabled: item.enabled === "0" ? "1" : "0"
                  }
                  const rsp = await changeUserStatus(data)
                  if(rsp.code === 200) {
                       message.success("操作成功") 
                       fetchUserList()
                  }else {
                      message.error(rsp.msg)
                  }
                },
              });
    }

    const toEditItem = record => {
        setModalData(record.props.text)
        setShowModal(true)
    }

    const toDeleteItem = async (record) => {
        const rsp = await deleteUser(record.props.text.id)
        if(rsp.code === 200) {
            message.success("删除成功")
            fetchUserList()
        }else {
            message.error(rsp.msg)
        }
    }

    const moreDelete = data => {
        console.log(data)
    }

    const toAdd = () => {
        setModalData(null)
        setShowModal(true)
    }

    const changePageConfig = (page, pageSize) => {
        userSearchConf.pageNum = page
        userSearchConf.pageSize = pageSize
        dispatch({
            type: `${namespace}/changeUserConf`,
            payload: userSearchConf
        })
        fetchUserList()
    }

    const columns = [
        {
            title: '用户账号',
            width: 100,
            dataIndex: 'userName',
            ellipsis: true,
            align: 'center'
        },
        {
            title: '用户名',
            width: 120,
            dataIndex: 'fullName',
            ellipsis: true,
            align: 'center'
        },
        {
            title: '手机号码',
            width: 120,
            align: 'center',
            dataIndex: 'phone',
        },
        {
            title: '邮箱',
            width: 120,
            ellipsis: true,
            align: 'center',
            dataIndex: 'email',
        },
        {
            title: '创建时间',
            width: 140,
            ellipsis: true,
            align: 'center',
            dataIndex: 'createTime',
        },
        {
            title: '状态',
            width: 80,
            valueType: 'option',
            align: 'center',
            render: (record) => {
                return <Switch checked={record.props.text.enabled === '0' } onChange={() => onChangeStatus(record)} />
            }
        },
        {
            title: '操作',
            width: 120,
            valueType: 'option',
            align: 'center',
            render: (record) => [
                <a key="link" onClick={() => toEditItem(record)}>编辑</a>,
                 // eslint-disable-next-line react/jsx-key
             <Popconfirm
                title={`确定删除${record.props.text.fullName}用户?`}
                onConfirm={() => toDeleteItem(record)}
                okText="确定"
                cancelText="取消"
            >
            <a key="link">删除</a>
            </Popconfirm>
            ],
        },
    ]

    return (
        <>
        <PageContainer>
                <ProCard>
                    <div className={styles.userList}>
                        <div className={styles.searchBox}>
                            <QueryFilter span={8} defaultCollapsed={true} onReset={onReset} onFinish={(values) => toSearch(values)}>
                                <ProFormText name="userName" label="用户账号" />
                                <ProFormText name="phone" label="手机号码" />
                                <ProFormText name="email" label="邮箱" />
                                <ProFormDateRangePicker name="date" label="创建时间" />
                            </QueryFilter>
                        </div>
                        <div className={styles.table}>
                            <ProTable style={{ padding: '10px' }} columns={columns} 
                            rowSelection={{
                                // selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
                            }}
                                tableAlertRender={({ selectedRowKeys, onCleanSelected  }) => (<Space size={24}>
                                    <span>
                                        已选 {selectedRowKeys.length} 项
                                        <a style={{ marginLeft: 8 }} onClick={onCleanSelected}>取消选择</a>
                                    </span>
                                </Space>)}
                                tableAlertOptionRender={({ selectedRows, onCleanSelected }) => {
                                    return (<Space size={16}>
                                        <a onClick={() => moreDelete(selectedRows, onCleanSelected)}>批量删除</a>
                                    </Space>);
                                }}
                                pagination={{ pageSize: userSearchConf.pageSize, current: userSearchConf.pageNum, total: userTotal, onChange: (page, pageSize) => changePageConfig(page, pageSize) }}
                                dataSource={userList}
                                loading={dataLoading}
                                options={false} search={false} rowKey="id"  headerTitle=" " toolBarRender={() => [<Button key="show" type="primary" onClick={() => toAdd()}>新增用户</Button>]} />
                        </div>
                    </div>
                </ProCard>
        </PageContainer>
        
       {showModal && <UserModal closeModal={setShowModal} refreshList={fetchUserList} data={modalData}/>} 
        </> 
    )
}

export default connect(({ user, loading }) => ({ user, dataLoading: loading.effects[`${namespace}/fetchUserList`] }))(UserSetting);