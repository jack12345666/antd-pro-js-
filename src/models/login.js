import { stringify } from 'querystring';
import { history } from 'umi';
import { fakeAccountLogin } from '@/services/login';
import { getPageQuery } from '@/utils/utils';
import { message } from 'antd';

const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    *login({ payload }, { call }) {
      const rsp = yield call(fakeAccountLogin, payload);
      if (rsp.code === 200 && rsp.token) {
        const user = {token: rsp.token}
        localStorage.setItem("user", JSON.stringify(user));

        // Login successfully
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        message.success('登录成功');
        let {redirect} = params ;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }
        history.replace(redirect || '/');
      }
      return rsp;
    },

    logout() {
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note
      localStorage.removeItem("user");
      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },
  reducers: {
    
  },
};
export default Model;
