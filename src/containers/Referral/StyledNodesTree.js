import React from 'react';
import Tree from 'react-d3-tree';
import './custom-tree.css';

// ...
const data = {
    name: 'CEO',
    children: [
      {
        name: 'Manager',
        attributes: {
          department: 'Production',
        },
        
        
        children: [
          {
            name: 'Foreman',
            attributes: {
              department: 'Fabrication',
            },
            children: [
              {
                name: 'Worker',
              },
            ],
          },
          {
            name: 'Foreman',
            attributes: {
              department: 'Assembly',
            },
            children: [
              {
                name: 'Worker',
              },
            ],
          },
        ],
      },
      {
        name: 'Foreman',
        attributes: {
          department: 'Assembly',
        },
        children: [
          {
            name: 'Worker',
          },
        ],
      },
       {
        name: 'Foreman',
        attributes: {
          department: 'Assembly',
        },
        children: [
          {
            name: 'Worker',
          },
        ],
      }
    ],
  };

export default function StyledNodesTree() {
    const straightPathFunc = (linkDatum, orientation) => {
        const { source, target } = linkDatum;
        return orientation === 'horizontal'
          ? `M${source.y},${source.x}L${target.y},${target.x}`
          : `M${source.x},${source.y}L${target.x},${target.y}`;
      };
  return (
    <div id="treeWrapper" style={{ width: '50em', height: '20em' }}>
      <Tree
        data={data}
        pathFunc={straightPathFunc}
        // rootNodeClassName="node__root"
        // branchNodeClassName="node__branch"
        // leafNodeClassName="node__leaf"
      />
    </div>
  );
}