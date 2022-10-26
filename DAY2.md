# WXML模板语法

## 数据绑定

1. ### 数据绑定的基本原则

   1. 在data中定义数据
   2. 在WXML中使用数据

2. ### 在data中定义页面的数据

   在页面对应的`.js`文件中，把数据定义到data对象中即可：

   ```js
   data: {
     info:'hello world'
    },
   ```

3. ### Mustache语法的基本使用

   把data中的数据绑定到页面中渲染，使用Mustache（双大括号）将变量包起来即可

   ```html
   <view>{{info}}</view>
   ```

4. ### Mustache语法的主要应用场景如下：

   - 绑定内容
   - 绑定属性
   - 运算（三元运算、算术运算等）

5. ### 动态绑定内容（插值语法）

6. ### 动态绑定属性

   ```html
   <image src="{{}}"></image>
   ```

   **注意于Vue的v-bind属性绑定不同**

7. ### 三元运算

   ```js
   {{number>=5?1:0}}
   ```

8. ### 算数运算

   ```js
   {{number*100}}
   ```

## 事件绑定

1. ### 什么是事件

   事件是**渲染层到逻辑层的通讯方式**。通过事件可以将用户在渲染层产生的行为，反馈到逻辑层进行业务的处理。

2. ### 小程序中常用的事件

   | 类型   | 绑定方式                | 事件                                        |
   | ------ | ----------------------- | ------------------------------------------- |
   | tap    | bindtap或bind:tap       | 手指触摸后马上离开。类似于HTML中的click事件 |
   | input  | bindinput或bind:input   | 文本框的输入事件                            |
   | change | bindchange或bind:change | 状态改变时触发                              |

3. ### 事件对象属性列表

   当事件回调触发的时候，会收到一个事件对象event，它的详细属性如下：

   |     属性      |    类型    |                     说明                     |
   | :-----------: | :--------: | :------------------------------------------: |
   |     type      |   String   |                   事件类型                   |
   |   timeStamp   |  Integer   |       页面打开到触发事件所经历的毫秒数       |
   |  **target**   | **Object** |      **触发事件的组件的一些属性值集合**      |
   | currentTarget |   Object   |           当前组件的一些属性值集合           |
   |  **detail**   | **Object** |                **额外的信息**                |
   |    touches    |   Array    | 触摸事件，当前停留在屏幕中的触摸点信息的数组 |
   | changeTouches |   Array    |      触摸事件，当前变化的触摸点信息数组      |

4. ### target和currentTarget的区别

   target时触发该事件的源头组件，而currentTarget则是当前事件所绑定的组件

5. ### bindtap的语法格式

   在小程序中，不存在HTML鼠标点击事件，而是通过**tap事件**来响应用户的触摸行为。

   ```html
   <button type="primary" bindtap="btnTapHandler">按钮</button>
   ```

   ```javascript
   btnTapHandler(e) {
     console.log(e);
    },
   ```

6. ### 在事件处理函数中为data中的数据赋值

   通过调用`this.setData(dataObject)`方法，可以给页面data中的数据重新赋值

   ```js
   Page({
    data: {
     count:0
    },
    //加一按钮的事件处理函数
    countChange(){
     this.setData({
      count:this.data.count+1
     })
    },
   })
   ```

7. ### 事件传参

   小程序中的事件传参比较特殊，不能再绑定事件的同时为事件处理函数传递的参数。

   ```html
   <button type="primary" bindtap="btnTapHandler(123)">按钮</button>
   <!-- 将不能正常进行工作 -- >
   ```

   小程序会把bindtap的属性值，统一当作事件名称来处理，相当于调用一个名称为`btnTapHandler(123)`的函数

   可以为组件提供data-\*自定义属性传参，其中 \* 代表的时参数的名称

   ```html
   <button type="primary" bindtap="btnTapHandler" data-info="{{123}}">按钮</button>
   ```

   - info 会被解析为参数的名称
   - 数值2会被解析为参数的值

   在事件处理函数中，通过event.target.dataset参数名即可获取到具体的参数值

   `e.target.dataset.info`

8. ### bindinput的语法格式

   在小程序中，通过input事件来响应文本框的输入事件

   1. 通过bindinput,可以为文本框绑定输入事件：

      ```html
      <input bindinput="inputHandler" type="text"/>
      ```

   2. 在页面的.js文件中定义事件处理函数：

      ```js
      //文本框事件处理函数
       inputHandler(e){
        console.log(e.detail.value);
       },
      ```

9. ### 实现文本框和data之间的数据同步

   步骤：

   1. 定义数据

      ```js
      data: {
        msg:'你好'
       },
      ```

   2. 渲染结构

      ```js
      inputHandler(e){
          this.setData({
            msg:e.detail.value
          })
        },
      ```

   3. 美化环境

      ```css
      input {
       border: 1px solid #ccc;
       margin: 5px;
       padding: 5px;
       border-radius: 3px;
      }
      ```

   4. 绑定input使事件处理函数

      ```html
      <input bindinput="inputHandler" type="text" value="{{msg}}"/>
      ```

## 条件渲染

1. ### wx:if(相当于v-if)

   在小程序中，使用`wx:if="{{condition}}"`来判断是否需要渲染该代码块：

   ```html
   <view wx:if="{{condition}}"></view>
   ```

   也可以用`wx:elif`和`wx:else`来添加else判断：

   ```html
   <view wx:if="{{type === 1}}"></view>
   <view wx:elif="{{type === 2}}"></view>
   <view wx:else>保密</view>
   ```

2. ### 结合\<block\>使用wx:if

   如果一次性控制多个组件的展示和隐藏，可以使用一个`<block></block>`标签将多个组件包装起来，并在`<block>`标签上使用`wx:if`控制属性。**(相当于Vue中的template)**

3. ### hidden(相当于v-show)

   在小程序中，直接使用`hidden=“{{condition}}”`也能控制元素的显示与隐藏

   ```html
   <view hidden="{{condition}}">条件为 true 隐藏，条件为 false 显示</view>
   ```

4. ### wx:if与hidden的对比

   1. 运行方式不同
      - `wx:if`以动态创建和移除元素的方式，控制元素的展示与隐藏
      - `hidden`以切换样式的方式（`display：none/block;`）,控制元素的显示与隐藏
   2. 使用建议
      - 频繁切换时，建议使用`hidden`
      - 控制条件复杂时，建议使用`wx:if`搭配`wx:elif`、`wx:else`进行展示与隐藏的切换

## 列表渲染

1. ## wx:for

   通过wx:for可以根据指定的数组，循环渲染重复的组件结构

   ```html
   <view wx:for="{{arr1}}" wx:key="index">
    索引是：{{index}},item项是：{{item}}
   </view>
   ```

   默认情况下，当前循环项的**索引**用**index**表示；**当前循环项**用**item**表示

2. ### 手动指定索引和当前项的变量名

   - 使用`wx:for-index`可以指定**当前循环项的索引**的变量名

   - 使用`wx:for-item`可以指定**当前项**的变量名

     ```html
     <view wx:for="{{arr1}}" wx:key="id" wx:for-index="ids" wx:for-item="itemName">
      索引是：{{ids}},item项是：{{itemName}}
     </view>
     ```

3. wx:key的使用

   类似于Vue列表渲染中的:key,小程序实例列表渲染时，也建议为渲染出来的列表项指定唯一的key值，从而提高渲染的效率

   ```html
   <!-- arr1: [{id: '001',name: '苹果'}, {id: '002',name: '华为'}, {d: '003',name: '小米'}] -->
   <view wx:for="{{arr1}}" wx:key="id">
     索引是：{{item.id}},item项是：{{item.name}}
   </view>
   ```

   **wx:key="id"**

# WXSS模板样式

1. ### 什么是WXSS

   **WXSS(weixin style sheets)**是一套**样式语言**，用于梅花`WXML`的组件样式，类似于网页开发中的`CSS`

2. ### wxss和css的关系

   wxss具有css大部分特性，同时，wxss还对css进行了扩充有以及修改，以适应微信小程序的开发

   - **rpx**尺寸单位
   - **@import**样式导入

## rpx

1. ### 什么是rpx尺寸单位

   rpx(responsive pixel)是微信小程序独有的，用来**解决屏适配的尺寸单位**。

2. ### rpx的实现原理

   当前屏幕的总宽度为750rpx

3. ### rpx与px之间的单位换算

   以iPhone6为例

   1rpx = 0.5px = 1物理像素

   **建议使用iPhone6作为视觉稿的标准**

## 样式导入

1. 什么是样式导入

   使用WXSS提供的@import语法，可以导入外联的样式表。

2. @import的语法格式

   **@import**后跟需要导入的外联样式表的**相对路径**，用；表示语句结束

   ```css
   .username {
    color:red;
   }
   ```

   ```css
   @import "/common/common.wxss";
   input {
     border: 1px solid #ccc;
     margin: 10rpx;
     padding: 10rpx;
     border-radius: 6rpx;
   }
   ```

## 全局样式和局部样式

1. ### 全局样式

   定义在 **app.wxss**中的样式为**全局样式**，作用与每一个页面。

2. ### 局部样式

   在页面的.wxss文件中定义的样式为局部样式，只作用于当前页面。

   1. 当局部样式与全局样式冲突时，根据就近原则，局部央视会覆盖全局样式
   2. 当局部央视的**权重大于或等于**全局样式的权重时，才会覆盖全局样式

## 全局配置

1. ### 全局配置文件及常用的配置项

   小程序根目录下的`app.json`文件时小程序的**全局配置文件**

   1. pages
      - 记录当前小程序所有页面的存放路径
   2. window
      - 全局设置小程序窗口的外观
   3. tabBar
      - 设置小程序底部的tabBar效果
   4. style
      - 是否启用新版的组件样式

2. ### window

   1. #### 小程序窗口的组成部分

      - navigationBar导航栏区域
      - background背景区域默认不可见，下拉才显示
      - 页面的主体区域，用来显示wxml中的布局

   2. #### 了解window节点常用的配置项

      |            属性名            |   类型   | 默认值  |                    说明                    |
      | :--------------------------: | :------: | :-----: | :----------------------------------------: |
      |    navigationBarTitleTest    |  String  | 字符串  |             导航栏标题文字内容             |
      | navigationBarBackgroundColor | HexColor | #000000 |         导航栏背景颜色，如#000000          |
      |    navigationBarTextStyle    |  String  |  white  |     导航栏标题颜色，仅支持black/white      |
      |       backgroundColor        | HexColor | #ffffff |               窗口的背景颜色               |
      |     backgroundTextStyle      |  String  |  dark   |    下拉loading的样式，仅支持dark/light     |
      |     enablePullDownfresh      | Boolean  |  false  |            是否全局开启下拉刷新            |
      |    onReachBottomDistance     |  Number  |   50    | 页面上拉触底事件时距页面底部距离，单位为px |

   3. #### 下拉刷新enablePullDownfresh

      下拉刷新是移动端的专有名词，指的是通过手指在品目上的下拉操作，从而重新加载页面数据的行为

   4. #### 设置下拉刷新的背景色backgroundColor

   5. #### 下拉刷新的loading样式backgroundTextStyle

   6. #### 设置上拉触底的距离onReachBottomDistance

3. ### 什么是tabBar

   tabBar是移动端应用常见的页面效果，用于实现多页面的快速切换。小程序中通常将其分为：

   - 顶部tabBar
   - 底部tabBar

   注意

   - tabBar中只能配置最少2个，最多5个tab页签
   - 当渲染顶部tabBar时，不显示icon，只显示文本

4. ### tabBar的6个组成部分

   1. backgroundColor:tabBar的背景颜色
   2. selectedconPath:选中时的图片路径
   3. borderStyle:tabBar上边框的颜色
   4. iconPath:未选中时的图片路径
   5. color:tab上文字的默认（未选中）颜色
   6. selectedColor:tab上的文字选中时的颜色

   |      属性       |   类型    |  必填  | 默认值 |                 描述                  |
   | :-------------: | :-------: | :----: | :----: | :-----------------------------------: |
   |    position     |  String   |   否   | bottom |    tabBar的位置，仅支持bottom/top     |
   |   borderStyle   |  String   |   否   | black  | tabBar上边框的颜色，仅支持black/white |
   |      color      | HexColor  |   否   |        |     tab上文字的默认（未选中）颜色     |
   |  selectedColor  | HexColor  |   否   |        |       tab上文字的默认选中的颜色       |
   | backgroundColor | hexColor  |   否   |        |            tabBar的背景色             |
   |    **list**     | **Array** | **是** |        |  **tab页面的列表、最少2个、最多5个**  |

   **list 里的页面其中一个必须在pages中排第一个**

5. ### 每个tab项的配置选项

   |       属性       |  类型  | 必填 |                       描述                        |
   | :--------------: | :----: | :--: | :-----------------------------------------------: |
   |     pagePath     | String |  是  |        页面路径，页面必须在pages中预先定义        |
   |       text       | String |  是  |                  tab上显示的文字                  |
   |     iconPath     | String |  否  | 未选中时的图标路径；当position为top时，不显示icon |
   | selectediconPath | String |  否  |  选中时的图标路径；当position为top时，不显示icon  |


## 页面配置

1. ### 页面配置文件的作用

   小程序中，每个页面都有自己的.json配置文件，用来对当前的窗口外观，页面效果等进行配置。

2. ### 页面配置和全局配置的区别

   小程序中，app.json中的window节点，可以全局配置小程序中每个页面的窗口表现。

   如果某些小程序页面想要拥有特殊的窗口表现，此时，“页面级别的.json配置文件”就可以实现这种需求。

   当页面配置与全局配置冲突的时候，以页面配置为准

3. ### 页面配置中常用的配置项

   **参考window节点常用配置项**

## 网络数据请求

1. ### 小程序的限制

   出于安全考虑，小程序官方对数据接口的请求做出了如下限制：

   1. 只能请求HTTPS类型接口

   2. 必须将接口的域名添加到信任列表中

      **开发者工具->详情->域名信息->request合法域名**

2. ### 配置request合法域名

   **登录微信小程序的管理后台->开发->开发配置->服务器域名->修改request合法域名**

   注意：

   1. 域名只支持https协议
   2. 域名不能使用IP地址或localhost
   3. 域名必须经过ICP备案
   4. 服务器域名一个月内最多可以申请5次修改

3. ### 发起GET请求

   调用`wx.request()`方法，发起GET数据请求

   ```js
   url:'https://www.escook.cn/api/get',
      method:'get',
      data:{
       name:'zs',
       age:20
      },
      success:(res)=>{
       console.log(res.data);
      }
     })
   ```

4. ### 发起POST请求

   调用`wx.request()`方法，发起POST数据请求

   ```js
   wx.request({
      url:'https://www.escook.cn/api/post',
      method:'post',
      data:{
   ​    name:'ls',
   ​    age:33
      },
      success:(res)=>{
   ​    console.log(res.data);
      }
     })
   ```

5. ### 在页面加载时请求数据

   在页面的onLoad事件中调用获取数据的函数

   ```js
   //监听页面加载事件
    onLoad() {
     this.getInfo(),
     this.postInfo()
    },
   ```

6. ### 跳过request合法域名校验

   **开发者工具->详情->本地设置->不校验合法域名...以及HTTPS证书**

   注意：这个选项只能在开发调试时候使用

7. ### 关于跨域和Ajax的说明

   1. 跨域只存在于基于浏览器的web开发中，由于小程序的宿主环境是微信而不是浏览器，所以不存在跨域问题。
   2. Ajax核心技术是依赖于浏览器中的XMLHttpRequest这个对象，由于小程序的宿主环境是微信客户端，所以小程序中不能叫做“发起Ajax请求”，而是叫做“发起网络数据请求”

8. ### 案例

   **参考miniprogram-3的首页**

   wxml:

   ```html
   <!-- 轮播图区域 -->
   <swiper autoplay circular indicator-dots>
     <swiper-item wx:for="{{swiperList}}" wx:key="id">
       <image src="{{item.image}}"></image>
     </swiper-item>
   </swiper>
   
   <!-- 九宫格区域 -->
   <view class="grid-list">
     <view class="girs-item" wx:for="{{getGridList}}" wx:key="id">
       <image src="{{item.icon}}"></image>
       <text>{{item.name}}</text>
     </view>
   </view>
   
   <!-- 图片区域 -->
   <view class="image-box">
     <view class="left"></view>
     <view class="right"></view>
   </view>
   ```

   wxss:

   ```css
   * pages/home/home.wxss */
   swiper {
    height: 350rpx;
   }
   swiper image {
    width: 100%;
    height: 100%;
   }
   .grid-list {
    display: flex;
    flex-wrap: wrap;
    border-left: 1rpx solid #efefef;
    border-top: 1rpx solid #efefef;
   }
   .girs-item {
    width: 33.33%;
    height: 200rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-bottom: 1rpx solid #efefef;
    border-right: 1rpx solid #efefef;
    box-sizing: border-box;
   }
   .girs-item image {
    width: 60rpx;
    height: 60rpx;
   }
   .girs-item text {
    font-size: 24rpx;
    margin-top: 10rpx;
   }
   .image-box {
    display: flex;
    justify-content: space-around;
   }
   .image-box .left,
   .image-box .right {
    width: 50%;
    height: 180rpx;
    border-radius: 20rpx;
   }
   .image-box .left{
    background-color: pink;
   }
   .image-box .right{
    background-color: skyblue;
   }
   ```

   .js文件

   ```js
   // pages/home/home.js
   Page({
     /**
      * 页面的初始数据
        */
          data: {
            swiperList:[],
            gridList:[]
          },
     /**
      * 生命周期函数--监听页面加载
        */
          onLoad(options) {
            this.getSwiperList()
            this.getGridList()
          },
     //获取轮播图数据的方法
     getSwiperList(){
       wx.request({
         url: 'https://www.escook.cn/slides',
         method:'GET',
         success:(res)=>{
           // console.log(red.data);
           this.setData({
             swiperList:res.data
           })
         }
       })
     },
     getGridList(){
       wx.request({
         url: 'https://www.escook.cn/categories',
         method:'GET',
         success:(res)=>{
           // console.log(res.data);
           this.setData({
             getGridList:res.data
           })
         }
       })
     },
   })
   ```

9. ### 总结

   1. 能够使用WXML模板语法渲染页面结构
      - **wx:if**、wx:elif、wx:else、**hidden、wx:for、wx:key**
   2. 能够使用WXSS样式美化页面结构
      - **rpx尺寸单位**、@import样式导入、全局样式和局部样式
   3. 能够使用app.json对小程序进行全局性配置
      - pages、**window**、**tabBar**、style
   4. 能够使用page.json对小程序页面进行个性化配置
      - 对单个页面进行个性化配置、**就近原则**
   5. 能够知道如何发起网络数据请求
      - **wx:request()方法**、**onLoad()事件**