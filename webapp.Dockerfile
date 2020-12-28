FROM openjdk:16-jdk-alpine3.12


RUN apk add --update nodejs npm

WORKDIR /todolist

COPY *.json /todolist/
RUN npm i

COPY .mvn /todolist/.mvn
COPY mvnw /todolist/mvnw
COPY pom.xml /todolist/pom.xml
COPY src /todolist/src
COPY entrypoint.sh /
RUN chmod ugo+x /entrypoint.sh
RUN chmod ugo+x mvnw

RUN npm run buildGUI
RUN rm -rf websrc

EXPOSE 80

ENTRYPOINT ["entrypoint.sh"]