#!/bin/bash

ns debug android

while [ $? -ne 0 ];
do
    ns debug android
done

