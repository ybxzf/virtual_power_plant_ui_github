## 开发

```bash
# 克隆项目

# 进入项目目录
cd ui

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npmmirror.com

# 启动服务
npm run dev
```

浏览器访问 http://localhost:80

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```


## 统一命名规范
- 文件名首字母大写，采用大驼峰式命名
- 文件夹首字母小写，采用小驼峰式命名
- 文件中如果存在`index.vue`，不做任何修改,就采用`index.vue`的命名方式
- 公共工具方法抽取到`utils`文件夹下的`tools.js`文件中
- 公共常量抽取到`utils`文件夹下的`constants.js`文件中
- `class`的命名使用`-`隔离, 例如`user-info`;
- 一个功能模块建立一个文件夹，文件夹下使用`index.vue`作为入口文件,`components`文件夹下存放公共组件
- 每个业务功能模块下的常量都需要提取到当前功能模块下的```const```文件中。

## 统一代码风格
- 每个组件需要自定义自身的 root 元素的样式，以避免全局样式污染
- 每个组件必须保持单一功能原则
- 每个组件必须含有```name```属性
- 代码采用 prettier 进行格式化
- 代码中不要出现`console.log`，`debugger`等调试代码
- 代码中不要出现`alert`，`confirm`等弹窗代码
- 定义方法需要见名知意，例如`getUserInfo`方法，不要写成`getUser`方法，如果不能见名知意，请添加注释
```js
/**
 * @description 方法描述
 * @param {类型} 参数名
 * @returns {类型} 返回值
 */
function xxx() {
  // xxx
}
```
- 推荐使用`that`来保存`this`的引用，例如`const that = this;`
- 推荐使用`const`来定义常量，例如`const MAX_COUNT = 10;`
- 代码中不要出现`var`关键字，推荐使用`let`和`const`关键字
- 代码中不允许出现魔鬼数字，例如`if (count === 10) {}`，应该使用常量来代替
- 代码中不允许出现魔法字符串，例如`if (status === 'success') {}`，应该使用常量来代替
- 代码应该简洁易读
- `if`判断和`for`循环嵌套不要超过3层
- 缩进使⽤ 2 个空格（⼀个 tab）
- 尽量不要手动操作 DOM，推荐使用`vue`的`v-model`指令
- 超过两个文件都存在的模块，抽成公共组件，但是需要注意组件的命名规范
- 必须为 `v-for` 设置键值 key

## 样式规范
- 类名使⽤⼩写字⺟，以中划线分隔，例如`user-info`
- `id` 采⽤驼峰式命名
- 样式类名中不要出现数字，例如`user-info-1`，应该使用`user-info-1`来代替
- 使用`scoped`属性，避免样式污染
- 使用`flex`布局，避免使用`float`布局
- 尽量不要使用`!important`，如果必须使用，请添加注释说明原因
- 尽量不要在元素的style属性中书写样式，使用选择器来定义样式
- scss嵌套不要太深，不要超过3层
- 避免使⽤ID选择器及全局标签选择器防⽌污染全局样式

##  代码提交规则
```js
type(scope) : subject
```
1. type（必须） : commit 的类别，只允许使用下面几个标识：
- feat : 新功能
- fix : 修复bug
- docs : 文档改变
- style : 代码格式改变
- refactor : 某个已有功能重构
- perf : 性能优化
- test : 增加测试
- build : 改变了build工具 如 grunt换成了 npm
- revert : 撤销上一次的 commit
- chore : 构建过程或辅助工具的变动
2. scope（可选） : 用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。
3. subject（必须） : commit 的简短描述，不超过50个字符。

## 一些公共模块
- `UI`：Element UI,主要参考[默认主题]('https://element.eleme.cn/#/zh-CN/theme/preview')
- `API`：axios
- `路由`：vue-router
- `状态管理`：vuex
- `时间工具`: 'moment'
- `工具方法`: lodash
- `header组件`: 已封装至@/components/layout/header路径下，可以直接使用
- `图表组件`: 基础图表部分已封装至@/components/chart路径下，可以直接使用，后续也可以根据需求进行扩展