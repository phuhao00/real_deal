package handlers

import (
    "context"
    "net/http"
    "github.com/gin-gonic/gin"
    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/mongo"
)

type PostHandler struct{ DB *mongo.Database }

func NewPost(db *mongo.Database) *PostHandler { return &PostHandler{DB: db} }

func (h *PostHandler) List(c *gin.Context) {
    ctx := context.Background()
    cur, err := h.DB.Collection("posts").Find(ctx, bson.D{}, nil)
    if err != nil { c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()}); return }
    var items []Post
    for cur.Next(ctx) { var p Post; _ = cur.Decode(&p); items = append(items, p) }
    c.JSON(http.StatusOK, items)
}