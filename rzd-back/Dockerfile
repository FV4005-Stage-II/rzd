FROM openjdk:20

WORKDIR /app

COPY target/rzd-0.0.1-SNAPSHOT.jar /app/rzd-back.jar

EXPOSE 8083

CMD ["java", "-jar", "rzd-back.jar"]
