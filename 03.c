#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>
#include "readfile.h"

char fileName[] = "03-input-test.txt";

typedef struct segment {
	long x;
	long y;
	char symbol;
	unsigned int segmentIndex;
	struct segment *segmentPrev;
	struct segment *segmentNext;
} segment;
long x = 0;
long y = 0;
unsigned int segmentIndex;

segment *segmentLast = NULL;
segment *segmentNext = NULL;
void handleInstruction (char* instruction) {
	printf("instruction: %s\n", instruction);
	char symbol;
	char direction = instruction[0];
	instruction += 1;
	long distance = atol(instruction);
	printf("direction: %c\n", direction);
	printf("distance: %ld\n", distance);
	switch (direction) {
		case 'U': y += 1; symbol = '|'; break;
		case 'D': y -= 1; symbol = '|'; break;
		case 'L': x -= 1; symbol = '-'; break;
		case 'R': x += 1; symbol = '-'; break;
		default:
			printf("Invalid direction: %c", direction);
			exit(1);
	}
	segment *segmentCurrent = malloc(sizeof(segment));
	segmentCurrent->x = x;
	segmentCurrent->y = y;
	segmentCurrent->symbol = symbol;
	segmentCurrent->segmentIndex = segmentIndex;
	if (segmentLast) {
		printf(
			"There is a previous segment!\n\tindex: %u\n\tx: %ld\n\ty: %ld\n",
			segmentLast->segmentIndex,
			segmentLast->x,
			segmentLast->y
		);
	}
	fflush(stdout);
	segmentLast = segmentCurrent;
	segmentIndex += 1;
};
void handleLine (char* line) {
	x = 0;
	y = 0;
	segmentIndex = 0;
	splitInputIntoTokens(",", line, handleInstruction);
};

int main () {
	char *inputData = readFileAsString(fileName);
	printf("strlen(inputData): %lu\n", strlen(inputData));
	printf("inputData: \n----\n%s\n----\n", inputData);
	splitInputIntoTokens("\n", inputData, handleLine);


	return 0;
}
