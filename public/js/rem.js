function remSize() {
    // 获取设备的宽度
    var deviceWidth = document.documentElement.clientWidth || window.innerWith;
    if(deviceWidth >= 750) {
        deviceWidth = 750;
    }
    if(deviceWidth <= 320) {
        deviceWidth = 320;
    }
    //750 1rem = 100px; 375 1rem = 50px 方便计算
    document.documentElement.style.fontSize = (deviceWidth / 7.5) + 'px';
    // 设置字体大小 15px
    document.querySelector('body').style.fontSize = 0.3 + "rem";
}

remSize();

// 当窗口发生变化时,也要调用函数重新进行适配
window.onresize = function() {
    remSize();
} 