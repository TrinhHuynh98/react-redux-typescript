import { api, IPagination } from "../helpers";
import { IAddUser, IUpdateUser, IUser } from "../stores/users/type";

const login = async (email: string, password: string): Promise<any> => {
  const body = { email, password };
  return await api.post<any>("/v1/auth", body).then((response) => {
    sessionStorage.setItem("user", JSON.stringify(response.data));
    return response.data;
  });
};

const logout = () => {
  sessionStorage.removeItem("user");
};

const getCurrentUser = async (): Promise<any> => {
  return await api.get("/v1/auth").then((res) => {
    return res.data;
  });
};

// const handleResponse = (response: any) => {
//   return response.text().then((text: string) => {
//     const data = text && JSON.parse(text);
//     if (!response.ok) {
//       if (response.status === 401) {
//         logout();
//       }
//       const error = (data && data.message) || response.statusText;
//       return Promise.reject(error);
//     }
//     return data;
//   });
// };

const getUsersPaging = async (
  currentPage: number,
  keyword: string
): Promise<IPagination<IUser>> => {
  const res = await api
    .get<IPagination<IUser>>(
      `/v1/users/paging/${currentPage}?keyword=${keyword}`
    )
    .then((response) => {
      return response.data;
    });
  return res;
};

const addUser = async (user: IAddUser): Promise<any> => {
  const res = await api.post(`/v1/users`, user).then((response) => {
    return response.data;
  });
  return res;
};

const getUserById = async (id: string) => {
  const res = await api.get<IUser>(`/v1/users/${id}`).then((response) => {
    return response.data;
  });
  return res;
};

const editUser = async (id: string, user: IUpdateUser): Promise<any> => {
  const res = await api.put(`/v1/users/${id}`, user).then((response) => {
    return response.data;
  });
  return res;
};

const deleteUser = async (ids: string[]): Promise<any> => {
  const res = await api.delete(`/v1/users`, { data: ids }).then((response) => {
    return response.data;
  });
  return res;
};

export const userService = {
  login,
  logout,
  getCurrentUser,
  getUsersPaging,
  addUser,
  getUserById,
  editUser,
  deleteUser,
};
