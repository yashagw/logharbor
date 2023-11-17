CREATE TABLE logs (
    id SERIAL PRIMARY KEY,
    level VARCHAR(255),
    message TEXT,
    resourceId VARCHAR(255),
    timestamp TIMESTAMP,
    traceId VARCHAR(255),
    spanId VARCHAR(255),
    commit VARCHAR(255),
    parentResourceId VARCHAR(255)
);