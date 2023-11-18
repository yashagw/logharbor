CREATE TABLE IF NOT EXISTS "logs" (
    id bigserial PRIMARY KEY,
    level varchar,
    message TEXT,
    resourceId varchar,
    timestamp timestamp,
    traceId varchar,
    spanId varchar,
    commit varchar,
    parentResourceId varchar
);