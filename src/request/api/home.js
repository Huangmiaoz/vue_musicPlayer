import service from "..";
// 获取首页轮播图数据
export function getBanner() {
    return service ({
        method : 'get',
        url :"/banner?type=2"
    })
}
// 获取发现好歌歌单
export function getMusicList() {
    return service({
        method : "get",
        url : "/recommend/resource"
    })
}
// 搜索功能
export function getSearchMusic(data) {
    return service({
        method : "get",
        url : `/cloudsearch?keywords=${data}`
    })
}
// 登录功能——/login/cellphone?phone=xxx&password=yyy
export function getPhoneLogin(data) {
    return service({
        method : "get",
        url : `/login/cellphone?phone=${data.cellphone}&password=${data.password}`
    })
}
// 获取登陆的用户的信息
export function getLoginUser(data) {
   return service({
    method:"GET",
    url:`/user/detail?uid=${data}`
   })
}
