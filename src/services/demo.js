import request from '@/utils/request';

export async function fetchDemoList(params) {
  return request('/api/demo/list', {
    method: 'POST',
    data: params,
  });
}
