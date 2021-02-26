import request from '@/utils/request';
import {getHeaders} from '@/utils/authority'
import { stringify } from 'qs'
import configs from '../../config/env' 

// 获取用户列表
export async function getUserList(params) {
  return request(`${configs[process.env.API_ENV].API_SERVER}/system/user/list?${stringify(params)}`, {
  // return request(`/admin/system/user/list?${stringify(params)}`, {
    method: 'get',
    headers: getHeaders(),
  });
}

// 获取用户基本信息
export async function getInfo() {
  return request(`${configs[process.env.API_ENV].API_SERVER}/getInfo`, {
  // return request(`/admin/getInfo`, {
    method: 'get',
    headers: getHeaders(),
  });
}

// 获取路由列表
export async function getRouters() {
  return request(`${configs[process.env.API_ENV].API_SERVER}/getRouters`, {
  // return request(`admin/getRouters`, {
    method: 'get',
    headers: getHeaders(),
  });
}

// 获取个人详情
export async function getInfoDetail(id) {
  return request(`${configs[process.env.API_ENV].API_SERVER}/system/user/${id}`, {
  // return request(`/admin/system/user/${id}`, {
    method: 'get',
    headers: getHeaders(),
  });
}

// 改变用户状态
export async function changeUserStatus(data) {
  return request(`${configs[process.env.API_ENV].API_SERVER}/system/user/changeStatus`, {
  // return request(`/admin/system/user/changeStatus`, {
    method: 'put',
    headers: getHeaders(),
    data
  });
}

// 添加新用户
export async function addUser(data) {
  return request(`${configs[process.env.API_ENV].API_SERVER}/system/user`, {
  // return request(`/admin/system/user`, {
    method: 'post',
    headers: getHeaders(),
    data
  });
}

// 修改用户信息
export async function editUser(data) {
  return request(`${configs[process.env.API_ENV].API_SERVER}/system/user`, {
  // return request(`/admin/system/user`, {
    method: 'put',
    headers: getHeaders(),
    data
  });
}

// 删除用户
export async function deleteUser(id) {
  // return request(`${configs[process.env.API_ENV].API_SERVER}/system/user/${id}`, {
  return request(`/admin/system/user/${id}`, {
    method: 'delete',
    headers: getHeaders(),
  });
}


// // 获取用户列表
// export async function getUserList(params) {
//   // return request(`${configs[process.env.API_ENV].API_SERVER}/system/user/list?${stringify(params)}`, {
//   return request(`/admin/system/user/list?${stringify(params)}`, {
//     method: 'get',
//     headers: getHeaders(),
//   });
// }

// // 获取用户基本信息
// export async function getInfo() {
//   // return request(`${configs[process.env.API_ENV].API_SERVER}/getInfo`, {
//   return request(`/admin/getInfo`, {
//     method: 'get',
//     headers: getHeaders(),
//   });
// }

// // 获取路由列表
// export async function getRouters() {
//   // return request(`${configs[process.env.API_ENV].API_SERVER}/getRouters`, {
//   return request(`admin/getRouters`, {
//     method: 'get',
//     headers: getHeaders(),
//   });
// }

// // 获取个人详情
// export async function getInfoDetail(id) {
//   // return request(`${configs[process.env.API_ENV].API_SERVER}/system/user/${id}`, {
//   return request(`/admin/system/user/${id}`, {
//     method: 'get',
//     headers: getHeaders(),
//   });
// }

// // 改变用户状态
// export async function changeUserStatus(data) {
//   // return request(`${configs[process.env.API_ENV].API_SERVER}/system/user/changeStatus`, {
//   return request(`/admin/system/user/changeStatus`, {
//     method: 'put',
//     headers: getHeaders(),
//     data
//   });
// }

// // 添加新用户
// export async function addUser(data) {
//   // return request(`${configs[process.env.API_ENV].API_SERVER}/system/user`, {
//   return request(`/admin/system/user`, {
//     method: 'post',
//     headers: getHeaders(),
//     data
//   });
// }

// // 修改用户信息
// export async function editUser(data) {
//   // return request(`${configs[process.env.API_ENV].API_SERVER}/system/user`, {
//   return request(`/admin/system/user`, {
//     method: 'put',
//     headers: getHeaders(),
//     data
//   });
// }

// // 删除用户
// export async function deleteUser(id) {
//   return request(`${configs[process.env.API_ENV].API_SERVER}/system/user/${id}`, {
//   // return request(`/admin/system/user/${id}`, {
//     method: 'delete',
//     headers: getHeaders(),
//   });
// }
