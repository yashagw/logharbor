package pgsql

import (
	"context"
	"fmt"

	"github.com/yashagw/logingestor/internal/db/model"
)

func (provider *Provider) InsertLogEntry(ctx context.Context, logentry *model.LogEntry) error {
	var id int
	err := provider.conn.QueryRowContext(ctx, `
		INSERT INTO logs (level, message, resourceId, timestamp, traceId, spanId, commit, parentResourceId)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
	`, logentry.Level, logentry.Message, logentry.ResourceID, logentry.Timestamp, logentry.TraceID, logentry.SpanID, logentry.Commit, logentry.Metadata.ParentResourceID).Scan(&id)
	fmt.Println("inserted logentry with id", id)
	return err
}
