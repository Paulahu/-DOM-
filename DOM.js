window.dom = { //封装一个对象
    create(string) { //用于创建节点
        const container = document.createElement("template");
        container.innerHTML = string.trim();
        return container.content.firstChild;
    },
    after(node, node2) { //用于新增弟弟
        node.parentNode.insertBefore(node2, node.nextSibling);
    },
    before(node, node2) { //用于新增哥哥
        node.parentNode.insertBefore(node2, node);
    },
    append(parent, node) { //用于新增儿子
        parent.appendChild(node)
    },
    wrap(node, parent) { //用于新增爸爸
        dom.before(node, parent)
        dom.append(parent, node)
    },
    remove(node) { //用于删除节点
        node.parentNode.removeChild(node)
        return node
    },
    empty(node) { //用于删除后代
        const array = []
        let temp = node.firstChild
        while (temp) {
            array.push(dom.remove(node.firstChild))
            temp = node.firstChild
        }
        return array
    },
    attr(node, name, value) { // 重载（根据参数个数写不同的代码）
        if (arguments.length === 3) { //长度为3就设置属性
            node.setAttribute(name, value)
        } else if (arguments.length === 2) { //长度为2就读属性
            return node.getAttribute(name)
        }
    },
    text(node, string) { //写入文本内容
        if (arguments.length === 2) {
            if ('innerText' in node) {
                node.innerText = string
            } else {
                node.textContent = string
            }
        } else if (arguments.length === 1) {
            if ('innerText' in node) {
                return node.innerText
            } else {
                return node.textContent
            }
        }
    },
    html(node, string) { //写入HTML内容
        if (arguments.length === 2) {
            node.innerHTML = string
        } else if (arguments.length === 1) {
            return node.innerHTML
        }
    },
    style(node, name, value) {
        if (arguments.length === 3) { //写入样式
            // dom.style(div, 'color', 'red')
            node.style[name] = value
        } else if (arguments.length === 2) {
            if (typeof name === '') { //如果name的类型是字符串，读样式
                // dom.style(div, 'color')
                return node.style[name]
            } else if (name instanceof Object) { //如果name是object的实例，写一组样式
                // dom.style(div, {color: 'red'})
                const object = name
                for (let key in object) {
                    node.style[key] = object[key]
                }
            }
        }
    },
    class: { //定义一个class类
        add(node, className) { //添加一个类
            node.classList.add(className)
        },
        remove(node, className) { //删除一个类
            node.classList.remove(className)
        },
        has(node, className) { //检查是否有一个类
            return node.classList.contains(className)
        }
    },
    on(node, eventName, fn) { //添加监听事件
        node.addEventListener(eventName, fn)
    },
    off(node, eventName, fn) { //移除监听事件
        node.removeEventListener(eventName, fn)
    },
    find(selector, scope) { //用于获取标签或标签们,scope是查找范围，确定在哪里找,比如有两个div有同一个class 
        return (scope || document).querySelector(selector)
    },
    parent(node) { //用于获取父元素
        return node.parentNode
    },
    children(node) { //用于获取子元素
        return node.children
    },
    siblings(node) { //用于获取兄弟元素
        return Array.from(node.parentNode.children)
            .filter(n => n !== node)
    },
    next(node) { //用于获取弟弟元素   
        let x = node.nextSibling
        while (x && x.nodeType === 3) { //包装下一个元素是element
            x = x.nextSibling
        }
        return x
    },
    previous(node) { //用于获取哥哥元素
        let x = node.previousSibling
        while (x && x.nodeType === 3) {
            x = x.previousSibling
        }
        return x
    },
    each(nodeList, fn) { //用于遍历所有节点
        for (let i = 0; i < nodeList.length; i++) {
            fn.call(null, nodeList[i])
        }
    },
    index(node) { //用于获取排行老几
        const list = dom.children(node.parentNode)
        let i
        for (i = 0; i < list.length; i++) {
            if (list[i] === node) {
                break
            }
        }
        return i
    }
};