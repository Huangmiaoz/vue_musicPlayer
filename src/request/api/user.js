import service from "..";
// 获取用户创建的歌单
export function  getMyMusicList(id) {
  return service ({
      method : 'get',
      url : `/user/playlist?uid=${id}`
  })
}