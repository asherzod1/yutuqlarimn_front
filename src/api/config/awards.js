import {HttpRequestHub} from "../httpRequestHub";

export const getAwards = () => {
    const config = {
        method: "GET",
        url: `api/award`,
    };
    return HttpRequestHub(config);
};
