import request from "@/api/baseRequest";


/**
 * 统计访问量、用户量、文章量、留言量
 * @returns {*}
 */
export function getData() {
    return request({
        method: "GET",
        url: ""
    })
}