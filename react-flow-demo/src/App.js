import { useCallback, useState } from 'react';
import ReactFlow, { Controls, Background, applyEdgeChanges, applyNodeChanges } from 'reactflow';
import 'reactflow/dist/style.css';
import requirements from './templete'
import {edgeList,IntermidiateNodes} from './edgeMaker'

const colors = ["",'#FF8080', '#FFD080', '#A8E9FF',"#ECFEEC"];


const edgesArray =  edgeList;

function generateNodesFromNames(nodeProperties) {
  return nodeProperties.map((node, index) => {
    return {
      id: node['requirements Identifier'],
      data: { label: node['requirements text']},
      background:  colors[node['Priority']] ,
      position: { x: Math.random() * 500,
                  y: Math.random() * 500, }, // Adjust the position as needed
    };
  });
}

function Flow() {

  const nodesArray = generateNodesFromNames(requirements);
  const nodeElements = nodesArray.map((node) => ({
    id: node.id,
    data: { label: node.data.label },
    style: { background: node.background },
    position: node.position,
  }));

  nodeElements.push(...IntermidiateNodes);

  const [nodes, setNodes] = useState(nodeElements);
  const [edges, setEdges] = useState(edgesArray);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  return (
    <div style={{ width: '100%', height: '500px' }}>
      <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange} fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Flow;
