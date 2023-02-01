import actions from "./type";
import produce from "immer";

const inititalState = {
    banners: [],
    movies: {},
    movieDetail: null,
    movieDetailSchedule: null,
    cinemas: [],
};

// thay vì đưa action thì đưa trực tiếp {type, payload} vào
const reducer = (state = inititalState, { type, payload }) => {
    // sử dụng thu viện immerJS
    // produce nhận vào baseState: state hiện tại, draftState: bản nháp state
    // hàm này cho phép chỉnh sửa thoải mái bản nháp draft, sau đó tự gộp vào chỉnh sửa bản chính
    return produce(state, draft => {
        switch (type) {
            case actions.SET_BANNERS:
                draft.banners = payload;
                // state.banners = payload;
                // return {...state}
                break;
            case actions.SET_MOVIES:
                draft.movies = payload;
                break;
            case actions.SET_MOVIE_DETAIL:
                draft.movieDetail = payload;
                break;
            case actions.SET_MOVIE_DETAIL_SCHEDULE:
                draft.movieDetailSchedule = payload;
                break;
            case actions.SET_CINEMAS:
                draft.cinemas = payload;
                break;
            default:
                break;
            // return state;
        };
    });
};

export default reducer;
