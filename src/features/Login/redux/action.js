import requester from "app/api";
import action from "./type";

export const loginAction = (userLogin) => {
    // call API
    return async (next) => {
        try{
           const res = await requester({
                method: "POST",
                url: "/api/QuanLyNguoiDung/DangNhap",
                data: userLogin,
            });

            next({
                type: action.SET_PROFILE,
                payload: res.data.content,
            });
            // set localStorage => những trường hợp token nhanh hết hạn trong vài phút thì sử dụng 2 cơ chế refresh token (nếu đang xài, token hết hạn thì tự động call API lên để lấy token mới về cho user sử dụng, user không biết) hoặc fingerprint (sử dụng token của laptop và trình duyệt đó, khi qua máy khác thì k tiếp tục sử dụng đc token này)
            // hoạc set cookies nhưng phải có bankend hỗ trợ
            localStorage.setItem("token", res.data.content.accessToken)
        }catch(err){
            // đưa err ra ngoài
            throw err;
        }
    };
};

export const fetchProfileActipn = async (next) => {
    try {
        const res = await requester({
            method: "POST",
            url: "/api/QuanLyNguoiDung/ThongTinTaiKhoan",
        });

        next({
            type: action.SET_PROFILE,
            payload: res.data.content,
        })
    } catch(err){};
};