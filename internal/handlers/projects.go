package handlers

import (
    "context"
    "net/http"

    "github.com/gin-gonic/gin"
    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/mongo"
)

type ProjectHandler struct{ DB *mongo.Database }

func NewProject(db *mongo.Database) *ProjectHandler { return &ProjectHandler{DB: db} }

func (h *ProjectHandler) List(c *gin.Context) {
    ctx := context.Background()
    cur, err := h.DB.Collection("projects").Find(ctx, bson.D{}, nil)
    if err != nil { c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()}); return }
    var items []Project
    for cur.Next(ctx) { var p Project; _ = cur.Decode(&p); items = append(items, p) }
    c.JSON(http.StatusOK, items)
}