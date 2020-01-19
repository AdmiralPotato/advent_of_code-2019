#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "readfile.h"

#define MAX(a,b) ((a) > (b) ? a : b)
#define MIN(a,b) ((a) < (b) ? a : b)

char fileName[] = "03-input.txt";

typedef struct segment {
	long x;
	long y;
	char symbol;
	unsigned int segmentIndex;
	struct segment *segmentPrev;
	struct segment *segmentNext;
} segment_t;
long x = 0;
long y = 0;
unsigned int segmentIndex;

int lineIndex = 0;
segment_t *startSegments[3] = { NULL, NULL, NULL};
segment_t *segmentLast = NULL;
segment_t *segmentNext = NULL;
void handleInstruction (char* instruction) {
	// printf("instruction: %s\n", instruction);
	char symbol;
	char *end;
	char direction = instruction[0];
	instruction += 1;
	long distance = strtol(instruction, &end, 10);
	// printf("direction: %c\n", direction);
	// printf("distance: %ld\n", distance);
	int xVelocity = 0;
	int yVelocity = 0;
	switch (direction) {
		case 'U': yVelocity += 1; symbol = '|'; break;
		case 'D': yVelocity -= 1; symbol = '|'; break;
		case 'L': xVelocity -= 1; symbol = '-'; break;
		case 'R': xVelocity += 1; symbol = '-'; break;
		default:
			printf("Invalid direction: %c", direction);
			exit(1);
	}
	for (long distanceIndex = 0; distanceIndex < distance; distanceIndex++) {
		x += xVelocity;
		y += yVelocity;
		segment_t *segmentCurrent = malloc(sizeof(segment_t));
		segmentCurrent->x = x;
		segmentCurrent->y = y;
		segmentCurrent->symbol = symbol;
		segmentCurrent->segmentIndex = segmentIndex;
		segmentCurrent->segmentPrev = NULL;
		segmentCurrent->segmentNext = NULL;
		if (segmentLast != NULL) {
			segmentLast->segmentNext = segmentCurrent;
			segmentCurrent->segmentPrev = segmentLast;
			/*
			printf(
				"There is a previous segment!\n\tindex: %u\n\tx: %ld\n\ty: %ld\n\tprev: %p\n\tnext: %p\n",
				segmentLast->segmentIndex,
				segmentLast->x,
				segmentLast->y,
				segmentLast->segmentPrev,
				segmentLast->segmentNext
			);
			*/
		}
		fflush(stdout);
		if(segmentIndex == 0) {
			printf("Assigning startSegment: %d\n", lineIndex);
			startSegments[lineIndex] = segmentCurrent;
		}
		segmentLast = segmentCurrent;
		segmentIndex += 1;
	}
};
void handleLine (char *line) {
	x = 0;
	y = 0;
	segmentIndex = 0;
	segmentLast = NULL;
	// printf("Start Handling line %d: %s\n", lineIndex, line);
	splitInputIntoTokens(",", line, handleInstruction);
	// printf("End Handling line %d: %s\n", lineIndex, line);
	lineIndex++;
};

void intersectLines (segment_t *segmentA, segment_t *segmentB) {
	segment_t *currentSegmentA = segmentA;
	segment_t *currentSegmentB;
	long xIntersect = 0;
	long yIntersect = 0;
	unsigned int currentLineDistance = 0;
	unsigned int shortestLineDistance = 0;
	while ((currentSegmentA = currentSegmentA->segmentNext) != NULL) {
		/*
		printf(
				"A i: %d; x: %ld; y:%ld;\n",
				currentSegmentA->segmentIndex,
				currentSegmentA->x,
				currentSegmentA->y
		);
		*/
		currentSegmentB = segmentB;
		while ((currentSegmentB = currentSegmentB->segmentNext) != NULL) {
			/*
			printf(
					"\tB i: %d; x: %ld; y:%ld;\n",
					currentSegmentB->segmentIndex,
					currentSegmentB->x,
					currentSegmentB->y
			);
			*/
			if (
					(currentSegmentA->x == currentSegmentB->x) &&
					(currentSegmentA->y == currentSegmentB->y)
			) {
				currentLineDistance = currentSegmentA->segmentIndex + currentSegmentB->segmentIndex + 2;
				printf(
						"Intersect detected at x:%ld; y:%ld; currentLineDistance: %d!\n",
						currentSegmentA->x,
						currentSegmentA->y,
						currentLineDistance
				);
				if (shortestLineDistance == 0) {
					shortestLineDistance = currentLineDistance;
				} else {
					shortestLineDistance = MIN(shortestLineDistance, currentLineDistance);
				}
				if (currentLineDistance == shortestLineDistance) {
					xIntersect = currentSegmentA->x;
					yIntersect = currentSegmentA->y;
				}
			}
		}
	}
	printf(
			"\n\nRESULTS:\n\tshortestLineDistance: %d\n\tManhattan: %ld\n\txIntersect: %ld;\n\tyIntersect: %ld;\n",
			shortestLineDistance,
			xIntersect + yIntersect,
			xIntersect,
			yIntersect
	);
}

int main () {
	char *inputData = readFileAsString(fileName);
	printf("strlen(inputData): %lu\n", strlen(inputData));
	printf("inputData: \n----\n%s\n----\n", inputData);
	splitInputIntoTokens("\n", inputData, handleLine);

	printf(
		"startSegments[0]\n\tindex: %u\n\tx: %ld\n\ty: %ld\n\tprev: %p\n\tnext: %p\n",
		startSegments[0]->segmentIndex,
		startSegments[0]->x,
		startSegments[0]->y,
		startSegments[0]->segmentPrev,
		startSegments[0]->segmentNext
	);
	printf(
		"startSegments[1]\n\tindex: %u\n\tx: %ld\n\ty: %ld\n\tprev: %p\n\tnext: %p\n",
		startSegments[1]->segmentIndex,
		startSegments[1]->x,
		startSegments[1]->y,
		startSegments[1]->segmentPrev,
		startSegments[1]->segmentNext
	);

	intersectLines(
		startSegments[0],
		startSegments[1]
	);

	return 0;
}
