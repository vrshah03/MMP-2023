import React, { useState } from 'react';
import './App.css';
import { booleanExpressions } from './node-edge-Maker';
import { useNavigate } from 'react-router-dom';

function App() {
  const [considerIntermediate, setConsiderIntermediate] = useState(true);
  const [considerActive, setConsiderActive] = useState(false);
  const [effectCovarage, seteffectCovarage] = useState();
  const [selectedRequirements, setSelectedRequirements] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [testCases, setTestCases] = useState([]); // Define testCases state

  const pattern = /\bREQ\d+\b(?=\s*(?:OR|AND|$))/g;

  let reqCounts = {};
  let totalCount = 0;

  booleanExpressions.forEach(exp => {
    const matches = exp.match(pattern);
    if (matches) {
      matches.forEach(match => {
        reqCounts[match] = (reqCounts[match] || 0) + 1;
        totalCount++;
      });
    }
  });

  const countWords = expression => {
    let count = 0;
    const parts = expression.split('=');
    if (parts.length === 2) {
      if (parts[0].trim().startsWith('I')) {
        const words = parts[1].match(/\b(?!AND|OR|NOT)\w+\b/g);
        if (words) {
          count = words.length;
          if (considerIntermediate) reqCounts[parts[0].trim()] = count;
        }
      }
    }
    return count;
  };

  booleanExpressions.forEach(expression => {
    const count = countWords(expression);
    if (count > 0 && considerIntermediate) {
      totalCount += count;
    }
  });

  const handleCheckboxChange = (req, isChecked) => {
    if (isChecked) {
      setSelectedRequirements([...selectedRequirements, req]);
    } else {
      setSelectedRequirements(selectedRequirements.filter(item => item !== req));
    }
  };

  const runAlgorithm = () => {
    console.log(selectedRequirements)

    const priority = selectedRequirements;
    let active_nodes = false;

    let c = 0;
    for (const e of priority) {
      c += reqCounts[e];
    }
    const ec = (c / totalCount) * 100 || 0;
    console.log(`${ec.toFixed(2)}% Effect Coverage`);

    function extractVariables(expressions) {
      const variables = new Set();
      for (const expr of expressions) {
        const parts = expr.split('=');
        parts[1].split(/\b(?:OR|AND|NOT)\b/).forEach(part => {
          const varName = part.trim();
          if (varName) variables.add(varName);
        });
      }
      return Array.from(variables);
    }

    function generateCombinations(variables) {
      return Array.from({ length: Math.pow(2, variables.length) }, (_, i) =>
        variables.map((variable, j) => Boolean(i & (1 << j)))
      );
    }

    function evaluateExpression(expression, inputValues) {
        const parts = expression.split('=');
        const variable = parts[0].trim();
        const equation = parts[1].trim();
    
        if (equation.includes('NOT')) {
            const negatedVar = equation.split('NOT')[1].trim();
            return [variable, !inputValues[negatedVar]];
        } else {
            // Split the equation based on the logical operators
            let terms = equation.split(/\s+/);
            let result = null;
            let operator = null;
            for (let term of terms) {
                if (term === 'AND' || term === 'OR') {
                    operator = term;
                } else {
                    let value = inputValues[term];
                    if (result === null) {
                        result = value;
                    } else if (operator === 'AND') {
                        result = result && value;
                    } else if (operator === 'OR') {
                        result = result || value;
                    }
                }
            }
            return [variable, result];
        }
    }

    function generateFilteredTestCases(expressions) {
        const variables = extractVariables(expressions);
        const combinations = generateCombinations(variables);
        const filteredTestCases = [];
        let count = 0;
    
        for (const combination of combinations) {
            const inputValues = Object.fromEntries(variables.map((variable, i) => [variable, combination[i]]));
            const caseOutput = {};
            let flag = false;
            count++;
            for (const expr of expressions) {
                const [variable, value] = evaluateExpression(expr, inputValues);
                caseOutput[variable] = value;
            }
            if (priority) {
                for (const [varName, varValue] of Object.entries(inputValues)) {
                    if (!priority.includes(varName) && varValue !== true) {
                        flag = true;
                        break;
                    }
                }
    
                if (considerActive) {
                    for (const varValue of Object.values(caseOutput)) {
                        if (!varValue) {
                            flag = true;
                            break;
                        }
                    }
                }
            }
    
            if (flag) {
                continue;
            }
            filteredTestCases.push({ inputs: inputValues, outputs: caseOutput, count: count });
        }
    
        return filteredTestCases;
    }
    
    

    const newTestCases = generateFilteredTestCases(booleanExpressions);
    seteffectCovarage(`${ec.toFixed(2)}% Effect Coverage, ${c} Effect Coverage Weight`)
    console.log(newTestCases)
    setTestCases(newTestCases);
    setShowTable(true);
  };

  const priorityList = Object.entries(reqCounts).map(([req, count]) => {
    const value = totalCount !== 0 ? (count / totalCount) * 100 : 0;
    return (
      <li key={req}>
        <label>
          <input
            type="checkbox"
            checked={selectedRequirements.includes(req)}
            onChange={e => handleCheckboxChange(req, e.target.checked)}
          />
          {req} - have ECW: {count} and (ECP: {value.toFixed(2)}%)
        </label>
      </li>
    );
  });

  const navigate = useNavigate();
  const handleBack = () => {
    navigate('/graph');
  };

  const handleNext = () => {
    navigate('/test-case');
  };

  return (
    <div className="App">
      <h1>Selection & Minimization of the requirements</h1>
      <h3> 1. SELECTION - Priority of the requirements</h3>
      <label>
        <input
          type="checkbox"
          checked={considerIntermediate}
          onChange={() => setConsiderIntermediate(!considerIntermediate)}
        />
        Consider Intermediate
      </label>
      <label>
        <input
          type="checkbox"
          checked={considerActive}
          onChange={() => setConsiderActive(!considerActive)}
        />
        Active Nodes only
      </label>
      <h4>{effectCovarage}</h4>
      <ul>{priorityList}</ul>
      <div className="button-conttainer">
      <button onClick={runAlgorithm}>Run Algorithm for Minimization</button>
      </div>

      {showTable && (
        <div className="table-container">
        <h3> 2. MINIMIZATION - Minimized TestCases</h3>
          <div className="scrollable-table">
            <table>
              <thead>
                <tr>
                  <th>Sr No.</th>
                  <th>Test Case</th>
                  {Object.keys(testCases[0].inputs).map(variable => (
                    <th key={variable}>{variable}</th>
                  ))}
                  {Object.keys(testCases[0].outputs).map(variable => (
                    <th key={variable}>{variable}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {testCases.map((testCase, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'even' : 'odd'}>
                    <td>{index + 1}</td>
                    <td>Test Case {testCase.count}</td>
                    {Object.entries(testCase.inputs).map(([variable, value]) => (
                      <td key={variable}>{value.toString()}</td>
                    ))}
                    {Object.entries(testCase.outputs).map(([variable, value], i) => (
                      <td key={variable} className={value.toString()== "true" ? 'even-output' : 'odd-output'}>{value.toString()}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="button-conttainer">
        <button onClick={() => {handleBack()}}>Back to the Graph</button>
        <button onClick={() => {handleNext()}}>Feasible test cases</button>
      </div>
    </div>
  );
}

export default App;
