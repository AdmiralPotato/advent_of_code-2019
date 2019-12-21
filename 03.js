const fs = require('fs')
const dataPath = './03-input-test.txt'
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
let shortestManhattan = {
	x: Infinity,
	y: Infinity,
	distance: Infinity
}
const parseLine = (map, line) => {
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
	return map
}
const jsonClone = (input) => {
	return JSON.parse(JSON.stringify(input))
}
const intersectLines = (a, b) => {
	let result = jsonClone(b)
	delete result['0,0']
	Object.keys(a).forEach((address) => {
		let item = a[address]
		if (result[address]) {
			result[address].char = 'X'
			const manhattanDistance = Math.abs(item.x) + Math.abs(item.y)
			if(manhattanDistance < shortestManhattan.distance) {
				shortestManhattan.x = item.x
				shortestManhattan.y = item.y
				shortestManhattan.distance = manhattanDistance
			}
		} else {
			result[address] = jsonClone(item)
		}
	})
	return result
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
	result += `Shortest Manhattan Distance: ${shortestManhattan.distance}\n`
	result += `At X: ${shortestManhattan.x} Y: ${shortestManhattan.y}\n`
	console.log(result)
}
let mapA = parseLine({}, lines[0])
let mapB = parseLine({}, lines[1])
let mapC = intersectLines(mapA, mapB)
console.log('Lines')
console.log(lines)
// console.log('Map Line 1')
// renderOutput(mapA)
// console.log('Map Line 2')
// renderOutput(mapB)
console.log('Intersection Map')
renderOutput(mapC)
