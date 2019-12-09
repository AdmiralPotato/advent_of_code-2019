#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "readfile.h"

char fileName[] = "01-input-test.txt";

int main () {
    char *inputData = readFileAsString(fileName);
    printf("strlen(inputData): %lu\n", strlen(inputData));
    printf("inputData: \n----\n%s\n----\n", inputData);
    return 0;
}