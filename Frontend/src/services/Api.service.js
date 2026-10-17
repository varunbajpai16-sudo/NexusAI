
import axios from "axios";
import { loginSuccess } from "../features/Auth/Auth.Slice";

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api/auth",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginUser = async (googleToken, dispatch) => {
  const response = await API.post(
    "auth/login",
    {},
    {
      headers: {
        Authorization: `Bearer ${googleToken}`,
      },
    }
  );

  const user = response.data.user;

  if (!user) {
    throw new Error("User data missing from login response");
  }

  // Update Redux and localStorage
  dispatch(loginSuccess(user));

  return user;
};

export default API;
