package handlers

import (
    "context"
    "net/http"
    "github.com/gin-gonic/gin"
    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/mongo"
)

type UserHandler struct{ DB *mongo.Database }

func NewUser(db *mongo.Database) *UserHandler { return &UserHandler{DB: db} }

func (h *UserHandler) Get(c *gin.Context) {
    id := c.Param("id")
    ctx := context.Background()
    var u map[string]any
    err := h.DB.Collection("users").FindOne(ctx, bson.M{"id": id}).Decode(&u)
    if err != nil { c.JSON(http.StatusNotFound, gin.H{"error": "not found"}); return }
    c.JSON(http.StatusOK, u)
}