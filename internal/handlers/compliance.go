package handlers

import (
    "context"
    "net/http"
    "github.com/gin-gonic/gin"
    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/mongo"
)

type ComplianceHandler struct{ DB *mongo.Database }

func NewCompliance(db *mongo.Database) *ComplianceHandler { return &ComplianceHandler{DB: db} }

func (h *ComplianceHandler) Job(c *gin.Context) {
    id := c.Param("jobId")
    ctx := context.Background()
    var v JobCompliance
    err := h.DB.Collection("job_compliance").FindOne(ctx, bson.M{"jobId": id}).Decode(&v)
    if err != nil { c.JSON(http.StatusNotFound, gin.H{"error": "not found"}); return }
    c.JSON(http.StatusOK, v)
}