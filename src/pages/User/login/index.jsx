import {
  LockOutlined,
  UserOutlined,
  SafetyOutlined
} from '@ant-design/icons';
import JSEncrypt from 'jsencrypt/bin/jsencrypt';
import React, { useEffect, useState } from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { connect } from 'umi';
import { getcaptchaImage } from '@/services/login';
import styles from './index.less';
import { message } from 'antd';

const Login = (props) => {
  const { submitting } = props;
  const [uuid, setUuid] = useState("");
  const [codeImg, setCodeImg] = useState("")
  const publicKey = 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBALIKnrHDqTztvwyqebyb/irChZ4xcSdyCkweuMC/4bSVEIcEU2FO3fsvdRG4LZc8tTUN/aQHSQYXAiq5p61jTlkCAwEAAQ==';
  

  const fetchCodeImg = async () => {
    const rsp = await getcaptchaImage()
    if(rsp.code === 200) {
      setCodeImg(`data:image/png;base64,${rsp.img}`);
      setUuid(rsp.uuid);
    }
  }

  useEffect(() => {
    fetchCodeImg()
  }, [])

  const handleSubmit = values => {
    const { dispatch } = props;
    const data = values
    const encryptor = new JSEncrypt();
    encryptor.setPublicKey(publicKey);
    const password = encryptor.encrypt(values.password);
    data.password = password
    data.uuid = uuid
   
    dispatch({
      type: 'login/login',
      payload: data,
    }).then(rsp => {
      if(rsp.code !== 200) {
        message.error(rsp.msg)
        fetchCodeImg()
      }
    })
  };

  return (
    <div className={styles.main}>
      <ProForm
        initialValues={{
          autoLogin: true,
        }}
         // 配置按钮文本
        submitter={{
          searchConfig: {
            submitText: '登录',
          },
          render: (_, dom) => dom.pop(),
          submitButtonProps: {
            loading: submitting,
            size: 'large',
            style: {
              width: '100%',
            },
          },
        }}
        onFinish={(values) => {
          handleSubmit(values);
        }}
      >

         <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder="请输入用户名"
              rules={[
                {
                  required: true,
                  message: "请输入用户名!",
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              placeholder="请输入密码"
              rules={[
                {
                  required: true,
                  message:"请输入密码！"
                },
              ]}
            />
            <div style={{display: 'flex'}}>
              <ProFormText
               name="code"
               placeholder="请输入验证信息"
               fieldProps={{
                size: 'large',
                prefix: <SafetyOutlined  className={styles.prefixIcon} />,
              }}
               rules={[
                {
                  required: true,
                  message:"请输入验证信息！"
                },
              ]}
              ></ProFormText>
               <div className="img">
                 <img title="点击刷新" style={{height: '40px', cursor: 'pointer', marginLeft: '5px'}} src={codeImg} onClick={() => fetchCodeImg()}/>
               </div>
            </div>

      </ProForm>
    </div>
  );
};

export default connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
