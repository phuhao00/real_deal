package storage

import (
    "bytes"
    "context"
    "net/url"
    "time"

    "github.com/minio/minio-go/v7"
    "github.com/minio/minio-go/v7/pkg/credentials"
    "real_deal/internal/config"
)

type Object struct {
    Key  string
    Size int64
    URL  string
}

type Store interface {
    Put(ctx context.Context, key string, data []byte, contentType string) error
    Presign(ctx context.Context, key string, exp time.Duration) (string, error)
    EnsureBucket(ctx context.Context) error
}

type MinioStore struct {
    cli    *minio.Client
    bucket string
}

func NewMinio(cfg *config.Config) (*MinioStore, error) {
    endpoint := cfg.MinioEndpoint
    // ensure scheme
    if endpoint != "" && !hasScheme(endpoint) {
        endpoint = "http://" + endpoint
    }
    u, _ := url.Parse(endpoint)
    cli, err := minio.New(u.Host, &minio.Options{
        Creds:  credentials.NewStaticV4(cfg.MinioAccessKey, cfg.MinioSecretKey, ""),
        Secure: u.Scheme == "https",
    })
    if err != nil {
        return nil, err
    }
    return &MinioStore{cli: cli, bucket: cfg.MinioBucket}, nil
}

func (s *MinioStore) EnsureBucket(ctx context.Context) error {
    exists, err := s.cli.BucketExists(ctx, s.bucket)
    if err != nil { return err }
    if !exists { return s.cli.MakeBucket(ctx, s.bucket, minio.MakeBucketOptions{}) }
    return nil
}

func (s *MinioStore) Put(ctx context.Context, key string, data []byte, contentType string) error {
    _, err := s.cli.PutObject(ctx, s.bucket, key,
        bytes.NewReader(data), int64(len(data)), minio.PutObjectOptions{ContentType: contentType})
    return err
}

func (s *MinioStore) Presign(ctx context.Context, key string, exp time.Duration) (string, error) {
    reqParams := make(url.Values)
    u, err := s.cli.PresignedGetObject(ctx, s.bucket, key, exp, reqParams)
    if err != nil { return "", err }
    return u.String(), nil
}

func hasScheme(e string) bool { return len(e) > 7 && (e[:7] == "http://" || (len(e) > 8 && e[:8] == "https://")) }