# Technical Test Codifico

A web-based application leveraging an ASP.NET backend, an Angular 20 client application, and an HTML-based client
featuring D3.js for data visualization.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
    - [Backend (ASP.NET)](#backend-aspnet)
    - [Angular Client](#client-angular)
    - [D3 HTML Client](#d3-visualization-html-client)
- [How the test was performed](#how-the-test-was-performed)
---

## Getting Started

Follow the instructions below to get the project running on your local machine.

### Prerequisites

You will need the following installed on your system:

- **.NET SDK (9.0 or later)**: For running the ASP.NET backend.
- **SQL Server**: For the backend storage
- **Node.js (LTS version)**: For the Angular client.
- **Angular CLI (20.x)**: For Angular development and building.
- Any modern **Web Browser**: For running the standalone D3.js HTML client.

### Installation

#### Backend (ASP.NET)

1. Navigate to the backend's project directory. `cd /TestCodifico.Api`
2. Restore dependencies:
   ```bash
   dotnet restore
   ```
3. Build the project:
   ```bash
   dotnet build
   ```
4. Set your connection string pointing to your SQL SERVER database in appsettings.json
    > Database initialization script will run automatically the first time you start the application
5. Run the backend server:
   ```bash
   dotnet run
   ```
6. Open your browser in ` http://localhost:5228/swagger`
7. (Optional) if you want to run the test, you have to set the connection string for the test database in appsettings.Tests.json
    > Database will be automatically created before test executions and dropped after all tests are finished 

#### Client (Angular)

1. Navigate to the Angular client directory. `cd TestCodifico.Clients/SPA`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Modify environment.ts apiUrl pointing the backend url 
4. Build and serve the application:
   ```bash
   ng serve
   ```
5. Open your browser and navigate to the provided URL (typically `http://localhost:4200`).

#### D3 Visualization HTML Client

1. Locate the standalone HTML file in the project's directory. `cd TestCodifico.Clients/D3App`
2. Open the file directly in a modern web browser (e.g., Chrome, Firefox).

---

### How the test was performed

This technical test was made using Rider for the backend, WebStorm for the Angular client, and also for the D3 client
The following libraries were used:
##### Backend
- Dapper
- xUnit
- DBup
- Swagger
##### Frontend
- Angular Material
##### D3 Client
- D3