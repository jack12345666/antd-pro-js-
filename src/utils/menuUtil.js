 import { FundOutlined, SettingOutlined } from '@ant-design/icons'
 
//  export function menuToTree(list){
//   const treeData = [];
//   const map = {};
//   const formatData = []
//   list.forEach((item, index) => {
//     formatData.push({
//       id: item.id,
//       name: item.nameCN,
//       parentId: item.parentId,
//       nameCN: item.nameCN,
//       path: item.url || `/${index}`,
//       icon:  item.nameCN === "系统管理" ? <SettingOutlined /> : <FundOutlined />,
//       routes: item.children,
//       target: item.target
//     })
//   })
//   formatData.forEach(item => {
//       map[item.id] = item;
//   })
//   formatData.forEach(item => {
//       const parent = map[item.parentId];
//       if (parent && item.parentId !== "0") {
//           (parent.routes || ( parent.routes = [] )).push(item);
//       } else {
//           treeData.push(item);
//       }
//   })
//   return treeData;
// }

 function addChildMenu(item, list) {
    const childrenList = []
    list.forEach(childItem => {
      if(childItem.parentId === item.id) {
        childrenList.push(childItem)
        addChildMenu(childItem, list)
      }
    })
    return childrenList  
}

export function menuToTree(list) {
  const formatData = []
  const menuList = []
  list.forEach((item, index) => {
    formatData.push({
      id: item.id,
      name: item.nameCN,
      parentId: item.parentId,
      nameCN: item.nameCN,
      path: item.url || `/${index}`,
      icon:  item.nameCN === "系统管理" ? <SettingOutlined /> : <FundOutlined />,
      routes: [],
      target: item.target
    })
  })
  formatData.forEach(item => {
    if(item.parentId === '0') {
      menuList.push({
          id: item.id,
          name: item.name,
          path: item.path,
          parentId: item.parentId,
          nameCN: item.nameCN,   
          target: item.target,
          icon:  item.icon,
          routes: addChildMenu(item, formatData)
        })
    }
  })
  return menuList
}

