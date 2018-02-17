/**
 * 勾选数据
 * @param {Array} idArray - 要选择的树节点 ID
 * @param {Object} treeNodes - 要选择的树节点数据 [ { id, name, children: [{id, name, children}] } ]
 */
export function selectedNodeById(idArray, treeNodes) {
  if (Array.isArray(treeNodes)) {
    for (let i = 0; i < treeNodes.length; i++) {
      let t = treeNodes[i];

      if (idArray.indexOf(t.id) > -1) {
        t.checked = true;
      }
      
      if (t.children && t.children.length > 0) {
        return selectedNodeById(idArray, t.children);
      }
    }
  }
}