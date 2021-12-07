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
		const adjacentDigitsRegex = /00|11|22|33|44|55|66|77|88|99/g
		return adjacentDigitsRegex.test('' + input)
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

console.log(JSON.stringify({
	validPasswords,
	validPasswordCount: validPasswords.length,
}))
