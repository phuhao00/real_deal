package handlers

import (
    "context"
    "net/http"
    "github.com/gin-gonic/gin"
    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/mongo"
)

type DealRoomHandler struct{ DB *mongo.Database }

func NewDealRoom(db *mongo.Database) *DealRoomHandler { return &DealRoomHandler{DB: db} }

func (h *DealRoomHandler) Get(c *gin.Context) {
    id := c.Param("id")
    ctx := context.Background()
    var d DealRoom
    err := h.DB.Collection("deal_rooms").FindOne(ctx, bson.M{"id": id}).Decode(&d)
    if err != nil { c.JSON(http.StatusNotFound, gin.H{"error": "not found"}); return }
    c.JSON(http.StatusOK, d)
}