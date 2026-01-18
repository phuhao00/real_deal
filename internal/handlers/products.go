package handlers

import (
    "context"
    "net/http"
    "github.com/gin-gonic/gin"
    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/mongo"
)

type ProductHandler struct{ DB *mongo.Database }

func NewProduct(db *mongo.Database) *ProductHandler { return &ProductHandler{DB: db} }

func (h *ProductHandler) List(c *gin.Context) {
    ctx := context.Background()
    cur, err := h.DB.Collection("products").Find(ctx, bson.D{}, nil)
    if err != nil { c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()}); return }
    var items []Product
    for cur.Next(ctx) { var p Product; _ = cur.Decode(&p); items = append(items, p) }
    c.JSON(http.StatusOK, items)
}