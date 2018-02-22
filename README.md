# react-ztree

A react component wrapper of 'ztree' for large data tree component.

## webpack loader configure

- css
- png/jpg

## component props

| 组件 props  | 说明 |
| ------------- | ------------- |
| onCheckChange |树节点变更触发的事件|
| nodes | 节点数据模型, 变更该属性会重新渲染节点数据 |


| nodes | 结构 - 数组类型 |
| ---- | ---- |
| id |节点 ID|
| name |节点显示的文字 |
| children | 子节点 [{id, name}] |
