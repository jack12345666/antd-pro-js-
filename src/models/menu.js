import { getUserMenuList } from '@/services/menu';
import { menuToTree } from '../utils/menuUtil'

const MenuModel = {
  namespace: 'menu',
  state: {
    menusData: [],
  },
  effects: {
    *fetchMeunList(_, {call, put}) {
        const rsp = yield call(getUserMenuList)
        if(rsp.code === 200) {
            const menuList = rsp.data.filter(item => item.kind !== "6")
            yield put({
                type: 'changeMenusData',
                payload: menuToTree(menuList)
            })
            return menuToTree(menuList)
        }
        return []
    }
  },
  reducers: {
    changeMenusData(state, { payload }) {
        return {
            ...state,
            menusData: payload
        }
    }
  }
}
export default MenuModel
