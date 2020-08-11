import ajax from "./ajax";

export const reqLogin = ({ username, password }) =>
  ajax("/api2/users/login", { username, password }, "POST");

export const reqRegister = ({ username, password, email, verify }) =>
  ajax("/api2/users/register", { username, password, email, verify }, "POST");

export const reqLogout = () => ajax("/api2/users/logout");

export const reqGetUser = () => ajax("/api2/users/getUser");

export const reqGetVerify = email => ajax("/api2/users/verify", { email });

export const reqFindPassword = ({ password, email, verify }) =>
  ajax("/api2/users/findPassword", { password, email, verify }, "POST");

export const reqGetCategoriesLevel1 = ({ url }) => ajax(url, { parentId: 0 });
export const reqGetCategoryById = ({ url, _id }) => ajax(url, { _id });

export const reqGetCategoriesLevel2Andlevel3 = ({ url, parentId }) =>
  ajax(url, { parentId });

export const reqGetGoodsList = ({ url, categoryId, pageSize, pageNumber }) =>
  ajax(url, { categoryId, pageSize, pageNumber });

export const reqGetGoodsDetail = ({ url, _id }) => ajax(url, { _id });

export const reqGetCart = () => ajax("/api2/shopping/getCart");

export const reqModifyCart = cartInfo =>
  ajax("/api2/shopping/modifyCart", { cartInfo }, "POST");

export const reqSearchGoods = ({ url, keyWord, pageSize, pageNumber }) =>
  ajax(url, { keyWord, pageSize, pageNumber });
