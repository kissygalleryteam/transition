## 综述

Transition 是一个利用 3D Transform 实现 slide, flip, fade 等页面切换时的动画特效的组件，设计的理念是 Mobile First 以及高性能。因此，**只支持现代浏览器，不兼容低版本的 IE**

## 初始化组件

```
S.use('kg/transition/1.0.0/index', function (S, Transition) {
    var transition = new Transition();
});
```

## API说明
可以参见 [demo](../demo/index.html) 里的例子。注：demo 里绑定了 Kissy 提供的 `tap` 事件（Mobile first），建议在手机端，或 chrome 模拟手机使用

具体的使用方法如下  

在使用前需要在要切换的 view 上加上特定的 class：每个 view 都需要添加 `mb-anim-view`，当前处于视口内可见的 view 还需要添加 `mb-anim-view-active` class

```
var transition = new transition();
transition.transition({
    transition: 'slip',         // 过渡动画类型
    fromView: '#frontView',     // 起始 view 的 selector
    toView: '#backView',        // 动画过渡到的目标 view 的 selector
    container: '.viewContainer',// view 的 container。只有 transition 为 flip 时需要指定
    reverse: false              // 是否倒退演示动画效果
});

// shorthand for slide/flip/fade
transition.slide({
    fromView: '#leftView',
    toView: '#rightView'
});
```

## Build
由于使用 3D transform 来实现动画效果，有不满意的或者想要参与进来做贡献的，可以修改 src/stylus 下的文件，然后重新 build

```
gulp css

// or
gulp  // == gulp css + gulp js
```
