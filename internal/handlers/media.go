package handlers

import (
    "context"
    "net/http"
    "time"
    "github.com/gin-gonic/gin"
    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/mongo"
    "real_deal/internal/storage"
)

type MediaHandler struct{ DB *mongo.Database; Store storage.Store }

func NewMedia(db *mongo.Database, st storage.Store) *MediaHandler { return &MediaHandler{DB: db, Store: st} }

func (h *MediaHandler) Get(c *gin.Context) {
    id := c.Param("id")
    ctx := context.Background()
    var m MediaAsset
    err := h.DB.Collection("media_assets").FindOne(ctx, bson.M{"id": id}).Decode(&m)
    if err != nil { c.JSON(http.StatusNotFound, gin.H{"error": "not found"}); return }
    url, err := h.Store.Presign(ctx, m.Key, 15*time.Minute)
    if err == nil { m.ContentURL = url }
    c.JSON(http.StatusOK, m)
}