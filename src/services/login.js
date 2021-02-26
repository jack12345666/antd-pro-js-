import request from '@/utils/request';
import configs from '../../config/env'

export async function fakeAccountLogin(params) {
  return request(`${configs[process.env.API_ENV].API_SERVER}/login`, {
 // return request(`/admin/login`, {
    method: 'POST',
    data: params,
  });
}

// 获取验证码
export async function getcaptchaImage() {
  return request(`${configs[process.env.API_ENV].API_SERVER}/captchaImage`, {
//  return request(`/admin/captchaImage`, {
    method: 'get',
    headers: {
      token: "invalid-token", // 接口不需要传token，传"invalid-token"配合拦截器删除掉token字段
    }
  })
}


// export async function fakeAccountLogin(params) {
//     // return request(`${configs[process.env.API_ENV].API_SERVER}/login`, {
//     return request(`/admin/login`, {
//       method: 'POST',
//       data: params,
//     });
//   }
  
//   // 获取验证码
//   export async function getcaptchaImage() {
//     // return request(`${configs[process.env.API_ENV].API_SERVER}/captchaImage`, {
//     return request(`/admin/captchaImage`, {
//       method: 'get',
//       headers: {
//         token: "invalid-token", // 接口不需要传token，传"invalid-token"配合拦截器删除掉token字段
//       }
//     })
//   }
  