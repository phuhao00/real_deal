package handlers

import (
    "context"
    "net/http"
    "github.com/gin-gonic/gin"
    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/mongo"
)

type InboxHandler struct{ DB *mongo.Database }

func NewInbox(db *mongo.Database) *InboxHandler { return &InboxHandler{DB: db} }

func (h *InboxHandler) List(c *gin.Context) {
    user := c.Query("userId")
    ctx := context.Background()
    cur, err := h.DB.Collection("inbox_items").Find(ctx, bson.M{"userId": user})
    if err != nil { c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()}); return }
    var items []map[string]any
    for cur.Next(ctx) { var m map[string]any; _ = cur.Decode(&m); items = append(items, m) }
    c.JSON(http.StatusOK, items)
}