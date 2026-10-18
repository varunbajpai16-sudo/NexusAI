
import axios from "axios";
import { loginSuccess } from "../features/Auth/Auth.Slice";

const API = axios.create({
  // Gateway root URL — do not add /api/auth here
  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginUser = async (googleToken, dispatch) => {
  try {
    const response = await API.post(
      "/api/auth/login",
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

    // Update Redux state
    dispatch(loginSuccess(user));

    return user;
  } catch (error) {
    console.error(
      "Login failed:",
      error.response?.data || error.message
    );

    throw error;
  }
};

export default API;
