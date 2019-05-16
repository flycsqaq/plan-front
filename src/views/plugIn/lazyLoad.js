// 自动移除监听事件，
// 如何数据驱动
// addListener, addInterval, start
// demo: const lazy = new Lazy({}) lazy.addListener({}).addInterval({}).start()
export default class Lazy {
  constructor({ parent = document, search = 'lazy-load', extend = 10 }) {
    this.elements = []
    this.listeners = []
    // { name, fn, num, lastValue: fn() }
    this.judgEvent = []
    this.parent = parent
    this.search = search
    this.extend = extend
    this.time = {
      id: -1,
      num: 0
    }
    this.lazyNum = 0
    this.judgeMethod = 'or'
    this.district = {
      lastX: window.scrollX,
      lastY: window.scrollY,
      width: window.innerWidth,
      height: window.innerHeight
    }
    this.fn = this.update.bind(this, {})
  }
  // 开始工作
  setUp() {
    const { district } = this
    district.lastX = window.scrollX
    district.lastY = window.scrollY
    district.width = window.innerWidth
    district.height = window.innerHeight
    this.popularElements()
  }
  // 获取dom节点
  popularElements() {
    this.elements = []
    this.parent.querySelectorAll(`[${this.search}]`).forEach(this.addElement, this)
  }
  // 添加节点与其他的信息
  addElement(el) {
    const { search, district } = this
    if (!(el.attributes[search] && el.attributes[search].value)) {
      // console.log(`${el} dont have ${search}`);
      return
    }
    const { top, bottom, left, right } = el.getBoundingClientRect()
    const { lastX, lastY } = district
    // 因为启动懒加载的scroll不一定在0点，因此需要获取绝对坐标。
    const location = {
      top: top + lastY,
      bottom: bottom + lastY,
      left: left + lastX,
      right: right + lastX
    }
    const o = { el, location, isLoad: false }
    this.elements.push(o)
    this.loadImages(o)
    this.lazyNum++
  }

  loadImages(o) {
    const { location, el } = o
    if (!o.isLoad) {
      if (this.judge(location)) {
        const { search } = this
        if (el.attributes[search] && el.attributes[search].value) {
          el.src = el.attributes[search].value
          el.attributes.removeNamedItem(search)
          o.isLoad = true
          this.lazyNum--
          // 加载完毕，移除监听事件
          if (this.lazyNum === 0) {
            this.destory()
          }
        }
      }
    }
  }
  // 更新scroll值
  update({ x = window.scrollX, y = window.scrollY }) {
    this.district.lastX = x
    this.district.lastY = y
    if (this.updateJudge() === false) {
      return
    }
    if (this.lazyNum > 0) {
      this.elements.forEach(this.loadImages, this)
    }
  }
  updateJudge() {
    const { judgEvent, judgeMethod, time } = this
    if (judgEvent.length === 0) {
      return true
    }
    let passCount = 0
    let current = 0
    const iterator = this.judgEvent.values()
    // 通过判断的更新数值，未通过判断的不更新
    if (time.id > -1) {
      clearTimeout(this.timeId)
      time.id = -1
    }
    for (var judge of iterator) {
      current = judge.fn()
      if (Math.abs(judge.lastValue - current) >= judge.num) {
        passCount++
        judge.lastValue = current
      }
    }
    if (judgeMethod === 'or' && passCount > 0) {
      return true
    }
    if (judgeMethod === 'and' && passCount === judgEvent.length) {
      return true
    }
    if (time.id === -1) {
      this.timeId = setTimeout(this.fn, this.time.num)
    }
    return false
  }
  // 添加监听事件
  addListener({ el = document, event = 'scroll' }) {
    this.listeners.push({ el, event, isWork: false })
    return this
  }
  // 开始监听
  startListen(o) {
    const { el, event } = o
    if (!o.isWork) {
      el.addEventListener(event, this.fn)
      o.isWork = true
    }
  }
  // 结束监听
  finishListen(o) {
    const { el, event } = o
    if (o.isWork) {
      el.removeEventListener(event, this.fn)
      o.isWork = false
    }
  }
  // 添加判断事件
  addJudgeEvent({ name = 'time', fn = () => new Date(), num = 2000 }) {
    this.judgEvent.push({ name, fn, num, lastValue: fn() })
    if (this.name === 'time') {
      this.time.num = num
    }
    return this
  }
  // 启动
  start(method = 'or') {
    this.judgeMethod = method
    this.setUp()
    if (this.listeners.length === 0) {
      this.addListener({})
    }
    this.listeners.forEach(this.startListen, this)
  }
  // 销毁
  destory() {
    this.listeners.forEach(this.finishListen, this)
  }
  // 判断dom节点是否在页面中
  judge(location) {
    const { district, extend } = this
    const { lastX, width, lastY, height } = district
    const { left, right, top, bottom } = location
    return right >= lastX - extend && left <= lastX + width + extend && bottom >= lastY - extend && top <= lastY + height + extend
  }
}
