const input = '178416-676461'

const parseIntForLoop = (string) => parseInt(string, 10)

const range = input
	.split('-')
	.map(parseIntForLoop)


const rules = [
	// these two rules are already met because of the loop mechanics, no need to explicitly test them now.
/*
	(input) => {
		// It is a six-digit number.
		return ('' + input).length === 6
	},
	(input) => {
		// The value is within the range given in your puzzle input.
		return (
			input >= range[0]
			&& input <= range[1]
		)
	},
*/
	(input) => {
		// Two adjacent digits are the same (like 22 in 122345).
		// This REQUIRES the sequence to have at LEAST ONE repeated pair,
		// BUT that repeated pair MUST NOT be part of more than two of that character
		// valid:
		// [11]2345
		// 111[22]3
		// invalid:
		// 111234
		// 111123
		// 111112
		// 111111
		const digits = ('' + input).split('').map(parseIntForLoop)
		let last0 = undefined
		let last1 = undefined
		const result = digits.find((digit, index) => {
			const next = digits[index + 1]
			const result = (
				(digit !== last0)
				&& (digit === last1)
				&& (digit !== next)
				&& (last1 !== next)
			)
			last0 = last1
			last1 = digit
			return result
		})
		return result !== undefined
	},
	(input) => {
		// Going from left to right, the digits never decrease; they only ever increase or stay the same (like 111123 or 135679).
		const digits = ('' + input).split('').map(parseIntForLoop)
		let last = digits.shift()
		const foundInvalid = digits.find((digit) => {
			const result = digit < last
			last = digit
			return result
		})
		return foundInvalid === undefined
	}
]

const testPasswordAgainstRules = (input) => {
	return rules.every((rule) => rule(input))
}

const validPasswords = []
for (let i = range[0]; i <= range[1]; i++) {
	const passwordGood = testPasswordAgainstRules(i)
	if (passwordGood) {
		validPasswords.push(i)
	}
}
// const testCases = [
// 	223456, // yes
// 	333445, // yes
// 	333456, // no
// 	444456, // no
// 	555556, // no
// 	666666, // no
// ]
// const validPasswords = testCases.map(testPasswordAgainstRules)
// 931 is too low??
// 1472 is too high??
console.log(JSON.stringify({
	validPasswordCount: validPasswords.length,
}))
