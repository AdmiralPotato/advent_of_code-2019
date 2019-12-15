all: puzzle01 puzzle02

puzzle01: 01.c readfile.c
	clang -o 01.out 01.c readfile.c -lm -Wall -Wextra
puzzle02: 02.c readfile.c
	clang -o 02.out 02.c readfile.c -lm -Wall -Wextra
