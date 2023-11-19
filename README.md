# Project Title

## Backend System Design
<img src="/public/BackendDesign.png" alt="Backend Design">

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

5. In a new terminal, navigate to the `query-ui` folder:
    ```bash
    cd project/query-ui
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