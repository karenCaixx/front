const CanvasTool = {
    /**
     * 定制文字
     */
    drawText: function(ctx, obj) {
        ctx.save();
        ctx.setFillStyle(obj.color);
        ctx.setFontSize(obj.size);
        ctx.setTextAlign(obj.align);
        ctx.setTextBaseline(obj.baseline);
        if (obj.bold) {
            ctx.fillText(obj.text, obj.x, obj.y - 0.5);
            ctx.fillText(obj.text, obj.x - 0.5, obj.y);
        }
        ctx.fillText(obj.text, obj.x, obj.y);
        if (obj.bold) {
            ctx.fillText(obj.text, obj.x, obj.y + 0.5);
            ctx.fillText(obj.text, obj.x + 0.5, obj.y);
        }
        ctx.restore();
    },
    /**
     *   画圆角
     *   ctx: canvas对象
     *   x: 绘制字符串起始x坐标
     *   y: 绘制字符串起始y坐标
     *   width: 绘制宽度
     *   width: 绘制高度
     *   r: 圆角半径
     *   fill: 是否填充
     *   stroke: 是否画边框
     *   注意: arcTo方法在android上画弧度会有问题,使用时先确定官方是否已修复
     */
    drawRoundedRect: function(ctx, x, y, width, height, r, fill, stroke) {
        ctx.save();
        ctx.beginPath();
        //draw top and top right corner
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + width, y, x + width, y + r, r);
        //draw right side and bottom right corner
        ctx.arcTo(x + width, y + height, x + width - r, y + height, r);
        //draw bottom and bottom left corner
        ctx.arcTo(x, y + height, x, y + height - r, r);
        //draw left and top left corner
        ctx.arcTo(x, y, x + r, y, r);
        if (fill) {
            ctx.fill();
        }
        if (stroke) {
            ctx.stroke();
        }
        ctx.restore();
    },
    /**  文字换行
     *   str: 要绘制的字符串
     *   ctx: canvas对象
     *   x: 绘制字符串起始x坐标
     *   y: 绘制字符串起始y坐标
     *   canvasWidth: 所在区域宽度
     *   lineHeight: 字行高
     *   line: 非必填,只展示n行
     */
    canvasTextAutoLine: function(str, ctx, x, y, canvasWidth, lineHeight, line) {
        ctx.save();
        var lineWidth = 0;
        var lastSubStrIndex = 0;
        var n = 0;
        for (let i = 0; i < str.length; i++) {
            let curWidth = 17;
            if(wx.canIUse('canvasContext.measureText')) {
                curWidth = ctx.measureText(str[i]).width;
            }
            lineWidth += curWidth;
            if (lineWidth > canvasWidth - x) { //减去x,防止边界出现的问题
                n++;
                if(line && n == line) {
                    ctx.fillText(str.substring(lastSubStrIndex, i-1), x, y);
                    ctx.fillText('...', x+lineWidth-curWidth, y);
                    return;
                } else {     
                    ctx.fillText(str.substring(lastSubStrIndex, i), x, y);
                }
                y += lineHeight;
                lineWidth = 0;
                lastSubStrIndex = i;
            }
            if (i == str.length - 1) {
                ctx.fillText(str.substring(lastSubStrIndex, i + 1), x, y);
            }
        }
        ctx.restore();
    },

    drawRoundAvatar: function(ctx, url, x, y, width, height, r) {
        this.drawRoundedRect(ctx, x, y, width, height, r, 0 ,0);
        ctx.clip();
        ctx.drawImage(url, x, y, width, height);
        ctx.restore();
    },

    drawTextarea: function(ctx, x, y, str, width, lineH) {
        ctx.save();
        let lineWidth = x;

        for (let i = 0; i < str.length; i++) {
            let curWidth = 17;
            if (wx.canIUse('canvasContext.measureText')) {
                curWidth = ctx.measureText(str[i]).width;
            }

            let curx = lineWidth;
            lineWidth += curWidth;
            if(str[i] == '`' || (lineWidth > width - x)) {
                if(lineWidth > width - x) {
                  ctx.fillText(str[i], curx, y);
                }

                y += lineH;
                lineWidth = x;
            } else if (str[i] == '^') {
                ctx.fillText(' ', curx, y);
            } else {
                ctx.fillText(str[i], curx, y) 
            }

        }
        ctx.restore();
    }
}

module.exports = {
    CanvasTool
}