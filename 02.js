const fs = require('fs')
const dataPath = './02-input.txt'
let input = fs.readFileSync(dataPath, 'utf8')

const runIntcode = (instructions, noun, verb) => {
    instructions[1] = noun
    instructions[2] = verb
    let currentInstructionIndex = 0
    let currentInstruction = instructions[currentInstructionIndex]
    while(currentInstruction !== 99) {
        operandA = instructions[instructions[currentInstructionIndex + 1]]
        operandB = instructions[instructions[currentInstructionIndex + 2]]
        let result
        if (currentInstruction === 1) {
            result = operandA + operandB
        } else if(currentInstruction === 2) {
            result = operandA * operandB
        } else {
            console.warn('BAD TIMES, BAD OPCODE: ' + currentInstruction)
            console.log({
                instructions: instructions.join(','),
                currentInstructionIndex,
                currentInstruction,
                operandA,
                operandB,
                result
            })
            break
        }
        instructions[instructions[currentInstructionIndex + 3]] = result

        currentInstructionIndex += 4
        currentInstruction = instructions[currentInstructionIndex]
    }
    // console.log(instructions.join(','))
    return instructions
} 
const pureInstructions = input.split(',').map((string)=>parseInt(string, 10)) 
let instructions = pureInstructions.slice()
console.log(instructions.join(','))

console.log('Initial run with noun, verb as 12, 02')
runIntcode(instructions, 12, 2)

const intendedResult = 19690720
let lastResult = null
let i = 1
let j = 1
while (i < 100 && lastResult !== intendedResult) {
    while (j < 100 && lastResult !== intendedResult) {
        instructions = pureInstructions.slice()
        runIntcode(instructions, i, j)
        lastResult = instructions[0]
        console.log(`noun: ${i}, verb: ${j}, result: ${lastResult}`)
        if(lastResult === intendedResult) {
            break
        }
        j++
    }
    if(lastResult === intendedResult) {
        break
    }
    i++
    j = 1
}
if(lastResult !== intendedResult) {
    console.error('Combination not found. Something is wrong.')
} else {
    console.log(`Correct result found! noun: ${i}, verb: ${j}, answer: ${(i * 100) + j}`)
}
