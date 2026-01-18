package config

import (
    "log"
    "os"
    "time"

    "github.com/joho/godotenv"
)

type Config struct {
    MongoURI        string
    MongoDB         string
    RedisAddr       string
    RedisPassword   string
    MinioEndpoint   string
    MinioAccessKey  string
    MinioSecretKey  string
    MinioBucket     string
    ServerAddr      string
}

func Load() *Config {
    _ = godotenv.Load()

    cfg := &Config{
        MongoURI:       get("MONGO_URI", "mongodb://localhost:27017"),
        MongoDB:        get("MONGO_DB", "realdeal"),
        RedisAddr:      get("REDIS_ADDR", "localhost:6379"),
        RedisPassword:  get("REDIS_PASSWORD", ""),
        MinioEndpoint:  get("MINIO_ENDPOINT", "localhost:9000"),
        MinioAccessKey: get("MINIO_ACCESS_KEY", "miniouser"),
        MinioSecretKey: get("MINIO_SECRET_KEY", "miniopass123"),
        MinioBucket:    get("MINIO_BUCKET", "media"),
        ServerAddr:     get("SERVER_ADDR", ":8080"),
    }

    return cfg
}

func get(key, def string) string {
    v := os.Getenv(key)
    if v == "" {
        return def
    }
    return v
}

func MustEnv(keys ...string) {
    for _, k := range keys {
        if os.Getenv(k) == "" {
            log.Fatalf("missing env: %s", k)
        }
    }
}

func Timeout() time.Duration { return 5 * time.Second }