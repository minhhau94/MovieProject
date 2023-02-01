import axios from "axios";

const requester = axios.create({
    // baseURL là link cơ bản
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        TokenCybersoft: process.env.REACT_APP_CYBERSOFT_TOKEN,
    },
});

// để Authorization trong requester sẽ gặp lỗi không hiện ở lần đầu tiên đăng nhập, do hàm requester chỉ tạo mới 1 lần duy nhất, khắc phục bằng dùng interceptor, có thể gắn cho mọi requester
// interceptor: tương tự middleware chắn giữa FE và BE
// có 2 loại: request: chắn giữa FE và BE, chắn những request gửi lên/ response: chặn những request trả về
requester.interceptors.request.use((req) => {
    req.headers = {
        ...req.headers,
        // lưu ý có khoảng trắng sau Bearer
        Authorization: "Bearer " + localStorage.getItem("token"),
    }
    // return để next đi
    return req;
});

export default requester;

// routing protection (guard trong angular): không cho user vào lại trang login sau khi login