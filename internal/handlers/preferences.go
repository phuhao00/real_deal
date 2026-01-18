package handlers

import (
    "context"
    "net/http"
    "github.com/gin-gonic/gin"
    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/mongo"
)

type PreferenceHandler struct{ DB *mongo.Database }

func NewPreference(db *mongo.Database) *PreferenceHandler { return &PreferenceHandler{DB: db} }

func (h *PreferenceHandler) Get(c *gin.Context) {
    user := c.Query("userId")
    ctx := context.Background()
    var p NotificationPreference
    err := h.DB.Collection("notification_preferences").FindOne(ctx, bson.M{"userId": user}).Decode(&p)
    if err != nil { c.JSON(http.StatusNotFound, gin.H{"error": "not found"}); return }
    c.JSON(http.StatusOK, p)
}