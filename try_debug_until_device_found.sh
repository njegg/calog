#!/bin/bash

ns debug android --path src

while [ $? -ne 0 ];
do
    ns debug android --path src
done

