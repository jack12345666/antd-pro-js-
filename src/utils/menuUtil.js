import { FundOutlined, SettingOutlined } from '@ant-design/icons'

export function menuToTree(data) {
  const cloneData = []
  data.forEach((item, index) => {
    cloneData.push({
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
   // 循环所有项 
  const tree = cloneData.filter(father => {            
    const branchArr = cloneData.filter((child)=>{
      return father.id === child.parentId      // 返回每一项的子级数组
    });
     if(branchArr.length > 0){
       // eslint-disable-next-line no-param-reassign
       father.routes = branchArr;    // 如果存在子级，则给父级添加一个routes属性，并赋值
     }
     return father.parentId === "0"; // 返回第一层
  });
  return tree     // 返回树形数据
}