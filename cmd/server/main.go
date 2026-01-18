package main

import (
    "context"
    "log"

    "github.com/gin-contrib/cors"
    "github.com/gin-gonic/gin"
    "real_deal/internal/config"
    "real_deal/internal/db"
    "real_deal/internal/handlers"
    "real_deal/internal/storage"
)

func main() {
    cfg := config.Load()

    mongo, err := db.NewMongo(cfg)
    if err != nil { log.Fatalf("mongo error: %v", err) }

    r := gin.Default()
    r.Use(cors.New(cors.Config{
        AllowOrigins:     []string{"http://localhost:3000", "http://127.0.0.1:3000"},
        AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
        AllowHeaders:     []string{"Content-Type", "Authorization", "X-Requested-With", "Accept", "Origin"},
        ExposeHeaders:    []string{"Set-Cookie"},
        AllowCredentials: true,
    }))

    // Services
    st, err := storage.NewMinio(cfg)
    if err != nil { log.Fatalf("minio error: %v", err) }
    if err := st.EnsureBucket(context.Background()); err != nil { log.Fatalf("bucket error: %v", err) }

    // Routes
    r.GET("/api/explore", handlers.NewExplore(mongo.DB).Get)
    r.GET("/api/projects", handlers.NewProject(mongo.DB).List)
    r.GET("/api/jobs", handlers.NewJob(mongo.DB).List)
    r.GET("/api/companies/:id", handlers.NewCompany(mongo.DB).Get)
    r.GET("/api/products", handlers.NewProduct(mongo.DB).List)
    r.GET("/api/posts", handlers.NewPost(mongo.DB).List)
    r.GET("/api/company-verifications/:companyId", handlers.NewVerification(mongo.DB).Company)
    r.GET("/api/job-compliance/:jobId", handlers.NewCompliance(mongo.DB).Job)
    r.GET("/api/content-moderation/:id", handlers.NewModeration(mongo.DB).Content)
    r.GET("/api/inbox", handlers.NewInbox(mongo.DB).List)
    r.GET("/api/notification-preferences", handlers.NewPreference(mongo.DB).Get)
    r.GET("/api/usage", handlers.NewUsage(mongo.DB).Get)
    r.GET("/api/quota", handlers.NewQuota(mongo.DB).Get)
    r.GET("/api/capacity-packs", handlers.NewCapacity(mongo.DB).List)
    r.GET("/api/job-slots", handlers.NewJobSlot(mongo.DB).Get)
    r.GET("/api/charges", handlers.NewCharge(mongo.DB).List)
    r.GET("/api/investors", handlers.NewInvestor(mongo.DB).List)
    r.GET("/api/pitch/:id", handlers.NewPitch(mongo.DB).Get)
    r.GET("/api/deal-room/:id", handlers.NewDealRoom(mongo.DB).Get)
    r.GET("/api/media/:id", handlers.NewMedia(mongo.DB, st).Get)
    r.GET("/api/media-assets", handlers.NewMediaAssets(mongo.DB).List)
    r.GET("/api/users/:id", handlers.NewUser(mongo.DB).Get)
    r.POST("/api/login", handlers.NewAuth(mongo.DB).Login)
    r.GET("/api/me", handlers.NewAuth(mongo.DB).Me)

    addr := cfg.ServerAddr
    log.Printf("server listening on %s", addr)
    if err := r.Run(addr); err != nil {
        log.Fatalf("server error: %v", err)
    }
}