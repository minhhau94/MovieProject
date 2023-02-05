import requester from "app/api";
import apiPath from "app/apiPath";
import action from "./type";

export const fetchBannersAction = async (next) => {
    try{
        const res = await requester({
            // khi sử dụng request thì có sẵng baseURL nên chỉ cần cop khúc sau url, dùng apiPath để giấu code
            url: apiPath.BANNERS,
            method: "GET",        
        });

        next({
            type: action.SET_BANNERS,
            payload: res.data.content,
        });
    } catch(err) {}
};

export const fetchMoviesAction = (page=1) => {
    return async (next) => {
        try{
            const res = await requester({
                // do trên API là querynên phải thêm dấu ? và đính kèm tham số: maNhom, tenPhim, ...
                // url: "/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01&soTrang=1&soPhanTuTrenTrang=10"
                // hoặc bỏ vào params để tự nối vào url
                url: apiPath.MOVIES,
                method: "GET",
                params: {
                    maNhom: "GP10",
                    soTrang: page,
                    soPhanTuTrenTrang: 12,
                },
            });
            next({
                type: action.SET_MOVIES,
                payload: res.data.content,
            })
        } catch(err) {}
    };
};

export const fetchMovieDetailAction = (id) => {
    return async (next) => {
        try{
            const res = await requester({
                url: apiPath.MOVIE_DETAIL,
                method: "GET",
                params: {
                    MaPhim: id,
                },
            });
            next({
                type: action.SET_MOVIE_DETAIL,
                payload: res.data.content,
            });
        } catch(err) {}
    };
};

export const fetchMovieDetailScheduleAction = (id) => {
    return async (next) => {
        try{
            const res = await requester({
                url: apiPath.MOVIE_DETAIL_SCHEDULE,
                method: "GET",
                params: {
                    MaPhim: id,
                },
            });
            next({
                type: action.SET_MOVIE_DETAIL_SCHEDULE,
                payload: res.data.content,
            });
        } catch(err) {}
    };
};

// get API hệ thống rạp
export const fetchCinemasAction = async (next) => {
    try{
        const res = await requester({
            method: "GET",
            // khi sử dụng request thì có sẵng baseURL nên chỉ cần cop khúc sau url, dùng apiPath để giấu code
            url: apiPath.CINAMAS,            
        });

        next({
            type: action.SET_CINEMAS,
            payload: res.data.content,
        });
    } catch(err) {}
};