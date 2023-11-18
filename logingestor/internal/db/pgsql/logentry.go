package pgsql

import (
	"context"
	"fmt"
	"strings"

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

func (provider *Provider) SearchLogEntries(ctx context.Context, params *model.SearchLogEntriesParams) ([]model.LogEntry, error) {
	var logentries []model.LogEntry

	filters := []string{}
	args := []interface{}{}

	if params.Level != "" {
		filters = append(filters, fmt.Sprintf("level = $%d", len(args)+1))
		args = append(args, params.Level)
	}

	if params.ResourceID != "" {
		filters = append(filters, fmt.Sprintf("resourceId = $%d", len(args)+1))
		args = append(args, params.ResourceID)
	}

	if params.TraceID != "" {
		filters = append(filters, fmt.Sprintf("traceId = $%d", len(args)+1))
		args = append(args, params.TraceID)
	}

	if params.Commit != "" {
		filters = append(filters, fmt.Sprintf("commit = $%d", len(args)+1))
		args = append(args, params.Commit)
	}

	if params.SpanID != "" {
		filters = append(filters, fmt.Sprintf("spanId = $%d", len(args)+1))
		args = append(args, params.SpanID)
	}

	if params.ParentResourceID != "" {
		filters = append(filters, fmt.Sprintf("parentResourceId = $%d", len(args)+1))
		args = append(args, params.ParentResourceID)
	}

	where := ""
	if len(filters) > 0 {
		where = "WHERE " + strings.Join(filters, " AND ")
	}

	query := `
    SELECT level, message, resourceId, timestamp, traceId, spanId, commit, parentResourceId
    FROM logs
    ` + where + `
	`

	fmt.Println(query)

	rows, err := provider.conn.QueryContext(ctx, query, args...)

	if err != nil {
		return nil, err
	}

	for rows.Next() {
		var logentry model.LogEntry
		err = rows.Scan(&logentry.Level, &logentry.Message, &logentry.ResourceID, &logentry.Timestamp, &logentry.TraceID, &logentry.SpanID, &logentry.Commit, &logentry.Metadata.ParentResourceID)
		if err != nil {
			return nil, err
		}
		logentries = append(logentries, logentry)
	}

	return logentries, nil
}
