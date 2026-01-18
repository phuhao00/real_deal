package handlers

import (
    "context"
    "net/http"
    "github.com/gin-gonic/gin"
    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/mongo"
)

type ChargeHandler struct{ DB *mongo.Database }

func NewCharge(db *mongo.Database) *ChargeHandler { return &ChargeHandler{DB: db} }

func (h *ChargeHandler) List(c *gin.Context) {
    user := c.Query("userId")
    ctx := context.Background()
    cur, err := h.DB.Collection("charges").Find(ctx, bson.M{"userId": user})
    if err != nil { c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()}); return }
    var items []Charge
    for cur.Next(ctx) { var ch Charge; _ = cur.Decode(&ch); items = append(items, ch) }
    c.JSON(http.StatusOK, items)
}