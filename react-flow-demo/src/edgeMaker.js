// import requirements from './templete'
const requirements = require('./templete.js');
let edgeList =[];

    // let IntermidiateNodeCounter = 1;
    // makeNode = () => {
    //     nodeElements.push({
    //         id: `I${IntermidiateNodeCounter}`,
    //         data: { label: `I${IntermidiateNodeCounter}` },
    //         position: Math.random() * 500,
    //     })
    //     return `I${IntermidiateNodeCounter}`
    // }

    makeEdge = (arr,child) =>{
        arr.map((e)=>{
            if(typeof(e) == 'string') edgeList.push({ id: `${e}-${child}`, source: e, target: child })
            else {
                // makeEdge(e, makeNode());
            }
        })
    }
    requirements.map(requirement => {
        if(requirement['dep'].length>0){
            makeEdge(requirement['dep'],requirement['requirements Identifier']);
        }
    })

console.log(edgeList);
// export default edgeMaker;