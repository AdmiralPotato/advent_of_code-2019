#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char* readFileAsString(char *fileName);

char* copyString(char* inputString);

int splitInputIntoTokens (char* splitToken, char* inputString, void lineHandler(char* token));
