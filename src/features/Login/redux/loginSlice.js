import produce from "immer";
import action from "./type";

const inititalState = {
    profile: null,
}

// shallow comparison: so sánh state đầu vào và state đầu ra, nếu khác nhau cho giao diện load lại
const reducer = (state = inititalState, {type, payload}) => {
    return produce(state, (draft) => {
        switch (type) {
            case action.SET_PROFILE:
                draft.profile = payload;
                break;

                
            default:
                break;
        }
    });
};

export default reducer;

// immutable: tính bất biến (string, number, boolean,...), không được sửa dữ liệu trực tiếp
// mutable: có thể sửa được (object)