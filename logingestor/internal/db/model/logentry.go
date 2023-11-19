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

type LogEntryResult struct {
	Level            string    `json:"level"`
	Message          string    `json:"message"`
	ResourceID       string    `json:"resourceId"`
	Timestamp        time.Time `json:"timestamp"`
	TraceID          string    `json:"traceId"`
	SpanID           string    `json:"spanId"`
	Commit           string    `json:"commit"`
	ParentResourceID string    `json:"parentResourceId"`
}

type SearchLogEntriesParams struct {
	Levels           []string  `json:"levels"`
	ResourceID       string    `json:"resourceId"`
	TraceID          string    `json:"traceId"`
	Commit           string    `json:"commit"`
	SpanID           string    `json:"spanId"`
	ParentResourceID string    `json:"parentResourceId"`
	Message          string    `json:"message"`
	From             time.Time `json:"from"`
	To               time.Time `json:"to"`
}
