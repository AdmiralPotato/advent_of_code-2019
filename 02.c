#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>
#include "readfile.h"

char fileName[] = "02-input.txt";

typedef struct {
	unsigned long count;
	long *array;
} instructions;
instructions instructionInstance;

void handleToken (char* token) {
	char *endPointer;
	instructionInstance.array[instructionInstance.count] = strtol(token, &endPointer, 10);
	instructionInstance.count += 1;
}
instructions prepData (char* inputData) {
	instructionInstance.count = 0;
	// Allocate the maximum possible size, as if every other char is a separator
	instructionInstance.array = calloc(strlen(inputData), sizeof(long) / 2);
	splitInputIntoTokens(",", inputData, handleToken);
	return instructionInstance;
}
long runIntCode(instructions inst, int noun, int verb) {
	long operandA = 0;
	long operandB = 0;
	long result = 0;
	inst.array[1] = (long) noun;
	inst.array[2] = (long) verb;
	long currentInstructionIndex = 0;
	long currentInstruction = inst.array[currentInstructionIndex];
	while(currentInstruction != 99) {
		operandA = inst.array[inst.array[currentInstructionIndex + 1]];
		operandB = inst.array[inst.array[currentInstructionIndex + 2]];
		if (currentInstruction == 1) {
			result = operandA + operandB;
		} else if(currentInstruction == 2) {
			result = operandA * operandB;
		} else {
			printf("BAD TIMES, BAD OPCODE: %li", currentInstruction);
			break;
		}
		inst.array[inst.array[currentInstructionIndex + 3]] = result;

		currentInstructionIndex += 4;
		currentInstruction = inst.array[currentInstructionIndex];
	}
	return inst.array[0];
}
 

int main () {
	char *inputData = readFileAsString(fileName);
	printf("strlen(inputData): %lu\n", strlen(inputData));
	printf("inputData: \n----\n%s\n----\n", inputData);

	instructions newInstructions = prepData(inputData);
	// free(newInstructions.array);

	long intCodeResult = runIntCode(newInstructions, 12, 02);

	printf("newInstructions.count: %lu\n", newInstructions.count);
	printf("newInstructions.array[0]: %li\n", newInstructions.array[0]);
	printf("newInstructions.array[1]: %li\n", newInstructions.array[1]);
	printf("newInstructions.array[2]: %li\n", newInstructions.array[2]);
	printf("newInstructions.array[count - 1]: %li\n", newInstructions.array[newInstructions.count - 1]);
	printf("newInstructions.array[count]: %li\n", newInstructions.array[newInstructions.count]);
	printf("intCodeResult for 12, 02: %li\n", intCodeResult);

	long intendedResult = 19690720;
	long lastResult = 0;
	int i = 1;
	int j = 1;
	while (i < 100 && lastResult != intendedResult) {
		while (j < 100 && lastResult != intendedResult) {
			free(newInstructions.array);
			newInstructions = prepData(inputData);
			lastResult = runIntCode(newInstructions, i, j);
			printf("noun: %i, verb: %i, result: %li\n", i, j, lastResult);
			if (lastResult == intendedResult) {
				break;
			}
			j++;
		}
		if(lastResult == intendedResult) {
			break;
		}
		i++;
		j = 1;
	}
	if (lastResult != intendedResult) {
		printf("Combination not found. Something is wrong.");
	} else {
		printf("Correct result found! noun: %i, verb: %i, answer: %i\n", i, j, (i * 100) + j);
	}
	free(inputData);
	free(newInstructions.array);
	return 0;
}
