package handlers

import (
    "context"
    "net/http"
    "github.com/gin-gonic/gin"
    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/mongo"
)

type VerificationHandler struct{ DB *mongo.Database }

func NewVerification(db *mongo.Database) *VerificationHandler { return &VerificationHandler{DB: db} }

func (h *VerificationHandler) Company(c *gin.Context) {
    id := c.Param("companyId")
    ctx := context.Background()
    var v CompanyVerification
    err := h.DB.Collection("company_verifications").FindOne(ctx, bson.M{"companyId": id}).Decode(&v)
    if err != nil { c.JSON(http.StatusNotFound, gin.H{"error": "not found"}); return }
    c.JSON(http.StatusOK, v)
}