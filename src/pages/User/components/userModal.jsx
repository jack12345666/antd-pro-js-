import React, { useEffect, useState } from 'react';
import { connect } from 'umi'
import { message } from 'antd';
import ProForm, { ModalForm, ProFormText, ProFormDigit } from '@ant-design/pro-form';
import { addUser, editUser, getInfoDetail } from '@/services/user'

const UserModal = (props) => {
    const { closeModal, data, refreshList } = props
    const [ userInfo, setUserInfo ] = useState(null)

    useEffect(() => {
        async function fetchData() {
            const rsp = await getInfoDetail(data.id)
            if(rsp.code === 200) {
                setUserInfo(rsp.data)
            }
        }
        if(data) {
          fetchData();  
        }
      }, []);
    
    const toSubmitModal = async (values) => {
            let rsp = null
            if(!data) {
                rsp = await addUser(values) 
            }else {
                const putData = values
                putData.id = data.id
                rsp = await editUser(putData)
            }
            if(rsp.code === 200) {
                message.success("操作成功")
                closeModal()
                refreshList()
            }else {
                message.error(rsp.msg)
            }
    }
   
    return (
      <ModalForm title={data ? "编辑用户信息" : "新增用户"} visible={true} onVisibleChange={closeModal} onFinish={(values) => toSubmitModal(values)}>
        <ProForm.Group>
          <ProFormText width="sm" name="userName" label="用户账号" rules={[{ required: true }]}  initialValue={data ? data.userName : ''} disabled={!!data}/>
          <ProFormText.Password width="sm" name="password" label="密码" rules={[{ required: true }]}  initialValue={data ? data.password : ''} />
          <ProFormText width="sm" name="fullName" label="用户名" initialValue={data ? data.fullName : ''}/>
        </ProForm.Group>
        <ProForm.Group>
              <ProFormDigit width="md" name="phone"  min={0}  label="手机号码" rules={[{ required: true }]} initialValue={data ? data.phone : ''} />
        <ProFormText width="sm" name="email" label="邮箱" rules={[{ required: true }]} initialValue={data ? data.email : ''}/>
        </ProForm.Group>
      </ModalForm>
    );
};

export default connect(({ user }) => ({ user }))(UserModal);
