# Dyte Submission by Yash Agarwal

## Backend System Design
<img src="/public/BackendDesign.png" alt="Backend Design">

The backend system is designed to handle the ingestion and storage of multiple logs concurrently. It uses a combination of HTTP calls, Kafka, and a separate service called `dbinsertor`.

Here's how it works:

1. A client sends a request to add a log to an HTTP server.
2. The HTTP server adds the log to Kafka. Kafka serves as a buffer and a message queue, allowing the system to handle high volumes of logs without overloading the database.
3. The `dbinsertor` service continuously reads logs from Kafka and inserts them into the Postgres database.

This architecture provides several benefits:

- **Scalability**: The system can handle high volumes of logs by distributing the load between Kafka and the database.
- **Resilience**: If the database becomes unavailable, logs are not lost; they remain in Kafka until they can be inserted into the database.
- **Performance**: By decoupling the log ingestion and database insertion processes, the system can optimize each process independently, improving overall performance.

## Running the Project 
Follow these steps to run the project:

1. Clone the project:
    ```bash
    git clone https://github.com/dyte-submissions/november-2023-hiring-yashagw.git
    ```

2. Navigate to the `logingestor` folder:
    ```bash
    cd project/logingestor
    ```

3. Build the Docker images:
    ```bash
    docker-compose build
    ```

4. Start the backend services:
    ```bash
    docker-compose up
    ```

    The backend service is now running at `http://localhost:3000`.

5. In a new terminal, navigate to the `queryui` folder:
    ```bash
    cd project/queryui
    ```

6. Install the necessary npm packages:
    ```bash
    npm install
    ```

7. Start the frontend project:
    ```bash
    npm run dev
    ```

    The frontend service is now running at `http://localhost:3001`.

## Adding a Log

You can add a log by sending a POST request to `http://localhost:3000/` with the following body:

```json
{
    "level": "info",
    "message": "db instance failed to start",
    "resourceId": "server-1234",
    "timestamp": "2023-09-15T08:00:00Z",
    "traceId": "abc12345",
    "spanId": "span-1456",
    "commit": "5e5342dasf",
    "metadata": {
        "parentResourceId": "server-09879"
    }
}
```