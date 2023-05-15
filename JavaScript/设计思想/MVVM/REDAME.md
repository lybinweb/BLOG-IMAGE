
> MVVM模型只是一种设计的方案与思路，它并不是设计模式，设计模式是建立在逻辑层面，设计方案是建立在设计架构层面的。

> Vue核心是视图库，只是一个视图渲染的工具，Vue是`渐进式框架`，比如`Vue-router`、`vuex`，vue的核心库只关注视图层。

- M：Model 数据保存和事件处理层 普通的JavaScript对象
- 驱动VM：ViewModel
  - view改数据，需要通过ViewModel；
  - Model的更改要驱动View视图的更新，也要通过ViewModel
- V：View 视图模板

## 随手实现MVVM

### 思路

1. `useDOM(App(), #app)`: 创建一个应用，放到根节点中去
  - `render(template, state)`: 把响应式数据state渲染到模板template上
  - `bindEvent()`: 绑定事件处理函数
2. `App()`: 返回template模板、state响应式数据、methods事件处理函数
3. `useReactive(target)`: 创建响应式数据
  - 数据响应式处理，可以通过state.a来访问target.a
  - 在更新的时候，视图可以帮我更新
  - `createReactObject(target, baseHandler)`: 用来创建一个代理数据
  - `mutaleHandler`: 返回getter跟setter函数集合【为了以后扩展，需要分开写】
    - `createGetter()`: 用来创建一个proxy.get，他有三个参数target/key/receiver，通过Reflect.get来拿到value，需要判断target[key]是否是对象，如果是则进行深度代理
      - 为什么要返回一个函数？因为在之前可能还要做很多很多事情，里边还要传递很多参数进来，需要用到createGetter|Setter作用域内部的一些变量、方法
    - `createSetter()`: 用来创建一个proxy.set，他有四个参数target/key/value/receiver
      - 需要判断target[key]是否存在：`Object.prototype.hasOwnproperty.call(target, key)`
        - 不存在：则响应式新增
        - 存在 && 需要判断新老值不相等：则响应式修改 update
4. `render()` 编译模板
  - `eventFormat(template)`: 处理template模板，将模板中的事件解析掉
  - `stateFormat(template, state)`: 处理响应式数据，将模板中的响应式数据解析掉
5. `eventFormat(template)`:
  - 匹配出事件处理函数字符串，保存DOM的标识、事件处理函数名称、事件类型到`eventPool`中，用来绑定事件处理函数
  - 替换template中的事件处理字符串为DOM标识，方便后续能找到该事件DOM元素
  - `bindEvent()`绑定事件处理函数，当template已经渲染上去后就可以绑定了
    - 找出所有的DOM元素
    - 通过eventPool中保存的DOM标识来匹配节点，从而绑定事件处理函数
      - 找到函数名：通过match来匹配`(`之前的
      - 找到函数参数：通过match来匹配`()`里边的
        - 需要判断函数参数，他的类型有可能是带引号的字符串，有可能是Number类型，有可能是布尔值
      - 最后通过`methods[函数名称](函数参数)`来执行事件处理函数
6. `stateFormat(template, state)`: 处理视图部分，替换数据
  - 匹配出整个数据的DOM节点，替换state，打标识补丁，重新组装每个DOM，将DOM标识、state的key保存到`statePool`数组中
  - 匹配出双大括号，替换整个双大括号为value值，需要注意的是双大括号里的值state可能是state.a.c 等情况，需要split分割为数组，分别处理，最后替换
7. `update()`: 在视图更新后（setter后）执行update
  - `update(statePool, key, value)`
    - 找到所有标签，遍历statePool
    - 如果statePool每一项的state[key]都跟key相等，那么就进行遍历所有标签
    - 通过DOM标识来找到需要更新的节点，更新当前DOM.innerHTML为value
