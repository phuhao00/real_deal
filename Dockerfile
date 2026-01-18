FROM golang:1.21-alpine AS build
WORKDIR /app
RUN apk add --no-cache git
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o server ./cmd/server && \
    CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o seed ./cmd/seed

FROM alpine:3.19
WORKDIR /app
COPY --from=build /app/server /app/seed /app/
COPY seeds /app/seeds
ENV SERVER_ADDR=:8080
ENV MONGO_URI=mongodb://mongodb:27017
ENV MONGO_DB=realdeal
ENV REDIS_ADDR=redis:6379
ENV MINIO_ENDPOINT=minio:9000
ENV MINIO_ACCESS_KEY=miniouser
ENV MINIO_SECRET_KEY=miniopass123
ENV MINIO_BUCKET=media
EXPOSE 8080
CMD ["/app/server"]