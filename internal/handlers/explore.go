package handlers

import (
    "context"
    "net/http"

    "github.com/gin-gonic/gin"
    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/mongo"
)

type ExploreHandler struct{ DB *mongo.Database }

func NewExplore(db *mongo.Database) *ExploreHandler { return &ExploreHandler{DB: db} }

func (h *ExploreHandler) Get(c *gin.Context) {
    ctx := context.Background()
    var resp ExploreResponse

    // Load collections with simple limits
    projCur, _ := h.DB.Collection("projects").Find(ctx, bson.D{}, nil)
    for projCur.Next(ctx) {
        var p Project
        _ = projCur.Decode(&p)
        resp.Projects = append(resp.Projects, p)
    }
    prodCur, _ := h.DB.Collection("products").Find(ctx, bson.D{}, nil)
    for prodCur.Next(ctx) {
        var p Product
        _ = prodCur.Decode(&p)
        resp.Products = append(resp.Products, p)
    }
    postCur, _ := h.DB.Collection("posts").Find(ctx, bson.D{}, nil)
    for postCur.Next(ctx) {
        var p Post
        _ = postCur.Decode(&p)
        resp.Posts = append(resp.Posts, p)
    }
    jobCur, _ := h.DB.Collection("jobs").Find(ctx, bson.D{}, nil)
    for jobCur.Next(ctx) {
        var j Job
        _ = jobCur.Decode(&j)
        resp.Jobs = append(resp.Jobs, j)
    }
    compCur, _ := h.DB.Collection("companies").Find(ctx, bson.D{}, nil)
    for compCur.Next(ctx) {
        var co Company
        _ = compCur.Decode(&co)
        resp.Companies = append(resp.Companies, co)
    }

    c.JSON(http.StatusOK, resp)
}