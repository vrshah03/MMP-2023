import requirements from './templete';
// const requirements = require('./templete.js');
let edgeList =[];
let IntermediateNodes = [];
let viewType = "Priority";
let booleanOperator = ['AND','OR','NOT'];
const colors = {
    // "default" : {1: '#FF8080', 2: '#FFD080', 3: '#A8E9FF',4:"#ECFEEC"},
    "Priority" : {1:'#FF5733',2:'#FF6F61',3:'#FF9999',4:'#FFCCCC' },
    "Risk" : {Critical:'#1a53ff',High: '#3366FF',Medium: '#99CCFF',Low: '#E6F7FF'},
}
  
export function setViewType(type){
    viewType = type;
    return setColor(viewType);
}
    //Intermediate Node Genration
    let IntermidiateNodeCounter = 1;
    function makeNode(child, boolLabel){
        IntermediateNodes.push({
            id: `I${IntermidiateNodeCounter}`,
            data: { label: `I${IntermidiateNodeCounter}` },
            position: {
                x: Math.random() * 500,
                y: Math.random() * 500,
              },
        })
        edgeList.push({ id: `I${IntermidiateNodeCounter}-${child}`, source: `I${IntermidiateNodeCounter}`, target: child , label: boolLabel})
        return `I${IntermidiateNodeCounter++}`;

    }
    //edge genration
    function makeEdge(arr,child){
        let boolLabel;
        arr.map((e)=>{
            if(booleanOperator.includes(e)) {boolLabel = e}
            else if(typeof(e) == 'string') edgeList.push({ id: `${e}-${child}`, source: e, target: child,  label: boolLabel })
            else {
                let tempName = makeNode(child, boolLabel);
                makeEdge(e, tempName);
            }
        })
    }
    requirements.map(requirement => {
        if(requirement["Dependencies"].length>0){
            makeEdge(requirement["Dependencies"],requirement['Requirement Identifier']);
        }
    })

    // Node Genration
    let nodeElements = requirements.map((node) => ({
      id: node['Requirement Identifier'],
      data: { label: node['Requirement Text'], Priority:node["Priority"], Risk: node["Risk"] },
      style: { background: colors[viewType][node[viewType]] },
      position: { x: Math.random() * 500,
                y: Math.random() * 500, }, // Adjust the position as needed,
        // parentNode: node["Module"],
        draggable: true,
    }));

    //Adding Boxes for parent Node
    const groupNodes = requirements.filter((node) => node["Module"] && node["Module"].length > 0).
    map((node) =>{
        return {
            id: node["Module"],
            data: { label: node["Module"] },
            type: 'input',
            position: { x: Math.random() * 500,
                        y: Math.random() * 500, },
            style: {
                backgroundColor: 'rgba(255, 0, 255, 0.2)',
                width: 200,
                height: 50,
                }
        }
    })

    //Changine node color according to type
    const setColor = (viewType) => {

        nodeElements = nodeElements.map(node => {
            if (node.data && node.data[viewType]) {
              return{
                ...node,
                style : { background: colors[viewType][node.data[viewType]] },
            };
            }
            return node;
          });
        return nodeElements;
    }

    

    nodeElements.push(...IntermediateNodes,...groupNodes);
export {edgeList,nodeElements};