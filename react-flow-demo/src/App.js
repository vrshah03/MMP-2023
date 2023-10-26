import { useCallback, useState } from 'react';
import ReactFlow, { Controls, Background, applyEdgeChanges, applyNodeChanges } from 'reactflow';
import 'reactflow/dist/style.css';
import requirements from './templete'
import {edgeList,nodeElements} from './node-edge-Maker'

function Flow() {
  
  const [nodes, setNodes] = useState(nodeElements);
  const [edges, setEdges] = useState(edgeList);

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
