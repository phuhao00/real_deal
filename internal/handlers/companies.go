package handlers

import (
    "context"
    "net/http"

    "github.com/gin-gonic/gin"
    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/mongo"
)

type CompanyHandler struct{ DB *mongo.Database }

func NewCompany(db *mongo.Database) *CompanyHandler { return &CompanyHandler{DB: db} }

func (h *CompanyHandler) Get(c *gin.Context) {
    id := c.Param("id")
    ctx := context.Background()
    var co Company
    err := h.DB.Collection("companies").FindOne(ctx, bson.M{"id": id}).Decode(&co)
    if err != nil { c.JSON(http.StatusNotFound, gin.H{"error": "not found"}); return }
    c.JSON(http.StatusOK, co)
}