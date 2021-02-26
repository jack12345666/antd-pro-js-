import request from '@/utils/request';
import { getHeaders } from '@/utils/authority'
import { stringify } from 'qs'
import configs from '../../config/env' 

// 获取用户菜单列表
export async function getUserMenuList(params) {
//   return request(`${configs[process.env.API_ENV].API_SERVER}/system/menu/list?${stringify(params)}`, {
  return request(`/admin/system/menu/list?${stringify(params)}`, {
    method: 'get',
    headers: getHeaders(),
  });
}