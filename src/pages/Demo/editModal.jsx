import React from 'react';
import { connect } from 'umi'
import { message } from 'antd';
import ProForm, { ModalForm, ProFormText, ProFormDigit } from '@ant-design/pro-form';

// const namespace = 'demo'

const EditModal = (props) => {
    const { closeModal, data } = props
    
    const toSubmitModal = () => {
        message.success("操作成功")
        closeModal()
    }
   
    return (
      <ModalForm title={data ? "编辑应用" : "创建应用"} visible={true} onVisibleChange={closeModal} onFinish={() => toSubmitModal()}>
        <ProForm.Group>
          <ProFormText width="md" name="name" label="应用名称" rules={[{ required: true }]} tooltip="应用名称" initialValue={data ? data.name : ''} placeholder="请输入应用名称"/>
          <ProFormText width="md" name="creator" label="创建者" rules={[{ required: true }]} initialValue={data ? data.creator : ''} placeholder="请输入创建者"/>
        </ProForm.Group>
        <ProForm.Group>
          <ProFormDigit width="md" name="containers"  min={0}  label="容器数量" rules={[{ required: true }]} initialValue={data ? data.containers : ''} placeholder="请输入容器数量"/>
          <ProFormDigit width="md" name="callNumber"  min={0}  label="调用次数" rules={[{ required: true }]} initialValue={data ? data.callNumber : ''} placeholder="请输入调用次数"/>
        </ProForm.Group>
      </ModalForm>
    );
};

export default connect(({ demo }) => ({ demo }))(EditModal);
