# LogHarbor

## About Me

- Name: Yash Agarwal
- Email: yash.ag@outlook.com
- LinkedIn: [yashagw](https://www.linkedin.com/in/yashagw/)
- Resume: [Google Drive Link](https://drive.google.com/file/d/1GQ9fbXXdbGKR66xLCeZJAmXP7mwRr7O0/view?usp=drive_link)

## Tech Stack

The project uses the following technologies:

### Backend
- Golang
- PostgreSQL
- Kafka

### Frontend
- Next.js
- Shadcn
- TailwindCSS
- React Hook Form
- Zod
- React Table
- React Context API

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
    cd november-2023-hiring-yashagw/logingestor
    ```

3. Give executable permission to .sh script
    ```
    chmod +x wait-for.sh
    chmod +x start.sh
    ```

4. Build the Docker images:
    ```bash
    docker-compose build
    ```

5. Start the backend services:
    ```bash
    docker-compose up
    ```

    The backend service is now running at `http://localhost:3000`.

6. In a new terminal, navigate to the `queryui` folder:
    ```bash
    cd november-2023-hiring-yashagw/queryui
    ```

7. Install the necessary npm packages:
    ```bash
    npm install
    ```

8. Start the frontend project:
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

## Frontend Features
<img src="/public/FrontendDesign.png" alt="Frontend Design">


The frontend of the application provides a user-friendly interface to interact with the logs. It includes the following features:

- **Log Filtering**: Users can filter logs based on various parameters such as level, commit, spanId, parentResourceId, resourceId, traceId, and timestamps. This allows users to quickly find specific logs based on their needs.

- **Full-Text Search**: The application supports full-text search on the message field, enabling users to search for logs containing specific words or phrases.

- **Date Range Search**: Users can search for logs within specific date ranges. This is particularly useful for narrowing down logs to a specific time period.

- **Pagination**: The application supports pagination, which improves performance by only loading a subset of logs at a time.

- **Error Handling**: The application uses toasts to display errors to the user. This provides a better user experience by clearly communicating when something goes wrong.

- **Column Toggle**: Users can toggle selected columns, allowing them to customize the view based on their preferences.

- **Multiple Filters**: The application allows combining multiple filters, providing users with a powerful tool to narrow down the logs.

- **Clear and View Selected Filters**: Users can clear out selected filters and view the currently applied filters, providing a clear and intuitive user interface.

All the filtering is done on the backend side, which improves performance by reducing the amount of data that needs to be sent to the frontend and processed.

These features provide a powerful and user-friendly interface for interacting with logs, making it easy for users to find the information they need.