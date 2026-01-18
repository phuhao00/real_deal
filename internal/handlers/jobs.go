package handlers

import (
    "context"
    "net/http"

    "github.com/gin-gonic/gin"
    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/mongo"
)

type JobHandler struct{ DB *mongo.Database }

func NewJob(db *mongo.Database) *JobHandler { return &JobHandler{DB: db} }

func (h *JobHandler) List(c *gin.Context) {
    ctx := context.Background()
    cur, err := h.DB.Collection("jobs").Find(ctx, bson.D{}, nil)
    if err != nil { c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()}); return }
    var items []Job
    for cur.Next(ctx) { var j Job; _ = cur.Decode(&j); items = append(items, j) }
    c.JSON(http.StatusOK, items)
}