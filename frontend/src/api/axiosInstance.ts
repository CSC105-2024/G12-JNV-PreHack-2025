import axios from 'axios'; // <--- ต้องเป็น 'axios' ไม่ใช่ 'axiosInstance.ts'

const api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true, // สำคัญสำหรับ cookie
});

export default api;
