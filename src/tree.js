import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import { selectedNodeById } from './helper';
// import merge from 'deepmerge';

import 'ztree/css/metroStyle/metroStyle.css';

if (!window.jQuery && !window.$) {
  window.jQuery = window.$ = $;
}

// need 'window.jQuery', can not use 'import'
require('ztree');


export default class Ztree extends React.Component {

  constructor(props) {
    super(props);

    this.hanldeRenderTree = this.hanldeRenderTree.bind(this);
    this.handleDestroyTree = this.handleDestroyTree.bind(this);
    this.hanldeGetTreeRef = this.hanldeGetTreeRef.bind(this);
    this.handleCheckChange = this.handleCheckChange.bind(this);

    // this.setting = props.setting || defaultSetting;
    this.setting = $.extend(true, {}, defaultSetting, props.setting);
    // 接收除 callback 外的所有字段 setting 字段
    this.setting.callback = {
      onCheck: this.handleCheckChange,
    };
  }

  componentDidMount() {
    this.hanldeRenderTree();
  }

  componentWillReceiveProps(nextProps) {
    // 比较 nextProps 和 props 再重新渲染
    this.hanldeRenderTree();
  }

  componentWillUnmount() {
    this.handleDestroyTree();
  }

  render() {
    return (
      <div className="react-ztree-container">
        <h1>hello ztree</h1>
        <div className="ztree" ref={this.hanldeGetTreeRef}></div>
      </div>
    );
  }

  hanldeRenderTree() {
    this.tree = $.fn.zTree.init(this.$elem, this.setting, this.props.nodes);
  }

  handleDestroyTree() {
    if (this.tree) {
      this.tree.destroy();
    }
  }

  hanldeGetTreeRef(elem) {
    this.elem = elem;
    this.$elem = window.jQuery(elem);
  }

  handleCheckChange(event, treeId, treeNode) {
    // let args = Array.prototype.slice.call(arguments);
    let currentNodes = this.tree.transformToArray(
      this.tree.getNodes()
    );
    
    // 返回选中的所有节点，不管是 disabled checked 还是半选的都返回
    currentNodes = currentNodes.filter(t => {
      return t.checked;
    });
    if (this.props.onCheckChange) {
      this.props.onCheckChange(currentNodes, event, treeId, treeNode);
    }
  }
}

const defaultSetting = {
  check: {
    enable: true
  },
  view: {
    showIcon: false,
  },
  data: {
    simpleData: {
      enable: true,
      idKey: 'id',
    }
  },
  callback: {

  }
  // callback: {
  //   onCheck: function (event, treeId, treeNode) {
  //     // treeObj = treeObj || $.fn.zTree.getZTreeObj($elem);
  //     // let currentNodes = treeObj.getCheckedNodes();
  //     let currentNodes = treeObj.transformToArray(treeObj.getNodes());
      
  //     // 返回选中的所有节点，不管是 disabled checked 还是半选的都返回
  //     currentNodes = currentNodes.filter(t => {
  //       return t.checked;
  //     });
      
  //     $scope.$apply(() => {
  //       $scope.model = currentNodes;
  //     });
  //     changeCallback(currentNodes, event, treeId, treeNode);
  //   }
  // }
};

const TreeNodeProps = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        children: TreeNodeProps
      })
    )
  })
).isRequired;

const SettingProps = PropTypes.shape({

});


Ztree.propTypes = {
  onCheckChange: PropTypes.func,
  nodes: TreeNodeProps,
};

Ztree.selectedNodeById = selectedNodeById;

