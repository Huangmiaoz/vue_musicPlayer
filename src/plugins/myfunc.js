export default function changeCount(num) {
    if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + "亿";
    } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + "万";
    }
}

export function getImageColor(canvas, img) {
    canvas.width = img.width;
    canvas.height = img.height;
 
    let context = canvas.getContext("2d");
 
    context.drawImage(img, 0, 0);
 
    // 获取像素数据
    let data = context.getImageData(0, 0, img.width, img.height).data;
 
    // 取所有像素的平均值
    for (let row = 0; row < img.height; row++) {
        for (let col = 0; col < img.width; col++) {
            r += data[((img.width * row) + col) * 4];
            g += data[((img.width * row) + col) * 4 + 1];
            b += data[((img.width * row) + col) * 4 + 2];
        }
    }
 
    // 求取平均值
    r /= (img.width * img.height);
    g /= (img.width * img.height);
    b /= (img.width * img.height);
 
    // 将最终的值取整
    r = Math.round(r);
    g = Math.round(g);
    b = Math.round(b);
 
    return {r,g,b};
}