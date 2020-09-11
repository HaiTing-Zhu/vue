import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

// 构造函数
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  // 初始化
  this._init(options)
}

// 定义实例的属性和方法
initMixin(Vue) // 实现init
stateMixin(Vue) // $data,$props,$watch
eventsMixin(Vue) // $on,$once,$off,$emit
lifecycleMixin(Vue) // _update,$forceUpdate,$destroy
renderMixin(Vue) // $nextTick,_render

export default Vue
