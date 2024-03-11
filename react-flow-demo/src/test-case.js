import React, { useState } from 'react';
import './TestCases.css'; // Import CSS file for styling
import { booleanExpressions } from './node-edge-Maker';
import { useNavigate } from 'react-router-dom';

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



function generateTestCases(expressions) {
    const variables = extractVariables(expressions);
    const combinations = generateCombinations(variables);
    const testCases = [];

    for (const combination of combinations) {
        const inputValues = Object.fromEntries(variables.map((variable, i) => [variable, combination[i]]));
        const caseOutput = {};
        for (const expr of expressions) {
            const [variable, value] = evaluateExpression(expr, inputValues);
            caseOutput[variable] = value;
        }
        testCases.push({ inputs: inputValues, outputs: caseOutput });
    }
    return testCases;
}

function TestCases() {
    const [testCases, setTestCases] = useState(() => generateTestCases(booleanExpressions));
    const navigate = useNavigate();
    const handleBack = () => {
        navigate('/graph'); 
    };

    const handleNext = () => {
        navigate('/minimization'); 
    };

    return (
        <div className="container">
            <h2>Feasible Test Cases</h2>
            <div className="table-container">
                <div className="scrollable-table">
                    <table>
                        <thead>
                            <tr>
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
                                    <td>Test Case {index + 1}</td>
                                    {Object.entries(testCase.inputs).map(([variable, value]) => (
                                        <td key={variable}>{value.toString()}</td>
                                    ))}
                                    {Object.entries(testCase.outputs).map(([variable, value], i) => (
                                        <td key={variable} className={value.toString() === "true" ? 'even-output' : 'odd-output'}>{value.toString()}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="button-container">
                <button onClick={() => {handleBack()}}>Back to the Graph</button>
                <button onClick={() => {handleNext()}}>Test Case Minimization </button>
            </div>
        </div>
    );
}

export default TestCases;
