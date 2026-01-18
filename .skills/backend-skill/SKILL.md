---
name: backend-skill
description: Backend development for real_deal platform using Go 1.23, Gin framework, MongoDB, Redis, MinIO, and NATS. Use when working on backend API development, database operations, object storage, message queuing, or maintaining the Go server.
---

# Backend Development (Go)

## Tech Stack

- **Language**: Go 1.23.0
- **Framework**: Gin v1.10.1
- **Databases**: MongoDB (primary), Redis (cache/sessions)
- **Object Storage**: MinIO v7.0.60
- **Message Queue**: NATS 2.10
- **Config**: godotenv

## Project Structure

```
cmd/
  server/main.go           # Entry point
  seed/main.go            # Database seeding
internal/
  config/config.go         # Configuration management
  db/
    mongo.go               # MongoDB connection
    redis.go               # Redis connection
  handlers/                # API route handlers
    types.go              # Shared data types
    auth.go               # Authentication
    explore.go            # Explore endpoint
    jobs.go               # Job listings
    projects.go           # Project listings
    dealroom.go           # Deal room API
    pitch.go              # Pitch page API
    # ... other handlers
  storage/storage.go       # MinIO interface
```

## Data Models

### Core Types (from `internal/handlers/types.go`)

```go
type MediaAsset struct {
    ID         string    `json:"id"`
    Type       string    `json:"type"`
    Title      string    `json:"title"`
    Key        string    `json:"key"`
    ContentURL string    `json:"contentUrl"`
    CreatedAt  time.Time `json:"createdAt"`
}

type Job struct {
    ID       string   `json:"id"`
    Title    string   `json:"title"`
    Location string   `json:"location"`
    Level    string   `json:"level"`
    Salary   string   `json:"salary"`
    Skills   []string `json:"skills"`
}

type Company struct {
    ID          string   `json:"id"`
    Name        string   `json:"name"`
    Description string   `json:"description"`
    Verified    bool     `json:"verified"`
    Tags        []string `json:"tags"`
}

type ExploreResponse struct {
    Projects []Project `json:"projects"`
    Products []Product `json:"products"`
    Posts    []Post    `json:"posts"`
    Jobs     []Job     `json:"jobs"`
    Companies []Company `json:"companies"`
}
```

## Key Patterns

### Handler Structure

All handlers follow this pattern:

```go
package handlers

import (
    "context"
    "net/http"
    "github.com/gin-gonic/gin"
    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/mongo"
)

type JobHandler struct{ DB *mongo.Database }

func NewJob(db *mongo.Database) *JobHandler { return &JobHandler{DB: db} }

func (h *JobHandler) List(c *gin.Context) {
    ctx := context.Background()
    cur, err := h.DB.Collection("jobs").Find(ctx, bson.D{}, nil)
    if err != nil { c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()}); return }
    var items []Job
    for cur.Next(ctx) { var j Job; _ = cur.Decode(&j); items = append(items, j) }
    c.JSON(http.StatusOK, items)
}
```

### Authentication Pattern

```go
type AuthHandler struct{ DB *mongo.Database }

func NewAuth(db *mongo.Database) *AuthHandler { return &AuthHandler{DB: db} }

func (h *AuthHandler) Login(c *gin.Context) {
    var req loginReq
    if err := c.ShouldBindJSON(&req); err != nil { c.JSON(http.StatusBadRequest, gin.H{"error": "bad request"}); return }
    ctx := context.Background()
    var u map[string]any
    err := h.DB.Collection("users").FindOne(ctx, bson.M{"email": req.Email}).Decode(&u)
    if err != nil { c.JSON(http.StatusUnauthorized, gin.H{"error": "not found"}); return }
    id, _ := u["id"].(string)
    c.SetCookie("uid", id, 86400*7, "/", "localhost", false, true)
    c.JSON(http.StatusOK, u)
}

func (h *AuthHandler) Me(c *gin.Context) {
    uid, err := c.Cookie("uid")
    if err != nil { c.JSON(http.StatusUnauthorized, gin.H{"error": "unauth"}); return }
    ctx := context.Background()
    var u map[string]any
    err = h.DB.Collection("users").FindOne(ctx, bson.M{"id": uid}).Decode(&u)
    if err != nil { c.JSON(http.StatusUnauthorized, gin.H{"error": "unauth"}); return }
    c.JSON(http.StatusOK, u)
}
```

### Configuration

```go
// Load config with config.Load()
cfg := config.Load()

// Environment variables:
// MONGO_URI, MONGO_DB
// REDIS_ADDR, REDIS_PASSWORD
// MINIO_ENDPOINT, MINIO_ACCESS_KEY, MINIO_SECRET_KEY, MINIO_BUCKET
// SERVER_ADDR
```

### CORS Setup

```go
r.Use(cors.New(cors.Config{
    AllowOrigins:     []string{"http://localhost:3000", "http://127.0.0.1:3000"},
    AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
    AllowHeaders:     []string{"Content-Type", "Authorization", "X-Requested-With", "Accept", "Origin"},
    ExposeHeaders:    []string{"Set-Cookie"},
    AllowCredentials: true,
}))
```

## Adding New Endpoints

1. Define data types in `internal/handlers/types.go`
2. Create handler in `internal/handlers/` following the pattern
3. Register route in `cmd/server/main.go`
4. Add seeds in `seeds/` directory

## Available Collections

- `users` - User accounts and profiles
- `projects` - Project listings
- `products` - Product listings
- `posts` - Blog posts
- `jobs` - Job listings
- `companies` - Company profiles
- `pitch_pages` - Pitch pages
- `deal_rooms` - Deal rooms
- `investors` - Investor profiles
- `company_verifications` - Verification records
- `job_compliance` - Job compliance records
- `content_moderation` - Content moderation records

## Common Tasks

### Add New API Endpoint
```bash
# 1. Create handler file
touch internal/handlers/yourfeature.go

# 2. Define handler
type YourHandler struct{ DB *mongo.Database }
func NewYour(db *mongo.Database) *YourHandler { return &YourHandler{DB: db} }

# 3. Implement methods
func (h *YourHandler) List(c *gin.Context) {
    // Implementation
}

# 4. Register in main.go
r.GET("/api/your-endpoint", handlers.NewYour(mongo.DB).List)
```

### Seed Database
```bash
# Build and run seed
go build -o seed ./cmd/seed
./seed

# Or with Docker
docker-compose --profile seed up seed
```

### Run Development Server
```bash
# Start services
docker-compose up -d

# Run backend
go run cmd/server/main.go
```

## Testing

```bash
# Run tests
go test ./...

# Run specific package tests
go test ./internal/handlers

# Run with coverage
go test -cover ./...
```
