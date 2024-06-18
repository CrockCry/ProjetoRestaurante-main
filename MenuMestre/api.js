import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const createAxiosInstance = async () => {
  const token = await AsyncStorage.getItem("userToken");
  return axios.create({
    baseURL: "https://api.example.com",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default createAxiosInstance;
