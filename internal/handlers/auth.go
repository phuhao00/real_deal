package handlers

import (
    "context"
    nhtt "net/http"

    "github.com/gin-gonic/gin"
    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/mongo"
)

type AuthHandler struct{ DB *mongo.Database }

func NewAuth(db *mongo.Database) *AuthHandler { return &AuthHandler{DB: db} }

type loginReq struct{ Email string `json:"email"` }

func (h *AuthHandler) Login(c *gin.Context) {
    var req loginReq
    if err := c.ShouldBindJSON(&req); err != nil { c.JSON(nhtt.StatusBadRequest, gin.H{"error": "bad request"}); return }
    ctx := context.Background()
    var u map[string]any
    err := h.DB.Collection("users").FindOne(ctx, bson.M{"email": req.Email}).Decode(&u)
    if err != nil { c.JSON(nhtt.StatusUnauthorized, gin.H{"error": "not found"}); return }
    id, _ := u["id"].(string)
    c.SetCookie("uid", id, 86400*7, "/", "localhost", false, true)
    nhtt.SetCookie(c.Writer, &nhtt.Cookie{Name: "uid", Value: id, Path: "/", Domain: "localhost", HttpOnly: true, SameSite: nhtt.SameSiteLaxMode})
    c.JSON(nhtt.StatusOK, u)
}

func (h *AuthHandler) Me(c *gin.Context) {
    uid, err := c.Cookie("uid")
    if err != nil { c.JSON(nhtt.StatusUnauthorized, gin.H{"error": "unauth"}); return }
    ctx := context.Background()
    var u map[string]any
    err = h.DB.Collection("users").FindOne(ctx, bson.M{"id": uid}).Decode(&u)
    if err != nil { c.JSON(nhtt.StatusUnauthorized, gin.H{"error": "unauth"}); return }
    c.JSON(nhtt.StatusOK, u)
}