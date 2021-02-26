import React, { useEffect, useState } from 'react';
import { DatePicker, Space, Popconfirm, message, Button } from 'antd';
import { connect } from 'umi'
import ProTable from '@ant-design/pro-table';
import { QueryFilter, ProFormText } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import EditModal from './editModal'
import style from './index.less'

const namespace = 'demo'
const { RangePicker } = DatePicker;

const Demo = (props) => {
    const { dispatch } = props
    const [modalVisit, setModalVisit] = useState(false)
    const [modalData, setModalData] = useState(null)
    const { demoList, searchConf, total } = props[namespace]
    const { dataLoading } = props

    useEffect(() => {
        dispatch({
            type: `${namespace}/fetchDemoList`
        })
    }, [])

    const toAdd = () => {
        setModalData(null)
        setModalVisit(true)
    }

    const toSearch = (values) => {
        searchConf.name = values.name
        searchConf.creater = values.creater
        dispatch({
            type: `${namespace}/changeSearchConf`,
            payload: searchConf
        })
        dispatch({
            type: `${namespace}/fetchDemoList`
        })
    }

    const moreDelete = (values, onCleanSelected) => {
        console.log(values)
        message.success("执行批量删除成功")
        onCleanSelected()
        dispatch({
            type: `${namespace}/fetchDemoList`
         })
    }

    const toEdit = (values) => {
        setModalData(values.props.text)
        setModalVisit(true)
    }

    const toDeleteItem = (data) => {
        console.log(data.props.text)
        message.success("删除成功")
        dispatch({
            type: `${namespace}/fetchDemoList`
         })
    }
    
    const changePageConfig = (page, pageSize) => {
        searchConf.page = page
        searchConf.pageSize = pageSize
        dispatch({
            type: `${namespace}/changeSearchConf`,
            payload: searchConf
        })
        dispatch({
           type: `${namespace}/fetchDemoList`
        })
    }


    const columns = [
        {
            title: '应用名称',
            width: 120,
            dataIndex: 'name',
            fixed: 'left',
            render: (_) => <a>{_}</a>,
        },
        {
            title: '容器数量',
            width: 120,
            dataIndex: 'containers',
            align: 'center',
            search: false,
            sorter: (a, b) => a.containers - b.containers,
        },
        {
            title: '调用次数',
            width: 120,
            align: 'center',
            dataIndex: 'callNumber',
        },
        {
            title: '创建者',
            width: 120,
            dataIndex: 'creator',
        },
        {
            title: '创建时间',
            width: 140,
            key: 'since',
            dataIndex: 'createdAt',
            valueType: 'date',
            sorter: (a, b) => a.createdAt - b.createdAt,
            renderFormItem: () => {
                return <RangePicker />;
            },
        },
        {
            title: '操作',
            width: 100,
            key: 'option',
            valueType: 'option',
            align: 'center',
            render: (record) => [<a key="link" onClick={() => toEdit(record)}>编辑</a>,
             // eslint-disable-next-line react/jsx-key
             <Popconfirm
                title="确定要删除该项"
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
            <div className={style.filter}>
                <QueryFilter onFinish={(values) => toSearch(values)}>
                    <ProFormText name="name"  label="应用名称" placeholder="请输入应用名称"/>
                    <ProFormText name="creater" label="创建者" placeholder="请输入创建者"/>
                </QueryFilter>
            </div>

            <ProTable style={{ padding: '10px' }} columns={columns} rowSelection={{
                // 注释该行则默认不显示下拉选项
               // selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
            }}
                tableAlertRender={({ selectedRowKeys, onCleanSelected }) => (<Space size={24}>
                    <span>
                        已选 {selectedRowKeys.length} 项
                <a style={{ marginLeft: 8 }} onClick={onCleanSelected}>
                            取消选择
                </a>
                    </span>
                </Space>)}
                tableAlertOptionRender={({ selectedRows, onCleanSelected }) => {
                    return (<Space size={16}>
                        <a onClick={() => moreDelete(selectedRows, onCleanSelected)}>批量删除</a>
                        <a onClick={() => {message.success("导出数据成功"); onCleanSelected()}}>导出数据</a>
                    </Space>);
                }}
                pagination={{ pageSize: searchConf.pageSize, current: searchConf.page, total, onChange: (page, pageSize) => changePageConfig(page, pageSize) }}
                dataSource={demoList}
                loading={dataLoading}
                options={false} search={false} rowKey="key" headerTitle=" " toolBarRender={() => [<Button key="show" type="primary" onClick={() => toAdd()}>创建应用</Button>]}/>
        </PageContainer>

       {modalVisit && <EditModal data={modalData} closeModal={setModalVisit} />} 
        </>
    );
};

export default connect(({ demo, loading }) => ({ demo, dataLoading: loading.effects[`${namespace}/fetchDemoList`] }))(Demo);