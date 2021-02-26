import { fetchDemoList } from '@/services/demo'

const namespace = 'demo'
export default {
    state: {
        demoList: [],
        searchConf: {
            page: 1, 
            pageSize: 10,
        },
        total: 15,
    },
    effects: {
        *fetchDemoList(_, {put, select, call}) {
            const searchConf = yield select(state => state[namespace].searchConf);
            // const rsp = yield call(fetchDemoList, searchConf)
            // console.log(rsp)
            const tableListDataSource = [];
            const creators = ['付小小', '曲丽丽', '林东东', '陈帅帅', '兼某某'];
            for (let i = 0; i < 16; i += 1) {
                tableListDataSource.push({
                    key: i+Math.floor(Math.random() * 9999),
                    name: `AppName ${i+1}`,
                    containers: Math.floor(Math.random() * 20),
                    callNumber: Math.floor(Math.random() * 2000),
                    creator: creators[Math.floor(Math.random() * creators.length)],
                    createdAt: Date.now() - Math.floor(Math.random() * 100000)
                });
            }
            yield put({
                type: 'changeDemoList',
                payload: {
                    list: tableListDataSource,
                    total: tableListDataSource.length
                }
            })
        }
    },
    reducers: {
        changeDemoList(state, { payload }) {
            return {
                ...state,
                demoList: payload.list,
                total: payload.total
            }
        },
        changeSearchConf(state, { payload }) {
            return {
                ...state,
                searchConf: payload
            }
        }
    }

}