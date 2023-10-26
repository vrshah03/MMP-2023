import requirements from './templete';
// const requirements = require('./templete.js');
let edgeList =[];
let IntermidiateNodes = [];
let booleanOperator = ['AND','OR','NOT'];
    let IntermidiateNodeCounter = 1;
    function makeNode(child){
        IntermidiateNodes.push({
            id: `I${IntermidiateNodeCounter}`,
            data: { label: `I${IntermidiateNodeCounter}` },
            position: {
                x: Math.random() * 500,
                y: Math.random() * 500,
              },
        })
        edgeList.push({ id: `I${IntermidiateNodeCounter}-${child}`, source: `I${IntermidiateNodeCounter}`, target: child })
        return `I${IntermidiateNodeCounter++}`;

    }

    function makeEdge(arr,child){
        console.log("function called for",child,arr)
        arr.map((e)=>{
            if(booleanOperator.includes(e)) {}
            else if(typeof(e) == 'string') edgeList.push({ id: `${e}-${child}`, source: e, target: child })
            else {
                let tempName = makeNode(child);
                makeEdge(e, tempName);
            }
        })
    }
    requirements.map(requirement => {
        if(requirement['dep'].length>0){
            makeEdge(requirement['dep'],requirement['requirements Identifier']);
        }
    })

console.log(edgeList);
export {edgeList,IntermidiateNodes};