package handlers

import (
    "context"
    "net/http"
    "github.com/gin-gonic/gin"
    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/mongo"
)

type ModerationHandler struct{ DB *mongo.Database }

func NewModeration(db *mongo.Database) *ModerationHandler { return &ModerationHandler{DB: db} }

func (h *ModerationHandler) Content(c *gin.Context) {
    id := c.Param("id")
    ctx := context.Background()
    var v ContentModeration
    err := h.DB.Collection("content_moderation").FindOne(ctx, bson.M{"contentId": id}).Decode(&v)
    if err != nil { c.JSON(http.StatusNotFound, gin.H{"error": "not found"}); return }
    c.JSON(http.StatusOK, v)
}