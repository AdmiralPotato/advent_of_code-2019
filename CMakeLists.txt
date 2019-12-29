cmake_minimum_required(VERSION 3.10)
project(advent_of_code_2019 C)


set(CMAKE_C_STANDARD 11)

set(CMAKE_C11_FLAGS "${CMAKE_C11_FLAGS} -Werror -Wall -Wextra")

include_directories(.)

add_executable(03.out
    03.c
    readfile.c
    readfile.h)
