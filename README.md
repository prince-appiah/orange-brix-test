![orange-brix-test](https://socialify.git.ci/prince-appiah/orange-brix-test/image?descriptionEditable=&font=Inter&forks=1&issues=1&language=1&name=1&owner=1&pattern=Circuit%20Board&pulls=1&stargazers=1&theme=Dark)

<!-- Getting Started -->

## :toolbox: Getting Started

<!-- Prerequisites -->

### :bangbang: Prerequisites

This project uses Yarn as package manager

```bash
 npm install --global yarn
```

<!-- Env Variables -->

<!-- Installation -->

<!-- Run Locally -->

### :running: Run Project

Clone the project

```bash
  git clone https://github.com/prince-appiah/orange-brix-test.git
```

Go to the project directory

```bash
  cd orange-brix-test
```

Install dependencies

```bash
  yarn install
```

Start the server

```bash
  yarn dev
```

### :book: API Endpoints

This project was documented with Swagger UI. Visit `http://localhost:5000/` in your browser (after running the server) to view the available endpoints

Protected endpoints require an `Authorization` header to passed in the request, with the value `Bearer ${token}` where token is provided after user login

### 🔒 API Security

This project uses JWT for route protection
