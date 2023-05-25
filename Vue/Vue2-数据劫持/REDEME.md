
## Vue2数据劫持

### 思路

1. new Vue(options)
2. 处理options.data，进行数据劫持
3. data执行后，才会返回一个数据对象（data也可以是个对象，但是不推荐这样做）
4. 主程序入口 f Vue () {}
5. f _init () {} 挂载到了Vue原型上 作为初始化程序
   - 主要进行初始化很多事，选项相关的都需要初始化，比如data、computed、watch等
   1. 保存this到vm，后续用vm代替Vue实例化对象
   2. 在实例上挂载$options
   3. 初始化数据，将实例带入 -> initState(vm)
      - 数据劫持：在赋值、获取数据时还要做别的事，如视图也要改变，数据变化的时候视图也要变更，那么就需要数据拦截
      - 分门别类进行初始化数据，比如data、computed、watch等
      1. 处理data数据： initData(vm) 如果data存在，则进行初始化
         - 从options拿到data，判断data是对象或者是函数，从而取data数据（注意，如果是函数时，需要注意this指向）
         - 保存data，将data挂载到vm上
         - 对vm._data 做代理（当访问vm.title就代理到vm._data.title）
         - 对data进行循环，代理每一项：proxyData(vm, '_data', key)
           - 使用Object.defineProperty进行数据代理
         - 观察data（观察数据）：observe(vm._data)
           - 如果不是对象则不观察
           - 否则则观察则进行拦截：return new Observer(data) 【多了一层observe，因为在第一层observe中我们要排除不观察的条件，比如data不是对象或者是null，我们就可以不进行观察】

6. f Observer (data) {}: 
  - 区分对象或者数组，因为Object.defineProperty是不对数组进行拦截的
  1. data如果是数组
     - 对更改原数组的方法进行重写，这一系列方法都会对数据变更，内部可能增加、删除一些东西；操作数组后，更改原数组的这个过程当中，视图是有可能更改的，那么就必须要做视图更新，还有别的一系列操作。新增的这一项，是否需要观察他
     - 将更改源数组的方法保存到配置中：ARR_METHODS
     - 将Array.prototype所有的方法保存到新的引用：originArrMethods
     - arrMethods：重写数组方法希望他是一个新的对象，那么我们需要创建一个对象利用Object.create, 并且指定他的原型为数组原型originArrMethods
     - 遍历保存的数组方法集合，在arrMethods中重写对应的数组方法
       - 数组参数是不定的，需要保存实参列表
       - 执行原数组方法，才能达到更改数据，用apply，谁调用指向谁
       - 当原数组方法执行完毕后，还需要干别的事：
         - 当数组方法是push、unshift、splice时，会在数组中新增项的
         - 那么就需要保存新增项（可能是对象或数组），从而继续观察他：observeArr(newArr)
           - 遍历newArr，继续观察observe()
     1. 设置data的原型为： arrMethods，那么操作data数据的数组方法，就用到了我们自己重写的数组方法，从而观察数据，更新视图
     2. 如果data是数组？递归观察data：observeArr(data)
  2. data如果是对象
     - Observer原型方法：walk，观察对象
       - 拿出data的key、value，遍历每一项进行拦截操作：defineReactiveData(data, key, value)
         - 注意：这里的value还可能是对象获数组，那么需要递归观察：observe(value)
         - Object.defineProperty进行数据代理
           - 在set的时候，需要注意newValue可能是对象数组，那么需要递归观察：observe(newValue)


### 源码地址

