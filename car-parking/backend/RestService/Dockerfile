
FROM maven:3.6.3-openjdk-8 as build
ARG USE_CONFIG=application.yml
WORKDIR /app
COPY ./pom.xml ./
RUN mvn -e -B dependency:go-offline
COPY ./src ./src/
RUN ["mvn","test"]

COPY ./src/main/resources/${USE_CONFIG} ./src/main/resources/application.yml
RUN ["mvn","package" , "-Dmaven.test.skip=true", "-Pprod"]


FROM openjdk:8u262-jre
COPY --from=build /app/target/RestService-0.0.1-SNAPSHOT.jar /RestService.jar
CMD ["java", "-Dspring.profiles.active=prod", "-Xmx384m", "-jar", "/RestService.jar"]
