package handlers

import (
    "context"
    "net/http"
    "github.com/gin-gonic/gin"
    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/mongo"
)

type JobSlotHandler struct{ DB *mongo.Database }

func NewJobSlot(db *mongo.Database) *JobSlotHandler { return &JobSlotHandler{DB: db} }

func (h *JobSlotHandler) Get(c *gin.Context) {
    user := c.Query("userId")
    ctx := context.Background()
    var js JobSlot
    err := h.DB.Collection("job_slots").FindOne(ctx, bson.M{"userId": user}).Decode(&js)
    if err != nil { c.JSON(http.StatusNotFound, gin.H{"error": "not found"}); return }
    c.JSON(http.StatusOK, js)
}