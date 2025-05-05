import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export default API;

export const fetchProfile = async (email) => {
  if (!email) return { error: "No email provided" };
  try {
    const res = await axios.get(`http://localhost:5000/routes/auth/`, {
      params: { email },
    });
    return res.data;
  } catch (error) {
    return { error: error.response?.data?.error || "Error fetching profile" };
  }
};
