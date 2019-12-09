#include <stdio.h>
#include <stdlib.h>

char* readFileAsString(char *fileName)
{
    FILE *file;
    char fileMode[] = "r";
    size_t fileObjectsReadIntoBuffer; // What is size_t? It's the size of the default type on that system. The same size as a char.

    printf("fileName: %s\n", fileName);
    file = fopen(fileName, fileMode);
    if (file == NULL) {
        fprintf(stderr, "Can't open input file: %s\n", fileName);
        exit(1);
    }
    fseek(file, 0, SEEK_END);
    long fileSize = ftell(file);
    rewind(file);
    printf("fileSize: %li\n", fileSize);

    // allocate memory to contain the whole file:
    char *fileBuffer;
    fileBuffer = (char*) malloc(sizeof(char) * fileSize);
    if (fileBuffer == NULL) {
        fputs ("Memory error", stderr);
        exit(2);
    }

    // copy the file into the buffer:
    fileObjectsReadIntoBuffer = fread(
        fileBuffer,
        sizeof(char),
        fileSize,
        file
    );

    printf("fileObjectsReadIntoBuffer: %lu\n", fileObjectsReadIntoBuffer);

    // printf("fileBuffer:\n----\n%s\n----\n", fileBuffer);

    if (fileObjectsReadIntoBuffer != (size_t)fileSize) {
        fputs("Reading error\n",stderr);
        exit(3);
    }


    fclose(file);
    return fileBuffer;
}
