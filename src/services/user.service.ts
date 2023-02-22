import env from "react-dotenv";

const login = async (email: string, password: string) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  };
  const response = await fetch(
    `http://localhost:15000/api/v1/auth`,
    requestOptions
  );
  const response_1 = await handleResponse(response);
  sessionStorage.setItem("user", JSON.stringify(response_1));
  return response_1;
};
console.log("env.API_URL", env.API_URL);
const logout = () => {
  sessionStorage.removeItem("user");
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

export const userService = {
  login,
  logout,
};
