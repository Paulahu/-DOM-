//新增节点
const div1 = dom.create('<div>hello</div>')
dom.after(test1, div1)

//新增儿子
const div2 = dom.create('<div>world</div>')
dom.append(div1, div2)

//清除后代
dom.empty(test3)

//查找属性
dom.attr(test1, 'title', '我是一个标题')
const div3 = dom.attr(test1, 'title')
console.log(`title: ${div3}`)

//写入内容
dom.text(test2, '我是一段文字<div>div标签不会被解析</div>')

//写入HTML内容
dom.html(test4, '我还是文字<div>div标签会被解析</div>')

//写样式
dom.style(test1, {
    backgroundColor: 'red',
    opacity: '0.2',
    color: 'pink'
})

//添加一个类
dom.class.add(test1, 'red')

//查找元素
const testDiv = dom.find('#test2')
console.log(testDiv)

//查找兄弟元素
console.log(dom.siblings(testDiv))

//遍历所有子节点
const children = dom.find('#test5')
console.log(dom.each(dom.children(children), (n) => console.log(n)))

//获取元素序号
console.log(dom.index(children))