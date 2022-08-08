
## Question

1. 控制台报错[谷歌浏览器会出现这个问题，在Edge浏览器上没有报这个问题]
   - translate.google.com/gen204?sl=en&tl=zh-CN&textlen=2&ttt=149&ttl=217&ttf=191&sr=1&nca=te_time&client=te_lib&logld=vTE_20220720:1          GET http://translate.google.com/gen204?sl=en&tl=zh-CN&textlen=2&ttt=149&ttl=217&ttf=191&sr=1&nca=te_time&client=te_lib&logld=vTE_20220720 net::ERR_CONNECTION_TIMED_OUT

![10017](https://cdn.jsdelivr.net/gh/coding327/PicGoImg@main/blog/pictures10017.png)

解决：`<html lang="en"></html>`，默认是en,而谷歌浏览器我是使用的中文版本，与这个en英文不匹配，只需要更改`lang='zh-cmn-Hans'`，这个是目前完整写法，也有`lang='zh'`的，具体看下方链接：

[详细说明链接地址](https://blog.csdn.net/ztxnight/article/details/49150339)

2. 使用ant design的轮播组件，请求图片最初始为空，传递给子组件轮播渲染报如下警告

![10018](https://cdn.jsdelivr.net/gh/coding327/PicGoImg@main/blog/pictures10018.png)

解决：使用&&,等图片请求过来，数组有长度了，再传递渲染这个轮播组件

```jsx
{/* 轮播图 */}
{swiperArr.length && <MySwiper swiperArr={swiperArr}/>}
```

3. 基本文本超出显示省略号
```css
p{
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
}
```

4. css强制换行无效的终极解决方案

```css
p {
    overflow-wrap: break-word;
    /*就是下面这一句，好像网上没有这一个的说明，但是浏览器都支持*/
    word-break: break-word;
    word-wrap: break-word;
    /* 多行文本超出显示省略号【注意定下盒子宽高】 */
    overflow: hidden;
    /* 第二行显示省略号，高度来限制 */
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
}
```

[点击查看大佬解决方案](https://www.javazxz.com/thread-9304-1-1.html)

---
```
{/* 轮播图 */}
            {swiperArr.length && <MySwiper swiperArr={swiperArr} />}
            {/* 列表 */}
            {goodArr.length && <Good goodArr={goodArr} />}
            {/* 没有更多了 */}
            <p style={{height: '60px', lineHeight: '60px', textAlign: 'center', paddingBottom: '50px'}}>没有更多了</p>

```
> react的jsx语法里{}里，单个组件标签不需要在外层用空标签或div包裹，但是多个组件标签就需要使用空标签或者div包裹，都是针对于自己写的组件，但是三方引入的如ant design的组件，它的组件标签是不需要空标签或者div包裹，如果三方引入组件和自己写的组件放同级外面也是需要空标签或者div包裹

> 在同目录下样式组件优先高于css文件，无法引入css文件，始终显示样式组件文件，需要在该文件夹下创建一个css文件，来放css文件，就能成功引入


