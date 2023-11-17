package db

import (
	"context"

	"github.com/yashagw/logingestor/db/model"
)

type DBQuerier interface {
	InsertLogEntry(context context.Context, arg model.CreateLogEntryRequest) error
}
