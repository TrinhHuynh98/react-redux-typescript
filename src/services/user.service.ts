import { api, IPagination } from "../helpers";
import { IUser } from "../stores/users/type";

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

const handleResponse = (response: any) => {
  return response.text().then((text: string) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        logout();
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
};

const getUsersPaging = async (
  currentPage: number
): Promise<IPagination<IUser>> => {
  const res = await api
    .get<IPagination<IUser>>(`/v1/users/paging/${currentPage}`)
    .then((response) => {
      return response.data;
    });
  return res;
};

export const userService = {
  login,
  logout,
  getCurrentUser,
  getUsersPaging,
};
