# Assessment Services

This folder contains the assessment-related services with proper separation of concerns and axios for HTTP requests.

## Structure

```
services/
├── api-client.ts      # Axios configuration and interceptors
├── assessment.service.ts # Assessment API methods
├── types.ts           # TypeScript interfaces and types
├── index.ts           # Exports for easy importing
└── README.md          # This documentation
```

## Usage

### Importing Services

```typescript
import {
  AssessmentService,
  AssessmentResultData,
} from "@/features/assessment/services";
```

### Submitting an Assessment

```typescript
const response = await AssessmentService.submitAssessment(submission);
if (response.success && response.data) {
  // Handle successful submission
  console.log(response.data);
} else {
  // Handle error
  console.error(response.error);
}
```

### Fetching Assessment Results

```typescript
const response = await AssessmentService.getAssessmentResults(assessmentId);
if (response.success && response.data) {
  // Handle successful fetch
  console.log(response.data);
} else {
  // Handle error
  console.error(response.error);
}
```

### Getting Assessment Data (Simplified)

```typescript
const assessmentData = await AssessmentService.getAssessmentResultsData(
  assessmentId
);
if (assessmentData) {
  // Handle successful fetch
  console.log(assessmentData);
} else {
  // Handle error
  console.error("Failed to fetch assessment data");
}
```

## Features

- **Axios Integration**: Uses axios instead of fetch for better error handling
- **Type Safety**: Full TypeScript support with proper interfaces
- **Error Handling**: Comprehensive error handling with detailed logging
- **Interceptors**: Request/response interceptors for logging and authentication
- **Separation of Concerns**: Clean separation between API client, services, and types

## API Client Configuration

The `api-client.ts` file configures axios with:

- Base URL from environment variables
- Request/response interceptors
- Error handling
- Logging for debugging

## Error Handling

The service includes comprehensive error handling:

- Network errors
- Server errors (4xx, 5xx)
- Timeout errors
- Axios-specific error handling
