const fs = require('fs')
const dataPath = './02-input.txt'
let input = fs.readFileSync(dataPath, 'utf8')
let instructions = input.split(',').map((string)=> parseInt(string, 10))
console.log(instructions)

// extra garbage instructions at bottom relating to "1202" error
instructions[1] = 12
instructions[2] = 2

let currentInstructionIndex = 0;
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
        throw 'BAD TIMES, BAD OPCODE: ' + currentInstruction
    }
    instructions[instructions[currentInstructionIndex + 3]] = result

    currentInstructionIndex += 4
    currentInstruction = instructions[currentInstructionIndex]
}
console.log('Program end on instruction index:', currentInstructionIndex)
console.log('Program end on opcode:', (currentInstructionIndex / 4) + 1)
console.log(instructions.join(','))
