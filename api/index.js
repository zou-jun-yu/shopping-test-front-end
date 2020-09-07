import ajax from "./ajax";

//请求接口函数
//用户相关
export const reqLogin = ({ username, password }) =>
  ajax("/api2/users/login", { username, password }, "POST");

export const reqRegister = ({ username, password, email, verify }) =>
  ajax("/api2/users/register", { username, password, email, verify }, "POST");

export const reqLogout = () => ajax("/api2/users/logout");

export const reqGetUser = () => ajax("/api2/users/getUser");

export const reqGetVerify = email => ajax("/api2/users/verify", { email });

export const reqFindPassword = ({ password, email, verify }) =>
  ajax("/api2/users/findPassword", { password, email, verify }, "POST");

//商品分类
export const reqGetCategoriesLv1 = ({ url }) => ajax(url, { parentId: 0 });
export const reqGetCategoryById = ({ url, _id }) => ajax(url, { _id });
export const reqGetRandomLv3Categories = ({ url, categoryNumber }) =>
  ajax(url, { categoryNumber });

export const reqGetCategoriesLv2Andlv3 = ({ url, parentId }) =>
  ajax(url, { parentId });

//商品
export const reqGetRandomGoods = ({ url, goodsNumber }) =>
  ajax(url, { goodsNumber });
export const reqGetGoodsList = ({
  url,
  categoryId,
  keyWord,
  pageSize,
  pageNumber,
  sortField,
  isAscending
}) =>
  ajax(url, {
    categoryId,
    pageSize,
    pageNumber,
    keyWord,
    sortField,
    isAscending
  });

export const reqGetGoodsDetail = ({ url, _id }) => ajax(url, { _id });

//购物车
export const reqGetCart = () => ajax("/api2/shopping/getCart");

export const reqModifyCart = cartInfo =>
  ajax("/api2/shopping/modifyCart", { cartInfo }, "POST");
