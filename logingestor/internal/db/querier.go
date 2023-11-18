package db

import (
	"context"

	"github.com/yashagw/logingestor/internal/db/model"
)

type DBQuerier interface {
	InsertLogEntry(context context.Context, arg *model.LogEntry) error
	SearchLogEntries(context context.Context, arg *model.SearchLogEntriesParams) ([]model.LogEntry, error)
}
