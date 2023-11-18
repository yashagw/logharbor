package model

import "time"

type LogEntry struct {
	Level      string    `json:"level"`
	Message    string    `json:"message"`
	ResourceID string    `json:"resourceId"`
	Timestamp  time.Time `json:"timestamp"`
	TraceID    string    `json:"traceId"`
	SpanID     string    `json:"spanId"`
	Commit     string    `json:"commit"`
	Metadata   struct {
		ParentResourceID string `json:"parentResourceId"`
	} `json:"metadata"`
}

type SearchLogEntriesParams struct {
	Level            string   `json:"level"`
	ResourceID       string   `json:"resourceId"`
	TraceID          string   `json:"traceId"`
	Commit           string   `json:"commit"`
	SpanID           string   `json:"spanId"`
	ParentResourceID string   `json:"parentResourceId"`
	Message          []string `json:"message"`
}
