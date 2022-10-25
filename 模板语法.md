# 模板语法

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

      