package handlers

import (
    "context"
    "net/http"
    "github.com/gin-gonic/gin"
    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/mongo"
)

type PitchHandler struct{ DB *mongo.Database }

func NewPitch(db *mongo.Database) *PitchHandler { return &PitchHandler{DB: db} }

func (h *PitchHandler) Get(c *gin.Context) {
    id := c.Param("id")
    ctx := context.Background()
    var p PitchPage
    err := h.DB.Collection("pitch_pages").FindOne(ctx, bson.M{"id": id}).Decode(&p)
    if err != nil { c.JSON(http.StatusNotFound, gin.H{"error": "not found"}); return }
    c.JSON(http.StatusOK, p)
}