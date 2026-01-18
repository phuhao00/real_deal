package handlers

import (
    "context"
    "net/http"
    "github.com/gin-gonic/gin"
    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/mongo"
)

type MediaAssetsHandler struct{ DB *mongo.Database }

func NewMediaAssets(db *mongo.Database) *MediaAssetsHandler { return &MediaAssetsHandler{DB: db} }

func (h *MediaAssetsHandler) List(c *gin.Context) {
    ctx := context.Background()
    cur, err := h.DB.Collection("media_assets").Find(ctx, bson.D{})
    if err != nil { c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()}); return }
    var items []MediaAsset
    for cur.Next(ctx) { var m MediaAsset; _ = cur.Decode(&m); items = append(items, m) }
    c.JSON(http.StatusOK, items)
}