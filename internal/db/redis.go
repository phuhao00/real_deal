package db

import (
    "context"
    "real_deal/internal/config"

    "github.com/redis/go-redis/v9"
)

type Redis struct{ Client *redis.Client }

func NewRedis(cfg *config.Config) *Redis {
    cli := redis.NewClient(&redis.Options{
        Addr:     cfg.RedisAddr,
        Password: cfg.RedisPassword,
        DB:       0,
    })
    return &Redis{Client: cli}
}

func (r *Redis) Ping(ctx context.Context) error { return r.Client.Ping(ctx).Err() }