import ReactFlow, { Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';
import requirements from './templete'


const colors = ["",'#FF8080', '#FFD080', '#A8E9FF',"#ECFEEC"];

const nodes = [
  { id: 'node-1', data: { label: 'Node 1',color: 'lightblue' }, position: { x: 100, y: 100 } },
  { id: 'node-2', data: { label: 'Node 2',color: 'lightblue' }, position: { x: 200, y: 200 } },
  // Add more nodes with tooltips as needed
];
function generateNodesFromNames(nodeProperties) {
  return nodeProperties.map((node, index) => {
    return {
      id: node['requirements Identifier'],
      data: { label: node['requirements text']},
      background:  colors[node['Priority']] ,
      position: { x: 100 * index, y: 100 * index}, // Adjust the position as needed
    };
  });
}

function Flow() {

  const nodesArray = generateNodesFromNames(requirements);
  const nodeElements = nodesArray.map((node) => ({
    id: node.id,
    data: {
      label: node.data.label,
    },
    style: { background: node.background },
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
