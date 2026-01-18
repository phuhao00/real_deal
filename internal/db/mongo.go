package db

import (
    "context"
    "time"

    "real_deal/internal/config"
    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"
)

type Mongo struct {
    Client *mongo.Client
    DB     *mongo.Database
}

func NewMongo(cfg *config.Config) (*Mongo, error) {
    ctx, cancel := context.WithTimeout(context.Background(), config.Timeout())
    defer cancel()

    cli, err := mongo.Connect(ctx, options.Client().ApplyURI(cfg.MongoURI))
    if err != nil {
        return nil, err
    }
    db := cli.Database(cfg.MongoDB)
    return &Mongo{Client: cli, DB: db}, nil
}

func (m *Mongo) Close(ctx context.Context) error {
    ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
    defer cancel()
    return m.Client.Disconnect(ctx)
}