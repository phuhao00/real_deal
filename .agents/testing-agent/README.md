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
- Unit tests for handlers (`internal/handlers/`)
- Integration tests for database operations
- API endpoint tests
- Storage (MinIO) tests
- Authentication flow tests

### Frontend (Next.js/React)
- Component unit tests (Jest)
- Integration tests (React Testing Library)
- API integration tests
- Snapshot tests for UI components
- Accessibility tests (jest-axe)

### End-to-End (E2E)
- User registration/login flow
- Job posting workflow
- Company verification process
- Pitch page creation
- Deal room access

## Test Frameworks

### Backend
```go
// Example: handler test
func TestJobList(t *testing.T) {
    handler := NewJob(mockDB)
    w := httptest.NewRecorder()
    c, _ := gin.CreateTestContext(w)

    handler.List(c)

    assert.Equal(t, 200, w.Code)
}
```

### Frontend
```typescript
// Example: component test
test('displays job list', () => {
  render(<JobList jobs={mockJobs} />)
  expect(screen.getByText('Developer')).toBeInTheDocument()
})
```

### E2E
```typescript
// Example: Playwright test
test('user can login', async ({ page }) => {
  await page.goto('/login')
  await page.fill('email', 'test@example.com')
  await page.click('button[type="submit"]')
  await expect(page).toHaveURL('/dashboard')
})
```

## Coverage Targets

### Minimum Coverage
- Backend: 80% line coverage
- Frontend: 75% line coverage
- Critical paths: 95% coverage

### Critical Paths
- Authentication/authorization
- Payment/billing flows
- Data storage/retrieval
- File uploads
- Company verification

## Test Data Management

### Fixtures
- `seeds/*.json` - Initial data
- Mock MongoDB responses
- Mock Redis cache data
- Mock MinIO file storage

### Test Database
- Separate test database
- Clean state before each test
- Rollback transactions after tests
- Isolated test environment

## Workflow

### Continuous Integration
1. Trigger on PR
2. Run unit tests (fast)
3. Run integration tests (medium)
4. Run E2E tests (slow)
5. Generate coverage report
6. Comment on PR with results

### Manual Testing
```bash
# Backend tests
go test ./...

# Frontend tests
npm test

# E2E tests
npx playwright test
```

## Integration Points
- GitHub Actions CI/CD
- Code coverage badges
- Test result notifications
- PR check status
