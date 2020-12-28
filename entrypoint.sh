#!/usr/bin/env sh

echo Hello there
echo

npm run buildGUI

sh ./mvnw spring-boot:run