import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { State, Store} from '@sambego/storybook-state';

import Ztree from '../src/index';

const d = getMockRegionData();

storiesOf('Ztree', module)
  .add('ztree default', () => {
    return (
      <Ztree nodes={d} />
    );
  })

  .add('ztree select event', () => {
    const handleCheckedChange = (selectedNodes) => {
      action('Check change')(selectedNodes);
      store.set({
        nodes: selectedNodes,
      });
    };
    const store = new Store({
      nodes: [],
    });

    return (
      <div>
        <Ztree nodes={d} onCheckChange={handleCheckedChange} />
        <State store={store}>
          <SelectedNodes />
        </State>
      </div>
    );
  })

  .add('ztree init default selected', () => {
    const defaultSelectedIdArray = 'country-0,country-0-region-0,country-0-region-0-city-3'.split(',');

    let dCopy = d.map(t => {
      let obj = {};
      Object.assign(obj, t);
      return t;
    })
    Ztree.selectedNodeById(
      defaultSelectedIdArray,
      dCopy
    );

    const handleCheckedChange = (selectedNodes) => {
      action('Check change')(selectedNodes);
      store.set({
        nodes: selectedNodes,
      });
    };
    const store = new Store({
      nodes: [],
    });

    return (
      <div>
        <p>默认选择的ID: country-0,country-0-region-0,country-0-region-0-city-3</p>
        <Ztree nodes={dCopy} onCheckChange={handleCheckedChange} />
      </div>
    );
  });


function getMockRegionData() {
  let d = [];
  for (let i = 0; i < 10; i++) {
    d.push({
      id: `country-${i}`,
      name: `country-${i}`,
      pId: null,
      children: [],
    });
  }
  d.forEach(t => {
    for (let i = 0; i < 30; i++) {
      t.children.push({
        id: `${t.id}-region-${i}`,
        name: `region-${i}`,
        pId: t.id,
        children: [],
      })
    }
  });
  d.forEach(t => {
    t.children.forEach(k => {
      for (let i = 0; i < 20; i++) {
        k.children.push({
          id: `${k.id}-city-${i}`,
          name: `city-${i}`,
          pId: k.id,
          children: null,
        })
      }
    })
  });

  return d;
}

const SelectedNodes = ({ nodes }) => {
  return (
    <div>
      <ul>
        {
          nodes.map(t => {
            return (
              <li>
                Node - 
                id: {t.id} - 
                name: {t.name} - 
                halfCheck: {t.isHalfCheck ? 'ture' : 'false'} -
                isParent: {t.isParent ? 'true' : 'false'} -
                level: {t.level}
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};