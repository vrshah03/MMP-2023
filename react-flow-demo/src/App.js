import ReactFlow, { Controls, Background, EdgeTypes } from 'reactflow';
import 'reactflow/dist/style.css';
import requirements from './templete'
// import edgeMaker from './edgeMaker'

// edgeMaker();
const colors = ["",'#FF8080', '#FFD080', '#A8E9FF',"#ECFEEC"];

const edgesArray = [
  { id: 'REQ001-REQ005', source: 'REQ001', target: 'REQ005' },
  { id: 'REQ004-REQ005', source: 'REQ004', target: 'REQ005' }
]

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
    data: { label: node.data.label },
    style: { background: node.background },
    position: node.position,
  }));

  return (
    <div style={{ width: '100%', height: '500px' }}>
      <ReactFlow nodes={nodeElements} edges={edgesArray}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Flow;
