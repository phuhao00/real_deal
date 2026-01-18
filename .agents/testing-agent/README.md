# Testing Agent

## Purpose
Automated testing agent that generates, runs, and maintains tests for the real_deal platform including unit tests, integration tests, and end-to-end tests for both Go backend and Next.js frontend.

## Responsibilities

### Test Generation
- Generate unit tests for Go handlers
- Create React component tests
- Build integration tests for API endpoints
- Develop E2E tests for critical user flows
- Update tests when code changes

### Test Execution
- Run test suite on every commit
- Execute tests in CI/CD pipeline
- Run specific tests on demand
- Parallel test execution for speed
- Coverage reporting

### Test Maintenance
- Fix broken tests
- Update tests for new features
- Refactor test code
- Manage test data fixtures
- Optimize test performance

## Test Types

### Backend (Go)

#### Handler Unit Tests
```go
package handlers

import (
    "net/http"
    "net/http/httptest"
    "testing"
    "github.com/gin-gonic/gin"
    "github.com/stretchr/testify/assert"
    "github.com/stretchr/testify/mock"
    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/mongo"
)

// Mock database for testing
type MockDB struct {
    mock.Mock
}

func (m *MockDB) Collection(name string) *mongo.Collection {
    args := m.Called(name)
    return args.Get(0).(*mongo.Collection)
}

func TestJobHandler_List(t *testing.T) {
    // Setup
    mockDB := new(MockDB)
    handler := NewJob(mockDB.DB)
    w := httptest.NewRecorder()
    c, _ := gin.CreateTestContext(w)
    c.Request = httptest.NewRequest("GET", "/api/jobs", nil)

    // Execute
    handler.List(c)

    // Assert
    assert.Equal(t, http.StatusOK, w.Code)
}
```

#### Integration Tests
```go
func TestJobHandler_Integration(t *testing.T) {
    // Setup test database
    testURI := "mongodb://localhost:27017/test_db"
    mongo, _ := db.NewMongo(&config.Config{MongoURI: testURI, MongoDB: "test"})

    // Insert test data
    testJob := Job{ID: "test_001", Title: "Test Job"}
    mongo.DB.Collection("jobs").InsertOne(context.Background(), testJob)

    // Test
    handler := NewJob(mongo.DB)
    w := httptest.NewRecorder()
    c, _ := gin.CreateTestContext(w)
    handler.List(c)

    // Assert
    assert.Equal(t, http.StatusOK, w.Code)

    // Cleanup
    mongo.DB.Collection("jobs").DeleteMany(context.Background(), bson.M{})
}
```

### Frontend (Next.js/React)

#### Component Tests
```typescript
// components/__tests__/Card.test.tsx
import { render, screen } from '@testing-library/react'
import Card from '../Card'

describe('Card', () => {
  it('renders title and subtitle', () => {
    render(<Card title="Test Title" subtitle="Test Subtitle" />)

    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument()
  })

  it('does not render subtitle when not provided', () => {
    render(<Card title="Test Title" />)

    expect(screen.queryByText(/subtitle/i)).not.toBeInTheDocument()
  })
})
```

#### Page Tests
```typescript
// app/__tests__/page.test.tsx
import { render, screen } from '@testing-library/react'
import Page from '../page'

// Mock API client
jest.mock('../lib/api', () => ({
  api: jest.fn().mockResolvedValue({
    projects: [],
    products: [],
    posts: [],
    jobs: [],
    companies: []
  })
}))

describe('Explore Page', () => {
  it('renders feed layout', async () => {
    render(await Page())

    expect(screen.getByText('动态')).toBeInTheDocument()
  })
})
```

### End-to-End Tests

#### Playwright E2E Tests
```typescript
// e2e/explore.spec.ts
import { test, expect } from '@playwright/test'

test('explore page loads and displays content', async ({ page }) => {
  await page.goto('http://localhost:3000')

  // Check page title
  await expect(page).toHaveTitle(/Real Deal/)

  // Check feed items
  const feedItems = await page.locator('.feed-row').count()
  expect(feedItems).toBeGreaterThan(0)

  // Check filter functionality
  await page.fill('input[placeholder*="搜索"]', 'React')
  await page.press('input[placeholder*="搜索"]', 'Enter')

  // Check filtered results
  const filteredItems = await page.locator('.feed-row').count()
  expect(filteredItems).toBeGreaterThan(0)
})

test('login flow', async ({ page }) => {
  await page.goto('http://localhost:3000/login')

  await page.fill('input[name="email"]', 'test@example.com')
  await page.click('button[type="submit"]')

  // Should redirect to home
  await expect(page).toHaveURL('http://localhost:3000')
})
```

## Test Frameworks

### Backend Testing
```bash
# Run all tests
go test ./...

# Run specific package
go test ./internal/handlers

# Run with coverage
go test -cover ./...

# Run with verbose output
go test -v ./...

# Run benchmarks
go test -bench=. ./...
```

### Frontend Testing
```bash
cd web

# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- Card.test.tsx
```

### E2E Testing
```bash
cd web

# Install Playwright (first time)
npx playwright install

# Run E2E tests
npx playwright test

# Run tests in headed mode (show browser)
npx playwright test --headed

# Run tests in UI mode
npx playwright test --ui
```

## Coverage Targets

### Minimum Coverage
- **Backend**: 80% line coverage
- **Frontend**: 75% line coverage
- **Critical paths**: 95% coverage

### Critical Paths to Cover
- Authentication/authorization
- API endpoints
- Data validation
- Error handling
- File upload/download

## Test Data Management

### Fixtures

#### Go Test Fixtures
```go
// internal/handlers/fixtures.go
package handlers

var TestJob = Job{
    ID:       "job_test_001",
    Title:    "Test Job",
    Location: "Test City",
    Level:    "Senior",
    Salary:   "100k",
    Skills:   []string{"Go", "MongoDB"},
}

func SeedTestJobs(db *mongo.Database) error {
    jobs := []interface{}{TestJob}
    _, err := db.Collection("jobs").InsertMany(context.Background(), jobs)
    return err
}
```

#### Frontend Test Fixtures
```typescript
// components/__tests__/fixtures.ts
export const mockJobs = [
  {
    id: 'job_001',
    title: 'Frontend Engineer',
    location: 'Shanghai',
    level: 'Senior',
    salary: '30k-40k',
    skills: ['React', 'TypeScript']
  }
]

export const mockProjects = [
  {
    id: 'proj_001',
    title: 'Test Project',
    summary: 'Test summary',
    tags: ['React', 'Next.js']
  }
]
```

## Workflow

### Continuous Integration
```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      # Backend tests
      - name: Run backend tests
        run: |
          go test -v -cover ./...
          go tool cover -html=coverage.out -o coverage.html

      # Frontend tests
      - name: Run frontend tests
        run: |
          cd web
          npm install
          npm test -- --coverage

      # E2E tests
      - name: Run E2E tests
        run: |
          cd web
          npx playwright test
```

### Manual Testing Commands
```bash
# Backend tests
go test ./... -v -cover

# Frontend tests
cd web && npm test

# Full test suite
bash .agents/testing-agent/scripts/run-all-tests.sh
```

## Scripts

### Run All Tests
```bash
#!/bin/bash
# .agents/testing-agent/scripts/run-all-tests.sh

echo "Running all tests..."

# Backend tests
echo "=== Backend Tests ==="
go test ./... -cover
BACKEND_STATUS=$?

# Frontend tests
echo "=== Frontend Tests ==="
cd web && npm test
FRONTEND_STATUS=$?

cd ..

# Report
if [ $BACKEND_STATUS -eq 0 ] && [ $FRONTEND_STATUS -eq 0 ]; then
    echo "✓ All tests passed!"
    exit 0
else
    echo "✗ Some tests failed"
    exit 1
fi
```

### Generate Coverage Report
```bash
#!/bin/bash
# .agents/testing-agent/scripts/generate-coverage.sh

echo "Generating coverage reports..."

# Backend coverage
go test -coverprofile=coverage.out ./...
go tool cover -html=coverage.out -o coverage-backend.html

# Frontend coverage
cd web
npm test -- --coverage
cd ..

echo "Coverage reports generated!"
echo "Backend: coverage-backend.html"
echo "Frontend: web/coverage/"
```

## Integration Points
- GitHub Actions CI/CD
- Code coverage badges
- Test result notifications
- PR check status

