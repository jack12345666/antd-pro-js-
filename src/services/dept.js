import request from '@/utils/request';
import {getHeaders} from '@/utils/authority'

// 获取部门treeData
export async function fetchDeptTree(params) {
  return request('/admin/system/dept/treeselect', {
    method: 'GET',
    data: params,
    headers: getHeaders(),
  });
}
