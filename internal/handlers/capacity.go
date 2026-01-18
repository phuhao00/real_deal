package handlers

import (
    "context"
    "net/http"
    "github.com/gin-gonic/gin"
    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/mongo"
)

type CapacityHandler struct{ DB *mongo.Database }

func NewCapacity(db *mongo.Database) *CapacityHandler { return &CapacityHandler{DB: db} }

func (h *CapacityHandler) List(c *gin.Context) {
    user := c.Query("userId")
    ctx := context.Background()
    cur, err := h.DB.Collection("capacity_packs").Find(ctx, bson.M{"userId": user})
    if err != nil { c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()}); return }
    var items []CapacityPack
    for cur.Next(ctx) { var cp CapacityPack; _ = cur.Decode(&cp); items = append(items, cp) }
    c.JSON(http.StatusOK, items)
}