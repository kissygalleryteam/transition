## 综述

Transition 是一个利用 3D Transform 实现 slide, flip, fade 等页面切换时的动画特效的组件，设计的理念是 Mobile First 以及高性能。因此，**只支持现代浏览器，不兼容低版本的 IE**

## 初始化组件

```
S.use('kg/transition/1.0.0/index', function (S, Transition) {
    var transition = new Transition();
});
```

## API说明
可以参见 [http://gallery.kissyui.com/transition/1.2.0/demo/index.html](../demo/index.html) 里的例子。注：手机端使用建议使用 `tap` 事件，`click` 事件会有延迟造成手机页面的不流畅

具体的使用方法如下  

在使用前需要在要切换的 view 上加上特定的 class：每个 view 都需要添加 `mb-anim-view`，当前处于视口内可见的 view 还需要添加 `mb-anim-view-active` class

```
var transition = new Transition();
transition.transition({
    transition: 'slip',         // 可选，过渡动画类型，默认 slide，现在一共有 slide/fade/flip/cover/fold 几个动画效果
    fromView: '#frontView',     // 起始 view 的 selector
    toView: '#backView',        // 动画过渡到的目标 view 的 selector
    container: '.viewContainer',// 可选，view 的 container。只有 transition 为 flip 时需要指定
    reverse: false,             // 可选，是否倒退演示动画效果
    showToViewDelay: false      // 可选，等到 fromView 的动画结束后再执行 toView 的动画
});
```

## Build
由于使用 3D transform 来实现动画效果，有不满意的或者想要参与进来做贡献的，可以修改、增加 src/stylus/component 下对应的的 stylus 文件，然后重新 build。class 的命名方式参考已有的组件，通常的命名规则如下: 

```
.mb-mod
.mb-mod.in
.mb-mod.in.reverse
.mb-mod.out
.mb-mod.out.reverse
```

在js调用时将 transition 属性指定为新增的组件即可：`transtion({transition: 'your_mod_name', otherArgs...})`

```
gulp css

// or
gulp  // == gulp css + gulp js
```
