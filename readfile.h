#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char* readFileAsString(char *fileName);

int splitInputIntoLines (char* inputString, void lineHandler(char* line));
