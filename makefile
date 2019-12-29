all: puzzle01 puzzle02 puzzle03

puzzle01: 01.c readfile.c
	clang -o 01.out 01.c readfile.c -lm -Wall -Wextra
puzzle02: 02.c readfile.c
	clang -o 02.out 02.c readfile.c -lm -Wall -Wextra
puzzle03: 03.c readfile.c
	clang -o 03.out 03.c readfile.c -lm -Wall -Wextra
