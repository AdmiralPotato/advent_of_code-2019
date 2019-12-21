const fs = require('fs')
const dataPath = './03-input.txt'
let input = fs.readFileSync(dataPath, 'utf8')
const lines = input.split('\n')

let x = 0
let y = 0
let xMax = 0
let yMax = 0
let xMin = 0
let yMin = 0
const directionMap = {
	U: (n) => {y += n},
	D: (n) => {y -= n},
	L: (n) => {x -= n},
	R: (n) => {x += n}
}
const characterMap = {
	U: '|',
	D: '|',
	L: '-',
	R: '-',
}
const parseLine = (line) => {
	let map = {}
	let steps = []
	x = 0;
	y = 0;
	map['0,0'] = {
		x,
		y,
		char: 'o'
	}
	line.split(',').forEach((instruction, instructionIndex) => {
		const direction = instruction.slice(0, 1)
		const distance = parseInt(
			instruction.slice(1, instruction.length),
			10
		)
		const char = characterMap[direction]
		// console.log({
		// 	direction,
		// 	distance
		// })
		if (instructionIndex > 0) {
			map[`${x},${y}`].char = '+'
		}
		for (let i = 0; i < distance; i++) {
			directionMap[direction](1)
			const address = `${x},${y}`
			steps.push(address)
			if(map[address]) {
				map[address].char = '+'
			} else {
				map[address] = {
					x,
					y,
					char
				}
			}
		}
		xMin = Math.min(x, xMin)
		yMin = Math.min(y, yMin)
		xMax = Math.max(x, xMax)
		yMax = Math.max(y, yMax)
	})
	return {
		map,
		steps
	}
}
const jsonClone = (input) => {
	return JSON.parse(JSON.stringify(input))
}
let shortest = {
	xManhattan: Infinity,
	yManhattan: Infinity,
	manhattan: Infinity,
	aLength: Infinity,
	bLength: Infinity,
	lineTotalLength: Infinity
}
const intersectLineMaps = (a, b) => {
	let resultMap = jsonClone(b.map)
	delete resultMap['0,0']
	Object.keys(a.map).forEach((address) => {
		let item = a.map[address]
		if (resultMap[address]) {
			resultMap[address].char = 'X'
			const manhattanDistance = Math.abs(item.x) + Math.abs(item.y)
			const aLength = a.steps.indexOf(address) + 1;
			const bLength = b.steps.indexOf(address) + 1;
			const lineTotalLength = aLength + bLength
			if (lineTotalLength < shortest.lineTotalLength) {
				shortest.address = address
				shortest.aLength = aLength
				shortest.bLength = bLength
				shortest.lineTotalLength = lineTotalLength
			}
			if (manhattanDistance < shortest.manhattan) {
				shortest.xManhattan = item.x
				shortest.yManhattan = item.y
				shortest.manhattan = manhattanDistance
			}
		} else {
			resultMap[address] = jsonClone(item)
		}
	})
	return resultMap
}
const renderOutput = (map) => {
	const padding = 1;
	const xOffset = Math.abs(xMin)
	const yOffset = Math.abs(yMin)
	const width = xOffset + xMax + (padding * 2) + 1
	const height = yOffset + yMax + (padding * 2) + 1
	let result = 'Grid:\n'
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			const address = `${x - padding - xOffset},${height - y - padding - 1 - yOffset}`
			const value = map[address]
			result += value ? value.char : '.'
		}
		result += '\n'
	}
	console.log(result)
}
let lineMapA = parseLine(lines[0])
let lineMapB = parseLine(lines[1])
let mapC = intersectLineMaps(lineMapA, lineMapB)
console.log('Lines')
console.log(lines)
// console.log('Map Line 1')
// renderOutput(mapA.map)
// console.log('Map Line 2')
// renderOutput(mapB.map)
// console.log('Intersection Map')
// renderOutput(mapC)
console.log(shortest)
