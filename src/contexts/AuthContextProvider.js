import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const authContext = React.createContext();
export const useAuth = () => useContext(authContext);

const API = "http://35.239.251.89/";

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const config = {
    headers: { "Content-Type": "multipart/form-data" },
  };

  const register = async (username, password) => {
    let formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    try {
      // указали / иначе видел некорректный тип запроса
      const res = await axios.post(`${API}register/`, formData, config);
      console.log(res);
      navigate("/login");
    } catch (error) {
      console.log(error);
      setError("Error occured");
    }
  };

  const login = async (username, password) => {
    // console.log(user);
    let formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    try {
      let res = await axios.post(`${API}api/token/`, formData, config);
      navigate("/");
      console.log(res.data);
      localStorage.setItem("token", JSON.stringify(res.data));
      localStorage.setItem("username", username);
      setUser(username);
    } catch (error) {
      console.log(error);
      setError("Wrong username or password", error);
    }
  };

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUser("");
    navigate('/');
  }

  // функция для проверки токена на срок годности, будем вызывать постоянно в навбаре, он будет проверять, если срок действия истек, то он просто обновит аксесс токен, в данном случае нам просто возвращается обновленный аксесс токен, но бывают случаи, когда возвращается пара токенов обновлеенными(нарисовать снова схему взаимодействия фронта с бэком, именно токены)
  async function checkAuth() {
    console.log('Сработала проверка токена!');
    let token = JSON.parse(localStorage.getItem("token"));

    try {
      const Authorization = `Bearer ${token.access}`;

      let res = await axios.post(
        `${API}api/token/refresh/`,
        {
          refresh: token.refresh,
        },
        { headers: { Authorization } }
      );

      localStorage.setItem(
        "token",
        JSON.stringify({ refresh: token.refresh, access: res.data.access })
      );

      let username = localStorage.getItem("username");
      setUser(username);
    } catch (error) {
      logout();
    }
  }

  return (
    <authContext.Provider
      value={{ register, login, logout, checkAuth, error, user }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;

//   checked up
