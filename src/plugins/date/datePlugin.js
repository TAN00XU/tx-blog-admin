import Vue from "vue";
import dayjs from "dayjs";

export default {
    install() {
        //日期全局过滤器
        Vue.filter("date", function(value) {
            return dayjs(value).format("YYYY年MM月DD日");
        });

        Vue.filter("year", function(value) {
            return dayjs(value).format("YYYY");
        });

        Vue.filter("hour", function(value) {
            return dayjs(value).format("HH:mm:ss");
        });

        Vue.filter("dateTime", function(value) {
            return dayjs(value).format("YYYY-MM-DD HH:mm:ss");
        });

    }
}