import requirements from './templete';
// const requirements = require('./templete.js');
let edgeList =[];
let IntermediateNodes = [];
let viewType = "Risk";
let booleanOperator = ['AND','OR','NOT'];
const colors = {
    // "default" : {1: '#FF8080', 2: '#FFD080', 3: '#A8E9FF',4:"#ECFEEC"},
    "Priority" : {1:'#FF5733',2:'#FF6F61',3:'#FF9999',4:'#FFCCCC' },
    "Risk" : {Critical:'#1a53ff',High: '#3366FF',Medium: '#99CCFF',Low: '#E6F7FF'},
}
  
export function setViewType(type){
    viewType = type;
    console.log(viewType)
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
        console.log("function called for",child,arr)
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
        if(requirement['dep'].length>0){
            makeEdge(requirement['dep'],requirement['requirements Identifier']);
        }
    })

    // Node Genration
    const nodeElements = requirements.map((node) => ({
      id: node['requirements Identifier'],
      data: { label: node['requirements text'] },
      style: { background: colors[viewType][node[viewType]] },
      position: { x: Math.random() * 500,
                y: Math.random() * 500, }, // Adjust the position as needed,
    }));

    nodeElements.push(...IntermediateNodes);

export {edgeList,nodeElements};