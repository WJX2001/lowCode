// TODO: 方便属性的调用 创建并暴露一个 拖拽对象 dragDomObj 这个对象存储公共属性 入口方法

const dragDomObj = {
  dragObj: null,    // 被拖拽元素
  parentObj: null,   // 被拖拽的父元素
  dragFlag: false,   // 拖拽开始的标识
  topDistance: 0,   // 被拖拽元素的top距离
  leftDistance: 0,  // 被拖拽元素的left距离
  rectOfDragObj: null, // 获取被拖拽DOM的视口边缘距离 top right bottom left


  /**
 * DOM元素拖拽函数封装
 * @param {object} dragObj 被拖拽元素
 * @param {object} parentObj 被拖拽元素的父元素
 */

  // 这里传入 parentObj 为了兼容 父元素是 document.body 和 自定义父元素两种情况

  dragDomFunc (dragObj, parentObj = document.body) {
    this.dragObj = dragObj
    this.parentObj = parentObj

    // 监听鼠标按下事件
    document.addEventListener('mousedown', event => this.mouseDownForDrag(event))

    // 监听鼠标松开事件
    document.addEventListener('mouseup', () => this.mouseUpForDrag())

    // 监听鼠标移动事件
    document.addEventListener('mousemove', event => this.mouseMoveforDrag(event))
  },

  // getBoundingClientRect 方法改写 - 当父元素不是document.body 时
  handleGetBoundingClientRect () {
    // 获取传入父元素的 DOMRect
    const parentRectObj = this.parentObj.getBoundingClientRect()

    // 创建 top/right/bottom/left 属性
    const top = parentRectObj.top
    const right = parentRectObj.right
    const bottom = parentRectObj.bottom
    const left = parentRectObj.left

    const boundingClientRectObj = {
      width: this.dragObj.offsetWidth,
      height: this.dragObj.offsetHeight,
      top,
      right,
      bottom,
      left
    }
    return boundingClientRectObj

  },


  // 鼠标按下事件
  mouseDownForDrag (event) {
    // event 不是被拖拽元素时，不作处理
    if (event.target !== this.dragObj) return
    this.dragFlag = true
    if (this.parentObj === document.body) {
      this.rectOfDragObj = this.dragObj.getBoundingClientRect()
    } else {
      // 当自定义传入父元素时，要自主构建一个DOMRect对象
      this.rectOfDragObj = this.handleGetBoundingClientRect()
    }

  },

  // 鼠标松开事件
  mouseUpForDrag () {
    this.dragFlag = false // 拖拽停止

    // 做元素定位左 上 是否溢出父元素的范围
    if (this.dragObj.style.top.split('px')[0] < 0) {
      this.dragObj.style.top = '0px'
    }

    if (this.dragObj.style.left.split('px')[0] < 0) {
      this.dragObj.style.left = '0px'
    }
  },

  // 鼠标移动事件
  mouseMoveforDrag (event) {
    // 非拖拽状态下直接返回
    if (!this.dragFlag) return

    // clientX clientY 分别代表鼠标距离屏幕可视区左上角的距离

    /**
     *  让被拖拽元素 根据鼠标当前的位置  鼠标默认位置 是在被拖拽元素的左上角 减去自身的宽高 各一半
     *  【目的】：在拖动过程中鼠标始终停留在元素的中心位置
     *  【引发的问题】：
     *      1. 停止拖动后，若 -top <= -rectOfDragObj.height/2 -left <= -rectOfDragObj.width/2 也识别超出可视区外，所以在监听鼠标松开时做判断
     *      2. 拖动过程，距离右、下距离分别为 rectOfDragObj.width/2 rectOfDragObj.height/2 时，被拖拽元素迅速定位到可视区域的宽高最大值，需要在右、上的判断中减去这部分的值
     */

    this.leftDistance = e.clientX - this.rectOfDragObj.width / 2
    this.topDistance = e.clientY - this.rectOfDragObj.height / 2


    // 处理鼠标移出屏幕可视区域的判断
    let clientWidth = this.parentObj.clientWidth  // 获取父元素的可视宽度
    let clientHeight = this.parentObj.clientHeight // 获取父元素的可视高度

    // 【下面的判断都加了 this.rectOfDragObj.width(height)/2的判断，是因为上面逻辑把鼠标的位置放到拖拽元素的中心位置】
    // 移出左边区域
    if (e.clientX - this.rectOfDragObj.width / 2 <= 0) { leftDistance = 0 }
    // 移出上边区域
    if (e.clientY - this.rectOfDragObj.height / 2 <= 0) { topDistance = 0 }
    // 移出右边区域
    if (e.clientX + this.rectOfDragObj.width - this.rectOfDragObj.width / 2 > clientWidth) {
      leftDistance = clientWidth - this.rectOfDragObj.width
    }
    // 移出下边区域
    if (e.clientY + this.rectOfDragObj.height - this.rectOfDragObj.height / 2 > clientHeight) {
      topDistance = clientHeight - this.rectOfDragObj.height
    }

    // 改变元素定位
    this.dragObj.style.top = `${topDistance}px`
    this.dragObj.style.left = `${leftDistance}px`
  },

}


