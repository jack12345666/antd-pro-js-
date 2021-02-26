// 获取用户token
export const getToken = () => {
  const sUser = localStorage.getItem("user");
  return sUser ? `Bearer ${JSON.parse(sUser).token}` : "";
}
// 获取header
export const getHeaders = () => {
  const sUser = localStorage.getItem("user");
  return {"Authorization": `Bearer ${JSON.parse(sUser).token}`};
}
// 获取用户名
export const getUserName = () => {
  const sUser = sessionStorage.getItem("user");
  return sUser ? JSON.parse(sUser).user.userName : "";
}

// 获取用户中文名
export const getUserNameCn = () => {
  const sUser = sessionStorage.getItem("user");
  return sUser ? JSON.parse(sUser).user.fullName : "";
}
// 获取项目信息
export const getPostsList = () => {
  const sUser = sessionStorage.getItem("user");
  const posts = sUser ? JSON.parse(sUser).posts : {};
  return posts;
}
