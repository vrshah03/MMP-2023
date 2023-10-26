import requirements from './templete';
// const requirements = require('./templete.js');
let edgeList =[];
let IntermidiateNodes = [];
let booleanOperator = ['AND','OR','NOT'];
const colors = ["",'#FF8080', '#FFD080', '#A8E9FF',"#ECFEEC"];

    //IntermidiateNode Genration
    let IntermidiateNodeCounter = 1;
    function makeNode(child, boolLabel){
        IntermidiateNodes.push({
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
      style: { background: colors[node['Priority']] },
      position: { x: Math.random() * 500,
                y: Math.random() * 500, }, // Adjust the position as needed,
    }));

    nodeElements.push(...IntermidiateNodes);

export {edgeList,nodeElements};