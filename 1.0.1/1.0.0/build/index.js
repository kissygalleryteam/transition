/**
 * 利用 3D Transform 实现 slide, flip, fade 等动画过渡特效
 * @author samuel.fy@alibaba-inc.com
 */
KISSY.add(function (S, DOM, Event) {

  var animationEndEventName = getVendorPrefix() === '-webkit-' ? 'webkitAnimationEnd' : 'animationend';

  function Transition() {
    if (!(this instanceof Transition)) {
      return new Transition();
    }
    
    // To check if animation is executing
    this.isTransitioning = false;
  }

  S.augment(Transition, Event.Target);
  S.augment(Transition, {
    /**
     * Animation transition from one state to another
     * @param option
     * option.transition - transition type: slide, fade or flip
     * option.fromView
     * option.toView
     * option.reverse - just animate back
     * option.container - optional. It just takes effect when using flip animation
     */
    transition: function(option) {
      var self = this;

      // Discard new animation if there's someone executing
      if (this.isTransitioning) { return; }
      
      var transitionType = self.transitionType = option.transition;
      var container = option.container && DOM.get(option.container);
      var fromView = DOM.get(option.fromView);
      var toView = DOM.get(option.toView);
      var reverse = !!option.reverse;
      
      // animation css class
      var viewActiveCls = 'mb-anim-view-active';
      
      this.isTransitioning = true;
      
      if (transitionType === 'flip' && container) {
        DOM.addClass(container, 'mb-flip-container');
      }
      
      // Add animation class to use css3 animation
      if (reverse) {
        setTimeout(function() {
          addClasses(fromView, [getTransformCls('in', reverse), viewActiveCls]);
          addClasses(toView, getTransformCls('out', reverse));
        }, 0);
      } else {
        setTimeout(function() {
          addClasses(fromView, getTransformCls('out', reverse));
          addClasses(toView, [getTransformCls('in', reverse), viewActiveCls]);
        }, 0);
      }

      // Animation end
      Event.on(fromView, animationEndEventName, function(e) {
        if (transitionType === 'flip' && container) {
          DOM.removeClass(container, 'mb-flip-container');
        }
        
        // Clear the added animation classes
        if (reverse) {
          removeClasses(fromView, [getTransformCls('in', reverse)]);
          removeClasses(toView, [getTransformCls('out', reverse), viewActiveCls]);
        } else {
          removeClasses(fromView, [getTransformCls('out', reverse), viewActiveCls]);
          removeClasses(toView, [getTransformCls('in', reverse)]);
        }
        
        Event.detach(fromView, animationEndEventName);
        window.scrollTo(0, 0);
        self.isTransitioning = false;
        self.fire(transitionType + 'End');
      });


      function getTransformCls(type, reverse) {
        return 'mb-' + self.transitionType + ' ' + type + (reverse ? ' reverse' : '');
      }
    },

    /**
     * Shorthand function for transition({transition: 'slide', ...})
     * @param option
     */
    slide: function(option) {
      option.transition = 'slide';
      this.transition(option);
    },

    fade: function(option) {
      option.transition = 'fade';
      this.transition(option);
    },

    flip: function(option) {
      option.transition = 'flip';
      this.transition(option);
    }
    
  });

  function getVendorPrefix() {
    var t;
    var el = document.createElement('fake');
    var transitions = {
      'WebkitTransition': '-webkit-',
      'transition': '-ms-',
      'OTransition': '-o-',
      'MozTransition': '-moz-'
    };

    for (t in transitions) {
      if (el.style[t] !== undefined) {
        return transitions[t];
      }
    }

    return '';
  }

  function addClasses(ele, clsArr) {
    if (typeof clsArr === 'string') { clsArr = [clsArr]; }
    DOM.addClass(ele, clsArr.join(' '));
  }

  function removeClasses(ele, clsArr) {
    if (typeof clsArr === 'string') { clsArr = [clsArr]; }
    DOM.removeClass(ele, clsArr.join(' '));
  }
  
  return Transition;
}, {
  requires: [
    'dom', 'event'
  ]
});