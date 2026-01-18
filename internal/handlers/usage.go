package handlers

import (
    "context"
    "net/http"
    "github.com/gin-gonic/gin"
    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/mongo"
)

type UsageHandler struct{ DB *mongo.Database }

func NewUsage(db *mongo.Database) *UsageHandler { return &UsageHandler{DB: db} }

func (h *UsageHandler) Get(c *gin.Context) {
    user := c.Query("userId")
    ctx := context.Background()
    var u Usage
    err := h.DB.Collection("usage_meters").FindOne(ctx, bson.M{"userId": user}).Decode(&u)
    if err != nil { c.JSON(http.StatusNotFound, gin.H{"error": "not found"}); return }
    c.JSON(http.StatusOK, u)
}