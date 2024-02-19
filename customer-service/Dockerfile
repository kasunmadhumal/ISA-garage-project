FROM openjdk:17-jdk-slim AS build

RUN mkdir -p /app

COPY ./ /app

WORKDIR /app

RUN ./gradlew clean build


EXPOSE 8085

CMD ["java", "-jar", "build/libs/customer-service-0.0.1-SNAPSHOT.jar"]
