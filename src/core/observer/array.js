/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

import { def } from '../util/index'

// 拿到数组原型并复制
const arrayProto = Array.prototype
export const arrayMethods = Object.create(arrayProto)

// 数组7个变更方法，会改变数组本身
const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  // 缓存原始方法
  const original = arrayProto[method]
  // 覆盖
  def(arrayMethods, method, function mutator (...args) {
    // 执行原始方法
    const result = original.apply(this, args)
    // 扩展：变更通知获取ob
    const ob = this.__ob__
    let inserted
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    // 有新成员加入，对新成员做数据响应式处理
    if (inserted) ob.observeArray(inserted)
    // notify change
    // 当数组里的项发生变化，大管家负责通知数组更新
    ob.dep.notify()
    return result
  })
})
