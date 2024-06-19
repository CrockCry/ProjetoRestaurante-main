import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const createAxiosInstance = async () => {
  const token = await AsyncStorage.getItem("userToken");
  return axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
  });
};

export default createAxiosInstance;
