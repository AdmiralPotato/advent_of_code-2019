#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>
#include "readfile.h"

char fileName[] = "01-input.txt";

long getFuelByMass (long mass) {
    return fmax(0, floor(mass / 3) - 2);
}

long getFuelForFuel (long fuel) {
    long total = fuel;
    long lastTotal = fuel;
    while (lastTotal > 0) {
        lastTotal = getFuelByMass(lastTotal);
        total += lastTotal;
    }
    return total;
}

long totalMass = 0;
long fuelForModules = 0;
long totalFuel = 0;

void handleLineToken (char* line) {
    char *endPointer;
    long mass = strtol(line, &endPointer, 10);
    long fuel = getFuelByMass(mass);
    long fuelForFuel = getFuelForFuel(fuel);
    totalMass += mass;
    fuelForModules += fuel;
    totalFuel += fuelForFuel;
    printf("mass: %li\n", mass);
    printf("fuel: %li\n", fuel);
    printf("fuelForFuel: %li\n\n", fuelForFuel);
}

int main () {
    char *inputData = readFileAsString(fileName);
    printf("strlen(inputData): %lu\n", strlen(inputData));
    printf("inputData: \n----\n%s\n----\n", inputData);

    splitInputIntoLines(inputData, handleLineToken);

    printf("totalMass: %li\n", totalMass);
    printf("fuelForModules: %li\n", fuelForModules);
    printf("totalFuel: %li\n", totalFuel);

    return 0;
}
