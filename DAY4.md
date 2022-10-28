# 自定义组件

## 组件的创建与引用

1. ### 创建组件

   1. 在项目的根目录中，鼠标右键，创建component->test文件夹
   2. 在新建的component->test文件夹上，鼠标右键，点击“新建Component”
   3. 键入组件的名称之后回车，会自动生成组件对应的4个文件，后缀名分别为.js,.json,.wxml和.wxss

2. ### 引用组件

   组件的引用方式分为“局部引用”和“全局引用“，顾名思义：

   - 局部引用：组件只能在当前被引用的页面内使用
   - 全局引用：组件可以在每个小程页面中使用

3. ### 局部引用组件

   在页面的.json配置文件中引用组件的方式，叫做“局部引用”。

   ```js
   //在页面的.json文件中，引入组件
   {
    "usingComponents": {
     "my-test1":"/components/test/test"
    }
   }
   ```

   ```html
   <!-- 在页面的.wxml文件中，使用组件 -->
   <my-test1></my-test1>
   ```

4. ### 全局引用组件

   在app.json全局配置文件中引用组件的方式，叫做“全局引用”。

   ```js
   // 在全局的app.json文件中
    "usingComponents": {
     "my-test1":"/components/test/test"
    },
   ```

   ```html
   <!-- 在页面的.wxml文件中，使用组件 -->
   <my-test1></my-test1>
   ```

5. ### 组件引用vs全局引用

   根据组件的使用频率和范围，来选择合适的引用方式：

   - 如果某组件**在多个页面中经常被用到**，建议进行”全局引用“
   - 如果某组件**只在特定的页面中被用到**，建议进行”局部引用“

6. ### 组件和页面的区别

   从表面来看文件的组成方式都式.js,.json,.wxml,.wxss

   区别:

   - 组件的`.json`文件中需要声明`“component”: true`属性**（"usingComponents": {}）**
   - 组件的`.js` 文件中调用的是`Component()`函数**（Pages()）**
   - 组件的事件处理函数需要定义到methods节点中

## 样式

1. ### 组件样式隔离

   默认情况下，自定义组件的样式只对当前组件有效

   优点：

   1. 防止外界样式影响组件内部的样式
   2. 防止组件的样式破坏外界样式

2. ### 组件样式隔离的注意点

   - app.wxss中的全局样式对组件无效
   - 只有class选择器会有样式隔离的效果，id选择器、属性选择器、标签选择器不受样式隔离的影响

   **建议：在组件和引用组件的页面中建议使用class选择器，不要使用id、属性、标签选择器**

3. ### 修改组件的样式隔离选项

   默认情况下，自定义组件的样式隔离特性能够防止组件内外样式相互干扰的问题，但有时，我们希望在外界能都控制组件内部的样式，可以通过stylelsolation修改组件的样式隔离选项

4. ### stylelsolation的可选值

   ```js
   Component({
   options:{
    styleIsolation: 'shared'
   },
   })
   ```

   |    可选值    | 默认值 |                             描述                             |
   | :----------: | :----: | :----------------------------------------------------------: |
   |   isolated   |   是   | 表示启用样式隔离，在自定义组件内外，使用class指定的样式将不会相互影响 |
   | apply-shared |   否   | 表示页面wxss样式将影响到自定义组件，但自定义组件wxss中指定的样式不会影响页面 |
   |    shared    |   否   | 表示页面wxss样式将影响到自定义组件，自定义组件wxss中指定的样式也会影响页面和其他设置了apply-shared或shared的自定义组件 |

## 数据、方法和属性

1. ### data数据

   在小程序组件中，用于组件模板渲染的私有数据，需要定义到data节点中

   ```js
   Component({
   	data:{
   		count: 0
   	}
   })
   ```

2. ### methods方法

   在小程序组件中，事件处理函数和自定义方法需要定义到methods节点中

   ```js
   Component({
   methods: {
     //点击事件处理函数
     addCount() {
      this.setData({
   ​    count: this.data.count + 1
      })
      //this指向组件实例
      this._showCount()
     },
   //自定义方法建议下划线开头
     _showCount() {
      wx.showToast({
   ​    title: 'count是' + this.data.count,
   ​    icon:'none'
      })
     }
    }
   })
   ```

3. ### properties属性

   在小程序中，properties是组件的对外属性，用来接收外界传递到组件中的数据

   ```js
   Component({
    properties: {
     //第一种方式：简化方式
     // max:Number,
     //第二种方式：完整的定义方式
     max:{
      type:Number, //数据类型
      value:10 //默认值
     }
    },
   })
   ```

4. ### data和properties的区别

   在小程序的组件中，properties属性和data数据的用法相同，它们都是可读可写的

   - data更倾向于存储组件的私有数据
   - properties更倾向于存储外界传递到组件中的数据

   ```js
   //证明data和properties指向的是同一个对象
     showInfo(){
      console.log(this.data); //{count: 0, max: 9}
      console.log(this.properties); //{count: 0, max: 9}
      console.log(this.data === this.properties); //true
     }
   ```

5. ### 使用setData修改properties的值

   由于data数据和properties属性在本质上没有任何区别，因此properties属性的值也可以用于页面渲染，或使用setData为properties中的属性重新赋值

## 数据监听器

1. ### 什么是数据监听器

   数据监听器用于监听和响应任何属性和数据字段的变化，从而执行待定的操作。它的作用类似于vue中的watch倾听器。

2. ### 数据监听器的基本使用

   ```html
    <view>{{n1}}+{{n2}}={{sum}}</view>
   <button bindtap="addN1">n1+1</button>
   <button bindtap="addN2">n2+1</button>
   ```

   ```js
   //在组件的component对象里
   methods: {
     addN1() {
      this.setData({
   ​    n1: this.data.n1 + 1
      })
     },
     addN2() {
      this.setData({
   ​    n2: this.data.n2 + 1
      })
     }
    },
    observers: {
     'n1,n2': function(newn1, newn2) {
      this.setData({
   ​    sum: newn1 + newn2
      })
     }
    }
   ```

3. ### 监听对象属性的变化

   数据监听器支持监听对象中单个或多个属性的变化

   ```js
   Component({
     observers:{
       '对象.属性A,对象.属性B':function(属性A的新值,属性B的新值){
        //触发此监听器的3种情况
        //【为属性A赋值】
        //【为属性B赋值】
        //【直接为对象赋值】
       }
     }
   })
   ```

## 数据监听器案例

1. ### 案例

   参考项目4的消息页面

2. ### 监听对象中所有属性的变化

   如果某个对象中需要被监听的属性太多，为了方便，可以使用通配符**来监听对象中所有属性的变化、

   ```js
   //在组件的component里创建的observers对象里
   'rgb.**':function(obj){
      this.setData({
   ​    fullColor:`${obj.r},${obj.g},${obj.b}`
      })
     }
   ```

## 纯数据字段

1. ### 什么是纯数据字段

   纯数据字段指的是那些不用于界面渲染的data字段

   使用场景：既不会展示在界面上，也不会传递给其他组件，仅仅在组件内部使用

   好处：纯数据字段有助于页面更新的性能

2. ### 使用规则

   在Component构造器的options节点中，指定`pureDataPattern`为一个正则表达式，字段名符合这个正则表达式的字段将成为纯数据字段。

3. ### 使用纯数据字段改造数据监听器案例

   ```js
   //在组件的component对象里
   options:{
     pureDataPattern:/^_/ //正则_开头的字段
    },
    data: {
     _rgb: {
       r: 0,
       g: 0,
       b: 0
     },
     fullColor: '0,0,0'
   },
   ```

## 组件的生命周期

1. ### 组件全部的生命周期函数

   小程序组件可用的全部生命周期

   | 生命周期函数 |     参数     |                 描述说明                 |
   | :----------: | :----------: | :--------------------------------------: |
   | **created**  |    **无**    |      **在组件实例刚刚被创建时执行**      |
   | **attached** |    **无**    |    **在组件案例进入页面节点树时执行**    |
   |    ready     |      无      |       在组件在视图层布局完成后执行       |
   |    moved     |      无      | 在组件实例被一定到节点数另一个位置时执行 |
   | **detached** |    **无**    |  **在组件实例被从页面节点树移除时执行**  |
   |    error     | Object Error |        每当组件方法抛出错误时执行        |

2. ### 组件主要的生命周期函数

   在小程序组件中，最重要的生命周期函数有3个，分别是**created、attached、detached**。

   1. 组件实例**刚创建好**的时候，created生命周期函数会被触发
      - 此时还不能调用`setData`
      - 通常在这个生命周期函数中只应该用于给组件的this添加一些自定义的属性字段。
   2. 在组件完全初始化完毕、进入页面节点树后，`attached`生命周期函数会被触发
      - 此时，`this.data`已经初始化完毕
      - 这个生命周期很有用，绝大多数初始化的工作可以在这个时机进行（例如发送请求获取初始数据）
   3. 在组件离开页面节点树后，detached生命周期函数会被触发
      - 退出一个页面时，会触发页面内每个自定义组件的`detached`生命周期函数
      - 此时适合做一些清理性质的工作

3. ### lifetimes节点

   在小程序组件中生命周期函数可以直接定义在`Component`构造器的第一级参数中，可以在lifetimes字段内进行声明（**这是推荐的方式，其优先级最高**）

   ```js
   //旧的声明方式，在组件的component对象里
   Component({
   created(){
     console.log("created");
    },
    attached(){
     console.log('attached');
    }
   })
   ```

   ```js
   //新的声明方式，在组件的component对象里
   Component({
   lifetimes: {
     created() {
      console.log("created");
     },
     attached() {
      console.log('attached');
     }
    }
   })
   ```

## 组件所在页面的生命周期

1. ### 什么是组件所在页面的生命周期

   有时，自定义组件的行为依赖于页面状态的变化，此时就需要用到组件所在的页面的生命周期。

   | 生命周期函数 |    参数     |             描述             |
   | :----------: | :---------: | :--------------------------: |
   |     show     |     无      |  组件所在的页面被展示时执行  |
   |     hide     |     无      |  组件所在的页面被隐藏时执行  |
   |    resize    | Object Size | 组件所在的页面尺寸变化时执行 |

2. ### pageLifetimes节点

   组件所在页面的生命周期函数，需要定义在pageLifetimes节点中

3. ### 生成随机的RGB颜色值

   ```js
   //在组件methods对象里
   _randomColor() {
      this.setData({
   ​    _rgb: {
   ​     r: Math.floor(Math.random() * 256),
   ​     g: Math.floor(Math.random() * 256),
   ​     b: Math.floor(Math.random() * 256)
   ​    }
      })
     },
   ```

## 插槽

1. ### 什么是插槽

   在自定义逐渐的wxml结构中，可以提供一个`<slot>`节点（插槽），**用于承载组件使用者提供的wxml结构**。

2. ### 单个插槽

   在小程序中，默认每个自定义组件这种只允许使用一个`<slot>`进行占位，这种个数上的限制叫做单个插槽。

   - 组件的封装者

   ```html
   <view>
    <view>这里时组件的内部结构</view>
    <slot></slot>
   </view>
   ```

   - 组件的使用者

   ```html
   <my-test4>
    <view>这是通过插槽填充的内容</view>
   </my-test4>
   ```

3. ### 启用多个插槽

   在小程序的自定义组件中，需要使用多个`<slot>`插槽时，可以在组件的.js文件中，通过如下的方式进行启用。

   ```js
   Component({
    options:{
     multipleSlots:true
    },
    properties: {},
    data: {},
    methods: {}
   })
   ```

4. ### 定义多个插槽

   可以在组件的.wxml中使用多个`<slot>`标签，以不同的name来区分不同的插槽。

5. ### 使用多个插槽

   在使用**带有多个插槽的自定义组件**时，需要用**slot属性**来将节点插入到不同的`<slot>`中。

## 父子组件之间的通信

1. ### 父子组件之间通信的3种方式

   1. 属性绑定
      - 用于父组件向子组件的指定属性设置数据，仅能设置JSON兼容的数据
   2. 事件绑定
      - 用于子组件向父组件传递数据，可以传递任意数据
   3. 获取组件实例
      - 父组件还可以通过`this.selectComponent()`获取子组件实例对象
      - 这样就可以直接访问子组件的任意数据和方法

2. ### 属性绑定

   属性绑定可以实现父向子传值，而且只能传递普通类型的数据，无法将方法传递给子组件。

   子组件在properties节点中声明对应的属性并使用。

3. ### 事件绑定

   事件绑定用于实现**子组件向父传值**，可以传递任何类型的数据。

   在**父组件**的.js中，定义一个函数，这个函数**即将**通过自定义事件的形式，传递给子组件

   `syncCount(e){},`

   在**父组件**的wxml,通过自定义事件的形式，将步骤1中送一的函数引用，传递给子组件

   `<my-test5 count="{{count}}" bind:sync="syncCount"></my-test5>`

   在**子组件**的.js中，通过调用`this.triggerEvent('自定义事件名称',{/*参数对象*/})`，将数据发送到父组件

   ```js
   methods: {
      //触发自定义事件，对数值同步给父组件
      this.triggerEvent('sync', {
   ​    value: this.properties.count
      })
     }
    }
   ```

   在**父组件**的.js中，通过`e.detail`获取到子组件传递过来的数据

   ```html
   syncCount(e){
     this.setData({
      count:e.detail.value
     })
    },
   ```

4. ### 获取组件实例

   可以在父组件里调用`this.selectComponent("id或class选择器")`，获取子组件的实例对象，从而直接访问子组件的任意数据和方法。调用时需要传入一个选择器，例如`this.selectComponent(".my-component")`

   ```js
    getChild(){
     const child = this.selectComponent('#CA')
     console.log(child);
     // child.setData({
     //  count:child.properties.count + 1
     // })
     child.addCount()
    },
   ```

## behaviors

1. ### 什么是behaviors

   behaviors是小程序中，用于**实现组件间代码共享**的特性，类似于**Vue.js**中的**“mixins"(混入)**

2. ### behaviors的工作方式

   每个behavior可以包含一组**属性、数据、生命周期函数和方法**。组件引用它时，它的属性、数据和方法**会被合并到组件中**。

   每个组件可以引用多个behavior，behavior也可以引用其它behavior

3. ### 创建behavior

   调用`Behavior(Object object)` 方法即可创建一个**共享的behavior实例对象**，供所有组件使用

4. ### 导入并使用behavior

   在组件中，使用require()方法导入需要的behavior，**挂载后即可访问behavior中的数据或方法**

5. ### behavior中所有可用的节点

   |   可用的节点   |     类型     | 是否必填 |        描述        |
   | :------------: | :----------: | :------: | :----------------: |
   | **properties** |  Object Map  |    否    |    同组件的属性    |
   |    **data**    |    Object    |    否    |    同组件的数据    |
   |  **methods**   |    Object    |    否    | 同自定义组件的方法 |
   | **behaviors**  | String Array |    否    | 引入其他的behavior |
   |    created     |   Function   |    否    |    生命周期函数    |
   |    attached    |   Function   |    否    |    生命周期函数    |
   |     ready      |   Function   |    否    |    生命周期函数    |
   |     moved      |   Function   |    否    |    生命周期函数    |
   |    detached    |   Function   |    否    |    生命周期函数    |

6. ### 同名字段的覆盖和组合规则

   组件和引用的behavior中可以包含同名字段，此时可以参考一下的3种同名规则

   1. 同名的数据字段（data）
   2. 同名的属性字段（properties）或方法（methods）
   3. 同名的生命周期函数

   详细见[开发文档](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/behaviors.html##同名字段的覆盖和组合规则)

# 使用npm包

# 全局数据共享

# 分包

# 案例

# 总结