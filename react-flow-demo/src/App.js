import ReactFlow, { Controls, Background, EdgeTypes } from 'reactflow';
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
