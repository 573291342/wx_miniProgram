## 小程序代码的构成

1. ### 了解项目的基本结构

   - **`pages`用来存放所有小程序的页面**
   - `utils`用来存放工具性质的模块（例如：格式化事件的自定义模块）
   - **`app.js`小程序项目的入口文件**
   - **`app.json`小程序项目的全局配置文件**
   - `app.wxss`小程序的全局样式文件
   - `project.config.json`项目的配置文件
   - `sitemap.json`用来配置小程序及其页面是否允许被微信索引

2. ### 小程序页面的组成部分

   小程序官方建议把所有小程序的页面，都存放在**pages目录**中，**以单独的文件夹**存在

   其中，每个页面由**4个基本文件**组成，它们分别是：

   - `.js`文件（页面的脚本文件，存放页面的数据、事件处理函数等）
   - `.json`文件（当前页面的配置文件，配置窗口外观、表现等）
   - `.wxml`文件（页面的模板结构文件）
   - `.wxss`文件（当前的样式表文件）

3. ### JSON配置文件的作用

   **JSON是一种数据格式**，在实际开发中，JSON总是以**配置文件**的形式出现。小程序项目中也不例外：通过不同的`.json`配置文件，可以对小程序项目进行不同级别的配置。

   小程序项目中有4种`.json`配置文件，分别是：

   1. 项目根目录中的`app.json`配置文件
   2. 项目根目录中的`project.config.json`配置文件
   3. 项目根目录中的`sitemap.json`配置文件
   4. **每个页面文件夹中的`.json`配置文件**

   - `app.json`文件

     `app.json`是当前小程序的**全局配置**，包括了小程序徐的**所有页面路径、窗口外观、界面表现、底部tab**等。

     pages:用来记录当前小程序所有页面的路径

     window：全局定义小程序所有页面的背景色、文字颜色等

     style:全局定义小程序组件所使用的样式版本

     sitemapLocation:用来指明sitemap.json的位置

   - `project.config.json`文件

     `project.config.json`是项目的配置文件，用来记录我们对小程序开发工具所做的个性化配置，例如：

     - setting中保存了编译相关的配置
     - projectname中保存的是项目名称
     - appid中保存的是小程序的账号ID

   - `sitemap.json`文件

     微信已开放小程序内搜索，效果类似于PC网页的SEO。sitemap.json文件用来配置小程序页面是否允许微信索引。

     `"action": "allow"`允许索引

     `"action": "disallow"`不允许索引

4. ### 页面的.json配置文件

   小程序中的每一个页面，可以使用.json文件来**对本页面的窗口外观进行配置，页面中的配置会覆盖app.json的window中相同的配置项**。

   ```js
   "navigationBarBackgroundColor": "#00b26a"
   
   //将导航栏的背景颜色改为绿色
   ```

5. ### 	新建小程序页面

   只需要在`app.json`->`pages`中新增页面的存放路径，小程序开发者工具即可帮我们自动创建对应的页面文件

   ```js
    "pages":[
   
     "pages/index/index",
   
     "pages/logs/logs",
   
     "pages/list/list"
   
    ],
   ```

   

6. ### 修改项目的首页

   只需要调整app.json->pages数组中页面路径的前后顺序，即可修改项目的首页。小程序会把第一位的页面，当作项目首页进行渲染。

    

   ```js
   "pages":[
   
     "pages/list/list",
   
     "pages/index/index",
   
     "pages/logs/logs"
   
    ],
   ```

7. ### 什么是wxml

   WXML(WeixXin MarKup Language)是小程序框架设计的一套标签语言，用来构建小程序页面的结构，其作用类似于网页开发中的HTML。

8. ### wxml和HTML的区别

   1. 标签名称不同
      - HTML(`div`,`span`,`img`,`a`)
      - WXML(`view`,`text`,`image`,`navigator`)
   2. 属性节点不同
      - `<a href="#">超链接</a>`
      - `<navigator url="/pages/home/home"></navigator>`
   3. 提供了类似于Vue中的模板语法
      - 数据绑定
      - 列表渲染
      - 条件渲染

9. ### 什么是wxss

   1. 新增了rpx尺寸单位
      - CSS中需要手动进行像素单位换算，例如rem
      - WXSS在底层支持新的尺寸单位rpx，在不同大小的屏幕上小程序会自动进行换算。
   2. 提供了全局样式和局部样式
      - 项目根目录中的app.wxss会作用于所有小程序页面。
      - 局部页面的.wxss样式仅对当前页面生效
   3. WXSS仅支持部分CSS选择器
      - .class和#id
      - element
      - 并集选择器，后代选择器
      - ::after和::before等伪类选择器

10. ### 小程序中的.js文件

    通过`.js`文件来处理用户的操作

    分类：

    1. `app.js`
       - 是**整个小程序项目的入口文件**，通过**调用App()函数**类启动整个小程序
    2. 页面的`.js`文件
       - 是**页面的入口文件**，通过调用**Page()函数**来创建并运行页面
    3. 普通的`.js`文件
       - 是**普通的功能模块文件**，用来封装**公共的函数或属性**供页面使用

## 小程序的宿主环境

1. ### 什么是宿主环境

   宿主环境是指程序运行所必须的依赖环境，例如Android和iOS

2. ### 小程序的宿主环境

   手机微信是小程序的宿主环境

   小程序可以**借助宿主环境提供的能力**，可以完成需索普通网页无法完成的功能，例如：微信扫码，微信支付，微信登录，地理定位。etc...

3. ### 小程序宿主环境包含的内容

   1. 通信模型
   2. 运行机制
   3. 组件
   4. API

4. ### 通信主体(渲染层和逻辑层)

   WXML模板和WXSS样式工作在渲染层

   js脚本工作在逻辑层

5. ### 小程序的通信模型

   1. **渲染层**和**逻辑层**之间的通信
      - 由微信客户端进行转发
   2. **逻辑层**和**第三方服务器**之间的通信
      - 由微信客户端进行转发

6. ### 小程序启动的过程

   1. 小程序的代码包下载到本地
   2. 解析`app.json`全局配置文件
   3. 执行`app.js`小程序入口文件，调用`App()`创建小程序实例
   4. 渲染小程序的首页
   5. 小程序启动完成

7. ### 页面渲染的过程

   1. 加载计息页面的`.json`配置文件
   2. 加载页面的`.wxml`模板和`.wxss`样式
   3. 执行页面的`.js`文件，**调用Page()创建页面实例**
   4. 页面渲染完成

8. ### 小程序的组件分类

   1. **视图容器**
      1. **view**
         - 普通视图区域
         - 类似于HTML中的div,是一个块级元素
         - 常用来实现页面的布局效果

      2. **scroll-view**
         - 可滚动的视图区域
         - 常用来实现滚动列表效果

      3. **swiper和swiper-item**
         - 轮播图容器组件和轮播图item组件

   2. **基础内容**
      1. text
         - 文本组件
         - 类似于HTML中的span标签，是一个行内元素

      2. rich-text
         - 富文本组件
         - 支持把HTML文字字符串渲染为WXML结构

   3. **表单组件**
   4. **导航组件**
   5. 媒体组件
   6. map地图组件
   7. canvas画布组件
   8. 开放能力
   9. 无障碍访问

9. ### view组件的基本使用

   实现如图的flex横向布局效果

   ```html
   <!--pages/list/list.wxml-->
   <view class="container1">
     <view>A</view>
     <view>B</view>
     <view>C</view>
   </view>
   ```

   ```css
   /* pages/list/list.wxss */
   
   .container1 {
    display: flex;
    justify-content: space-around;
   }
   .container1 view {
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
   }
   .container1 view:nth-child(1) {
    background-color: lightgreen;
   }
   .container1 view:nth-child(2) {
    background-color: lightskyblue;
   }
   .container1 view:nth-child(3) {
    background-color: lightpink;
   }
   ```

   实现纵向滚动的效果：

   ```html
   <!--pages/list/list.wxml-->
   <scroll-view scroll-y class="container1">
    <view>A</view>
    <view>B</view>
    <view>C</view>
   </scroll-view>
   ```

   ```css
   /* pages/list/list.wxss */
   
   .container1 {
    position: relative;
    border: 1px solid red;
    width: 100px;
    height: 100px;
   }
   .container1 view {
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
   }
   .container1 view:nth-child(1) {
    background-color: lightgreen;
   }
   .container1 view:nth-child(2) {
    background-color: lightskyblue;
   }
   .container1 view:nth-child(3) {
    background-color: lightpink;
   }
   ```

   横向滚动要为每一个盒子加横向的定位

   实现轮播图的效果

   ```html
   <!--pages/list2/list2.wxml-->
   <swiper indicator-dots class="swiper-container">
     <!-- 第一个轮播图 -->
     <swiper-item class="item">A</swiper-item>
     <!-- 第二个轮播图 -->
     <swiper-item class="item">B</swiper-item>
     <!-- 第三个轮播图 -->
     <swiper-item class="item">C</swiper-item>
   </swiper>
   ```

   |          属性          |  类型   |    默认值     |         说明         |
   | :--------------------: | :-----: | :-----------: | :------------------: |
   |     indicator-dots     | boolean |     false     |  是否显示面板指示点  |
   |    indicator-color     |  color  | rgba(0,0,0,3) |      指示点颜色      |
   | indicator-active-color |  color  |    #000000    | 当前选中的指示点颜色 |
   |        autoplay        | boolean |     false     |     是否自动切换     |
   |        interval        | number  |     5000      |   自动切换时间间隔   |
   |        circular        | boolean |     false     |   是否采用衔接滑动   |

   ```css
   /* pages/list2/list2.wxss */
   .swiper-container {
    height: 150px;
   }
   .item {
    height: 100%;
    line-height: 150px;
    text-align: center;
   }
   .swiper-container .item:nth-child(1) {
    background-color: lightgreen;
   }
   .swiper-container .item:nth-child(2) {
    background-color: lightskyblue;
   }
   .swiper-container .item:nth-child(3) {
    background-color: lightpink;
   }
   ```

10. ### text组件的基本使用

    通过text组件的selectable属性，实现长按选中文本内容的效果

    ```html
    <view>
    手机号支持长按选中效果
    <text selectable>12345678900</text>
    </view>
    ```

    通过rich-text组件的nodes属性节点，把HTML字符串渲染为对应的UI结构(**类似于字符串模板**)

    ```html
    <rich-text nodes="<h1 style='color:red'>标题</h1>"></rich-text>
    ```

11. ### 其他常用组件

    1. **button**
       - 按钮组件
       - 功能比HTML中的button按钮丰富
       - 通过open-type属性可以调用微信提供的各种功能(客服、转发、获取用户授权、获取用户信息)
    2. **image**
       - 图片组件
       - image组件默认宽度约300px、高度约240px
    3. **navigator**
       - 页面导航组件
       - 类似于HTML中的a链接

12. ### button按钮组件的基本使用

    | 属性  |          值          |     描述     |
    | :---: | :------------------: | :----------: |
    | type  | default\primary\warn |  按钮的类型  |
    | size  |         mini         | 小尺寸的按钮 |
    | plain |        plain         |   镂空按钮   |

13. ### image组件的基本使用

    ```html
    <image src=""></image>
    ```

14. ### image组件的mode属性

    在image组件的mode属性用来指定图片的裁剪和缩放模式

    |   mode值    |                    说明                    |
    | :---------: | :----------------------------------------: |
    | scaleToFill |            不保持纵横比缩放图片            |
    |  aspectFit  |      保持纵横比缩放图片,保证长边显示       |
    | aspectFill  |      保持纵横比缩放图片,保证短边显示       |
    |  widthFix   | 宽度不变，高度自动变化，保持原图宽高比不变 |
    |  heightFix  | 高度不变，宽度自动变化，保持原图宽高比不变 |

15. ### 小程序API概述

    **小程序中的API是由宿主环境提供的**，通过这些API,开发者可以方便的调用微信提供的能力，如获取用户信息，本地存储，支付功能等

    1. **事件监听API**
       - 特点：以on开头，用来监听某些事件的触发
       - 举例：`wx.onWindowResize(function callback)`监听窗口尺寸变化的事件
    2. **同步API**
       - 特点：以`Sync`结尾的API都是同步API
       - 特点：同步API的执行结果，可以通过函数返回值直接获取，如果执行出错会抛出异常
       - 举例：`wx.setStorageSync('key','value')`向本地存储中写入内容
    3. **异步API**
       - 特点：类似于jQuery中的`$.ajax(option)`函数，需要通过`success`、`fail`、`complete`接受调用的结果
       - 举例：`wx.request()`发起网络数据请求，通过success回调数据接受数据

16. ### 了解权限管理需求

    出于管理需求，我们迫切需要对不同岗位，不同角色的员工的权限进行辩解的划分，使他们能够高效的进行协同工作。

    组织结构：

    ​	管理者

    1. 产品组
    2. 设计组
    3. 开发组
    4. 测试组
