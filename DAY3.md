# 页面导航

1. ## 什么是页面导航

   页面导航指的是页面之间的相互跳转

   1. `<a>`连接
   2. `location.href`

2. ### 小程序实现页面跳转的两种方式

   1. 声明式导航
      - 在页面上声明一个navigator导航组件
      - 通过点击`<navigator>`组件实现页面跳转
   2. 编程式导航
      - 调用小程序的导航API，实现页面的跳转

## 声明式导航

1. ### 导航到tabBar页面

   在使用`<navigator>`组件跳转到指定的tabBar页面时，需要指定url属性和open-type属性

   - `url`表示要跳转到的**页面地址**，必须以**/**开头
   - `open-type`表示**跳转的方式**，必须为**switchTab**

   ```html
   <navigator url="/pages/list/list" open-type="switchTab">导航到消息页面</navigator>
   ```

2. ### 声明式导航跳转到非tabBar页面

   在使用`<navigator>`组件跳转到普通的非tabBar页面时，则需要指定url属性和open-type属性

   - `url`表示要跳转的**页面地址**，必须**/**开头
   - `open-type`表示**跳转的方式**，必须为**navigator**

   ```html
   <navigator url="/pages/info/info" open-type="navigate">导航到Info页面</navigator>
   ```

   注意为了简便，在导航到tabBar页面时，`open-type="navigate"`属性**可以省略**

3. ### 后退导航

   如果需要后退到上一页面或多级页面，则需要指定open-type属性和delta属性

   - `open-type`的值必须时`navigateBack`，表示进行后退导航
   - `delta`的值必须是数字，表示要后退的层级

   ```html
   <navigator open-type="navigateBack" delta="1">后退</navigator>
   ```

   注意：为了简便，如果只是后退到上一页面，则可以**省略delta属性**，因为其**默认值为1**

## 编程式导航

1. ### 导航到tabBar页面

   调用`wx.switchTab(Object object)`方法，可以跳转到tabBar页面。

   Object参数**对象**属性

   |   属性   |   类型   | 是否必选 |                       说明                       |
   | :------: | :------: | :------: | :----------------------------------------------: |
   |   url    |  String  |    是    | 需要跳转的tabBar页面的路径，**路径后不能带参数** |
   | success  | function |    否    |              接口调用成功的回调函数              |
   |   fail   | function |    否    |              接口调用失败的回调函数              |
   | complete | function |    否    | 接口调用结束的回调函数（调用成功和失败都会执行） |

   ```html
   <button bindtap="gotoMessage">编程式导航,导航到消息页面</button>
   ```

   ```js
   gotoMessage(){
    wx.switchTab({
     url: '/pages/message/message',
    })
   }
   ```

2. ### 导航到非tabBar页面

   调用`wx.navigateTo(Object object)`方法，可以跳转到非tabBar的页面

   Object参数**对象**属性

   |   属性   |   类型   | 是否必选 |                       说明                       |
   | :------: | :------: | :------: | :----------------------------------------------: |
   |   url    |  String  |    是    | 需要跳转的tabBar页面的路径，**路径后可以带参数** |
   | success  | function |    否    |              接口调用成功的回调函数              |
   |   fail   | function |    否    |              接口调用失败的回调函数              |
   | complete | function |    否    | 接口调用结束的回调函数（调用成功和失败都会执行） |

   ```html
   <button bindtap="gotoInfo">编程式导航,导航到Info页面</button>
   ```

   ```js
   //通过编程式导航跳转到非tabBar页面
   gotoInfo(){
    wx.navigateTo({
     url: '/pages/info/info',
    })
   }
   ```

3. ### 后退导航

   调用`wx.navigateBack(Object object)`方法，可以返回上一层页面或多级页面

   Object参数**对象**属性

   |   属性   |   类型   | 默认值 | 是否必选 |                         说明                          |
   | :------: | :------: | :----: | :------: | :---------------------------------------------------: |
   |  delta   |  number  |   1    |    否    | 返回的页面数，如果delta大于现有的页面数，则返回到首页 |
   | success  | function |        |    否    |                接口调用成功的回调函数                 |
   |   fail   | function |        |    否    |                接口调用失败的回调函数                 |
   | complete | function |        |    否    |   接口调用结束的回调函数（调用成功和失败都会执行）    |

## 导航传参

1. ### 声明式导航传参

   navigator组件的url属性用来指定将要跳转的页面路径。同时，路径的后面还可以携带参数：

   - 参数与路径之间使用？分隔
   - 参数健与参数值用=相连
   - 不同参数用&分隔

   ```html
   <navigator url="/pages/info/info?name=zs&age=20">跳转到Info页面</navigator>
   ```

2. ### 编程式导航传参

   调用`wx.navigateTo(Object object)`方法跳转页面时，也可以携带参数

   ```html
   <button bindtap="gotoInfo2">跳转到Info页面</button>
   ```

   ```js
   gotoInfo2(){
    wx.navigateTo({
     url: '/pages/info/info?name=ls&gender=男'
    })
   }
   ```

3. ### 在onLoad中接收导航的参数

   通过**声明式导航传参**或**编程式导航传参**所携带的参数，可以直接在**onLoad事件**中直接获取到

   ```js
    onLoad(options) {
     console.log(options);
    }
   ```

# 页面事件

## 下拉刷新

1. ### 什么是下拉刷新

   下拉刷新时移动端的专有名词，指的是通过手指在屏幕上的下拉滑动操作，从而重新加载页面数据

2. ### 启用下拉刷新

   1. 全局开启下拉刷新
      - `app.json`的`window`节点
   2. 局部开启下拉刷新
      - 局部页面的`.json`文件

3. ### 配置下拉刷新窗口的样式

   **参考前面的window节点常用配置项**

4. ### 监听页面的下拉刷新事件

   在页面的`.js`文件中，通过`onPullDownRefresh()`函数即可监听当前的下拉刷新事件

   在页面触发下拉刷新的时候将count值重置为0

   ```js
   onPullDownRefresh() {
     this.setData({
      count: 0
     })
    }
   ```

5. ### 停止下拉刷新的效果

   调用`wx.stopPullDownRefresh()`可以停止当前页面的下拉刷新。

   ```js
   onPullDownRefresh() {
     this.setData({
      count: 0
     })
     wx.stopPullDownRefresh()
    }
   ```

## 上拉触底事件

1. ### 什么是上拉触底

   上拉触底是移动端的专有名词，通过手指在屏幕上的上拉滑动操作，从而加载更多数据的行为。

2. ### 监听页面的上拉触底事件

   在页面的`.js`文件中，通过`onReachBottom()`函数即可监听当前页面的上拉触底事件

   ```js
   onReachBottom() {
     console.log("触发了上拉触底事件");
    }
   ```

3. ### 配置上拉触底的距离

   **参考前面的window节点常用配置项**

4. ### 上拉触底的案例

   1. 定义获取随机颜色的方法

      ```js
      data: {
        colorList:[],
        isLoading: false
      },
      wx.request({
         url:'https://escook.cn/api/color',
         method:'get',
         success:({data:res})=>{
      ​    this.setData({
      ​     colorList:[...this.data.colorList,...res.data]
      ​    })
         },
      ```

   2. 在页面加载时获取初始数据

      ```js
      onLoad(options) {
        this.getColors()
       },
      ```

   3. 渲染UI结构并美化页面的效果

      ```html
      <view wx:for="{{colorList}}" wx:key="index" class="num-item" style="background-color: rgba({{item}});">
      {{item}}
      </view>
      ```

      ```css
      .num-item {
       border: 1rpx solid #efefef;
       border-radius: 8rpx;
       line-height: 200rpx;
       margin: 15rpx;
       text-align: center;
       text-shadow: 0 0 5rpx #fff;
       box-shadow: 1rpx 1rpx 6rpx #aaa;
      }
      ```

   4. 在上拉触底时调用获取随机颜色的方法

      ```js
      onReachBottom() {
        if (this.data.isLoading) return
        this.getColors()
       },
      ```

   5. 添加loading提示效果

      ```js
        wx.showLoading({
         title: '数据加载中...',
        })
      ```

      ```js
      getColors(){
        this.setData({
         isLoading:true
        })
       ...
         complete:()=>{
          wx.hideLoading()
         }
        })
       },
      ```

      

   6. 对上拉触底进行节流处理

      ```js
      data: {
        isLoading: false
       },
      ```

      ```js
      getColors(){
        this.setData({
         isLoading:true
        })
       ...
         complete:()=>{
      ​    this.setData({
      ​     isLoading:false
      ​    })
         }
        })
       },
      ```

# 生命周期

1. ### 什么是生命周期

   生命周期(Life Cycle)是指一个对象从创建->运行->销毁的整个阶段，强调的是一个时间段

   我们可以把每个小程序运行的过程，也概括为生命周期：

   - 小程序的启动，表示生命周期的开始
   - 小程序的关闭，表示生命周期的结束

2. ### 生命周期的分类

   在小程序中，生命周期分为两大类，分别是：

   1. **应用生命周期**
      - 特指小程序从启动->运行->销毁的过程
   2. **页面生命周期**
      - 特指小程序中，每个页面的加载->渲染->销毁的过程

   其中，页面的神明周期范围较小，应用程序的神明周期范围较大

   小程序启动->页面A的生命周期->页面B的生命周期->页面C的生命周期->etc...->小程序结束

3. ### 什么是生命周期函数

   **生命周期函数**：是由小程序框架提供的**内置函数，**会伴随着生命周期，**自动按次序执行**。

   **生命周期函数的作用**:允许程序员在**特定的时间点**、**执行某些特定的操作**。例如刚加载的时候，可以onLoad神明周期函数中初始化页面数据。

   注意：**生命周期**强调的是时间段，**生命周期函数**强调的是**时间点**

4. ### 生命周期函数的分类

   小程序中的生命周期函数的分类，分别是：

   1. **应用的生命周期函数**
      - 特指小程序从启动->运行->销毁期间依次调用的那些函数
   2. **页面的生命周期函数**
      - 特指小程序中，每个页面的加载->渲染->销毁依次调用的那些函数

5. ### 应用的生命周期函数

   小程序的应用生命周期函数需要在`app.js`中进行声明

   ```js
   App({
     /**
      * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
      */
          onLaunch: function () {
            console.log('onLaunch');
          },
     /**
      * 当小程序启动，或从后台进入前台显示，会触发 onShow
      */
          onShow: function (options) {
     },
     /**
      * 当小程序从前台进入后台，会触发 onHide
      */
          onHide: function () {
     },
     /**
      * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
      */
          onError: function (msg) {
     }
   })
   ```

6. ### 页面的周期函数

   ```js
   Page({
   	onLoad:function(options){},	//监听页面加载，一个页面只调用一次
   	onShow:function(){},	//监听页面显示
   	onReady:function(){},	//监听页面渲染完成，一个页面只调用一次
   	onHide:function(){},	//监听页面隐藏
   	onUnload:function(){}	//监听页面卸载，一个页面只调用一次
   })
   ```

   

# WXS脚本

## 概述

1. ### 什么是wxs

   wxs(Weixin Script)是小程序独有的一套脚本语言，结合WXML,可以构建出页面的结构。

2. ### wxs的实际应用场景

   **wxml中无法调用在页面的.js中定义的函数**，但是，wxml中可以调用wxs中定义的函数，因此，小程序中wxs的**典型应用场景就是**“**过滤器**”

3. wxs和JavaScript的关系

   虽然wxs的语法类似于JavaScript，但是wxs和JavaScript是完全不同的两种语言

   1. wxs有自己的数据类型
      - number数值类型、string字符串类型、Boolean布尔类型、object对象类型、function函数类型、array数组类型、data日期类型、regexp正则
   2. wxs不支持类似于ES6及以上的语法形式
      - 不支持：let、const、解构赋值、展开运算符、箭头函数、对象属性简写、etc...
      - 支持：var定义变量、普通function函数类似于ES5的语法
   3. wxs遵循CommonJS规范
      - module对象
      - require()函数
      - module.exports对象

## 普通语法

1. ### 内嵌wxs脚本

   wxs代码可以编写在wxml文件中的`<wxs>`标签内，就像JavaScript代码可以编写在html文件中的`<script>`标签内一样

   wxml文件中的每一个`<wxs></wxs>`标签，**必须提供module属性**，用来指定**当前wxs的模块名称**，方便在wxml中访问模块中的成员：

   ```js
   <view>{{m1.toUpper(username)}}</view>
   <wxs module="m1">
    module.exports.toUpper = function(str){
     return str.toUpperCase()
    }
   </wxs>
   ```

2. ### 定义外联的wxs脚本

   wxs代码还可以编写在以.wxs为后缀名的文件内，就像JavaScript代码可以编写在以.js为后缀名的文件中一样。

   ```js
   function tolower(str){
    return str.tolowerCase()
   }
   module.exports = {
    tolower:tolower
   }
   ```

3. ### 使用外联的wxs脚本

   在wxml中引入外联的wxs脚本，必须为`<wxs>`标签添加module和src属性

   - module用来指定模块的名称
   - src用来指定要引入的脚本路径，且必须是相对路径

   ```html
   <view>{{m2.toLower(country)}}</view>
   
   <wxs src="../../utils/tools.wxs" module="m2"></wxs>
   ```

## wxs的特点

1. ### 与JavaScript不同

   为了降低wxs的学习成本，wxs语言在设计时大量借鉴了JavaScript的语法。但是本质神，wxs和JavaScript是完全把不同的两种语言。

2. ### 不能作为组件的事件回调

   wxs典型的应用场景就是“过滤器”，经常配合Mustache语法进行使用

   ```html
   <view>{{m2.toLower(country)}}</view>
   ```

   但是，在wxs中定义的函数不能作为组件的事件回调函数。

   ``` html
   <!-- 错误用法 -->
   <button bindtap="m2.toLower">按钮</button>
   ```

3. ### 隔离性

   隔离性指的是wxs的运行环境和其他JavaScript代码是隔离的

   1. wxs不能调用.js中定义的函数
   2. wxs不能调用小程序提供的API

4. ### 性能好

   - 在iOS设备上，小程序内的WXS会比JavaScript代码快2~20倍
   - 在Android设备上，二者运行效率无差异

# 案例

1. ### 列表页面的API接口

   以分页的形式，加载指定分类下商铺列表的数据：

   1. 接口地址
      - https://www.escook.cn/categories/:cate_id/shops
      - URL地址中的:cate_id是动态参数，表示分类id
   2. 请求方式
      - GET请求
   3. 请求参数
      - _page表示请求第几页数据
      - _limit表示每页请求几条数据

2. ### 判断是否还有下一页数据

   页码值*每页显示多少条数据>=总数据条数

# 总结

1. 能够知道如何实现页面之间的导航跳转
   - 声明式导航、编程式导航
2. 能偶知道如何实现下拉刷新效果
   - enablePullDownRefresh、**onPullDownRefresh**
3. 能够知道如何实现上拉加载更多效果
   - onReachBottomDistance、**onReachBottom**
4. 能够知道小程序中常用的生命周期函数
   - 应用生命周期函数：**onLaunch**,onShow,onHidde
   - 页面生命周期函数：**onLoad**,onShow,**onReady**,onHide,onUnload

