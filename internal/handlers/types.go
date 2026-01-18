package handlers

import "time"

type MediaAsset struct {
    ID         string    `json:"id"`
    Type       string    `json:"type"`
    Title      string    `json:"title"`
    Key        string    `json:"key"`
    ContentURL string    `json:"contentUrl"`
    CreatedAt  time.Time `json:"createdAt"`
}

type Project struct {
    ID        string      `json:"id"`
    Title     string      `json:"title"`
    Summary   string      `json:"summary"`
    Tags      []string    `json:"tags"`
    Media     []MediaAsset `json:"media"`
}

type Product struct {
    ID      string   `json:"id"`
    Name    string   `json:"name"`
    Summary string   `json:"summary"`
    Tags    []string `json:"tags"`
    Media   []MediaAsset `json:"media"`
}

type Post struct {
    ID      string    `json:"id"`
    Title   string    `json:"title"`
    Body    string    `json:"body"`
    Tags    []string  `json:"tags"`
    Created time.Time `json:"created"`
}

type Job struct {
    ID       string   `json:"id"`
    Title    string   `json:"title"`
    Location string   `json:"location"`
    Level    string   `json:"level"`
    Salary   string   `json:"salary"`
    Skills   []string `json:"skills"`
}

type Company struct {
    ID          string   `json:"id"`
    Name        string   `json:"name"`
    Description string   `json:"description"`
    Verified    bool     `json:"verified"`
    Tags        []string `json:"tags"`
}

type ExploreResponse struct {
    Projects []Project `json:"projects"`
    Products []Product `json:"products"`
    Posts    []Post    `json:"posts"`
    Jobs     []Job     `json:"jobs"`
    Companies []Company `json:"companies"`
}

type CompanyVerification struct {
    CompanyID string `json:"companyId"`
    Level     string `json:"level"`
    Status    string `json:"status"`
}

type JobCompliance struct {
    JobID  string `json:"jobId"`
    Status string `json:"status"`
    Notes  string `json:"notes"`
}

type ContentModeration struct {
    ContentID string `json:"contentId"`
    Status    string `json:"status"`
    Notes     string `json:"notes"`
}

type NotificationPreference struct {
    UserID string            `json:"userId"`
    Prefs  map[string]string `json:"prefs"`
}

type Usage struct {
    UserID     string  `json:"userId"`
    StorageGB  float64 `json:"storageGb"`
    BandwidthGB float64 `json:"bandwidthGb"`
    TranscodeMin int   `json:"transcodeMin"`
}

type Quota struct {
    UserID       string  `json:"userId"`
    StorageLimit float64 `json:"storageLimit"`
    BandwidthLimit float64 `json:"bandwidthLimit"`
    TranscodeLimit int   `json:"transcodeLimit"`
}

type CapacityPack struct {
    ID      string  `json:"id"`
    UserID  string  `json:"userId"`
    SizeGB  float64 `json:"sizeGb"`
}

type JobSlot struct {
    UserID string `json:"userId"`
    Slots  int    `json:"slots"`
}

type Charge struct {
    ID        string  `json:"id"`
    UserID    string  `json:"userId"`
    AmountCNY float64 `json:"amountCny"`
    Reason    string  `json:"reason"`
}

type InvestorProfile struct {
    ID      string   `json:"id"`
    Name    string   `json:"name"`
    Thesis  string   `json:"thesis"`
    Stages  []string `json:"stages"`
    Regions []string `json:"regions"`
}

type PitchPage struct {
    ID      string `json:"id"`
    Title   string `json:"title"`
    Company string `json:"company"`
}

type DealRoom struct {
    ID      string `json:"id"`
    PitchID string `json:"pitchId"`
    Access  string `json:"access"`
}