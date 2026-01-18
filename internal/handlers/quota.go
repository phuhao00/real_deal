package handlers

import (
    "context"
    "net/http"
    "github.com/gin-gonic/gin"
    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/mongo"
)

type QuotaHandler struct{ DB *mongo.Database }

func NewQuota(db *mongo.Database) *QuotaHandler { return &QuotaHandler{DB: db} }

func (h *QuotaHandler) Get(c *gin.Context) {
    user := c.Query("userId")
    ctx := context.Background()
    var q Quota
    err := h.DB.Collection("quotas").FindOne(ctx, bson.M{"userId": user}).Decode(&q)
    if err != nil { c.JSON(http.StatusNotFound, gin.H{"error": "not found"}); return }
    c.JSON(http.StatusOK, q)
}