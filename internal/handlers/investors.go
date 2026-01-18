package handlers

import (
    "context"
    "net/http"
    "github.com/gin-gonic/gin"
    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/mongo"
)

type InvestorHandler struct{ DB *mongo.Database }

func NewInvestor(db *mongo.Database) *InvestorHandler { return &InvestorHandler{DB: db} }

func (h *InvestorHandler) List(c *gin.Context) {
    ctx := context.Background()
    cur, err := h.DB.Collection("investor_profiles").Find(ctx, bson.D{})
    if err != nil { c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()}); return }
    var items []InvestorProfile
    for cur.Next(ctx) { var ip InvestorProfile; _ = cur.Decode(&ip); items = append(items, ip) }
    c.JSON(http.StatusOK, items)
}