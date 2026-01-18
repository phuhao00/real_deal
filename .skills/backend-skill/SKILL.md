---
name: backend-skill
description: Backend development for real_deal platform using Go 1.23, Gin framework, MongoDB, Redis, and MinIO. Use when working on backend API development, database operations, object storage, authentication, or maintaining the Go server.
---

# Backend Development (Go)

## Tech Stack

- **Language**: Go 1.23.0
- **Framework**: Gin v1.10.1
- **Databases**: MongoDB (primary), Redis (cache/sessions)
- **Object Storage**: MinIO v7.0.60
- **Config**: godotenv

## Project Structure

```
cmd/
  server/main.go           # Entry point
internal/
  config/config.go         # Configuration management
  db/
    mongo.go               # MongoDB connection
    redis.go               # Redis connection
  handlers/                # API route handlers
  storage/storage.go       # MinIO interface
```

## Key Patterns

### Database Operations

```go
// MongoDB queries follow this pattern
func (h *Handler) List(c *gin.Context) {
    var results []Model
    filter := bson.M{}
    if err := h.col.Find(c, filter).All(&results); err != nil {
        c.JSON(500, gin.H{"error": err.Error()})
        return
    }
    c.JSON(200, results)
}
```

### Configuration

Load config with `config.Load()`. Environment variables defined in `.env`:

- `MONGO_URI`, `MONGO_DB`
- `REDIS_ADDR`, `REDIS_PASSWORD`
- `MINIO_ENDPOINT`, `MINIO_ACCESS_KEY`, `MINIO_SECRET_KEY`, `MINIO_BUCKET`
- `SERVER_ADDR`

### CORS Setup

Server accepts requests from `http://localhost:3000` and `http://127.0.0.1:3000` with credentials.

## Adding New Endpoints

1. Create handler in `internal/handlers/`
2. Register route in `cmd/server/main.go`
3. Test with frontend at `localhost:3000`

## Common Tasks

- Add new API endpoint → `internal/handlers/` + `main.go`
- Update data model → Modify handler struct and MongoDB queries
- Add Redis caching → Use `internal/db/redis.go` connection
- Store files → Use MinIO client from `internal/storage/storage.go`
