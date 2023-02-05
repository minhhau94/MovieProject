import requester from "app/api";

const { default: apiPath } = require("app/apiPath");


export const getScheduleMovieCinema = async(maHeThongRap) => {
    const res = await requester({
        method: "GET",
        url: apiPath.SCHEDULE_CINAMAS + `?maHeThongRap=${maHeThongRap}&maNhom=GP10`,            
    });
    return res;
}