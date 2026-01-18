package main

import (
    "context"
    "encoding/json"
    "fmt"
    "log"
    "os"
    "path/filepath"

    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"
    "real_deal/internal/config"
    "real_deal/internal/db"
)

type fileList struct{ Paths []string }

func main() {
    cfg := config.Load()
    mongo, err := db.NewMongo(cfg)
    if err != nil { log.Fatalf("mongo error: %v", err) }
    ctx := context.Background()

    seedDir := "seeds"
    files, err := os.ReadDir(seedDir)
    if err != nil { log.Fatalf("read seeds: %v", err) }

    for _, f := range files {
        if f.IsDir() { continue }
        path := filepath.Join(seedDir, f.Name())
        if err := seedFile(ctx, mongo.DB, path); err != nil {
            log.Printf("seed %s error: %v", path, err)
        } else {
            log.Printf("seeded %s", path)
        }
    }
}

func seedFile(ctx context.Context, db *mongo.Database, path string) error {
    // collection name from filename before first dot
    base := filepath.Base(path)
    coll := base
    if i := indexOf(base, '.'); i > 0 { coll = base[:i] }

    b, err := os.ReadFile(path)
    if err != nil { return err }

    var docs []map[string]any
    if err := json.Unmarshal(b, &docs); err != nil { return err }

    c := db.Collection(coll)
    for _, d := range docs {
        // idempotent upsert by external_id if present, else by _id if provided
        filter := bson.M{}
        if v, ok := d["external_id"]; ok { filter["external_id"] = v } else if v, ok := d["id"]; ok { filter["id"] = v }
        if len(filter) == 0 { filter["_seed_hash"] = fmt.Sprintf("%s_%p", coll, &d) }
        _, err := c.UpdateOne(ctx, filter, bson.M{"$set": d}, &options.UpdateOptions{Upsert: boolPtr(true)})
        if err != nil { return err }
    }
    return nil
}

func indexOf(s string, ch byte) int {
    for i := 0; i < len(s); i++ { if s[i] == ch { return i } }
    return -1
}

func boolPtr(b bool) *bool { return &b }