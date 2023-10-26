import ReactFlow, { Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';
import requirements from './templete'

const nodes = [
  { id: 'node-1', data: { label: 'Node 1', tooltip: 'This is Node 1' }, position: { x: 100, y: 100 } },
  { id: 'node-2', data: { label: 'Node 2', tooltip: 'This is Node 2' }, position: { x: 200, y: 200 } },
  // Add more nodes with tooltips as needed
];
function generateNodesFromNames(nodeNames) {
  return nodeNames.map((nodeName, index) => {
    return {
      id: `node-${index}`,
      data: { label: nodeName, tooltip:"Hello" },
      position: { x: 100 * index, y: 100 * index}, // Adjust the position as needed
    };
  });
}

function Flow() {

  const requirementIdentifiers = requirements.map(requirement => requirement['requirements Identifier']);
  const nodesArray = generateNodesFromNames(requirementIdentifiers);
  const nodeElements = nodesArray.map((node) => ({
    id: node.id,
    data: node.data,
    position: node.position,
  }));

  return (
    <div style={{ width: '100%', height: '500px' }}>
      <ReactFlow nodes={nodeElements}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Flow;
