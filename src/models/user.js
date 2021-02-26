import { getInfo, getRouters, getUserList } from '@/services/user';

const namespace = 'user'
const UserModel = {
  state: {
    currentUser: {},
    menuData: [],
    userSearchConf: {
      pageNum: 1,
      pageSize: 10,
      userName: '',
      phone: '',
      email: '',
      beginTime: '',
      endTime: ''
    },
    userList: [],
    userTotal: 0,
  },
  effects: {
    *fetchUserList(_, {call, put, select}) {
      const searchConf = yield select(state => state[namespace].userSearchConf);
      const rsp = yield call(getUserList, searchConf)
      if(rsp.code === 200) {
          yield put({
            type: 'changeUserList',
            payload: {
              userList: rsp.rows,
              userTotal: rsp.total
            }
          })
       }
    },
    *fetchCurrent(_, { call, put }) {
      const rsp = yield call(getInfo);
      const userResources = yield call(getRouters);
      if(rsp.code === 200) {
        yield put({
          type: 'saveState',
          payload: {
            currentUser: rsp.user
          }
        })
      }
      if (userResources.code === 200) {
        yield put({
          type: 'saveState',
          payload: {
            menuData: userResources.data
          }
        })
      }
    }
  },
  reducers: {
    saveState(state, { payload }) {
      return { ...state, ...payload };
    },
    changeUserConf(state, { payload }) {
      return {...state, userSearchConf: payload}
    },
    changeUserList(state, { payload }) {
      return { 
        ...state, 
        userList: payload.userList,
        userTotal: payload.usertotal
      }
    }
  }
}
export default UserModel
