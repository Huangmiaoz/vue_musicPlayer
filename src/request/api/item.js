import service from "..";
// 获取歌单的歌曲
export function getMusicItemList(id) {
    return service ({
        method : 'get',
        url : `/playlist/track/all?id=${id}`
    })
}
// 获取歌单的详细信息
export function getMusicListDescription(id) {
    return service ({
        method : 'get',
        url : `/playlist/detail?id=${id}`
    })
}

// 获取歌词/lyric?id=33894312
export function getMusicLyric(data) {
    return service({
        method : 'get',
        url : `/lyric?id=${data}`
    })
}
