# Design Bit.ly

## Functional Requirements
### Core Requirements

* Users should be able to submit a long URL and receive a shortened version.
    * Optionally, users should be able to specify a custom alias for their shortened URL.
    * Optionally, users should be able to specify an expiration date for their shortened URL.
* Users should be able to access the original URL by using the shortened URL.

### Below the line (out of scope):
* User authentication and account management.
* Analytics on link clicks (e.g., click counts, geographic data).

## Non Functional Requirements
### Core Requirements

* The system should ensure uniqueness for the short codes (no two long URLs can map to the same short URL)
* The redirection should occur with minimal delay (< 100ms)
* The system should be reliable and available 99.99% of the time (availability > consistency)
* The system should scale to support 1B shortened URLs and 100M DAU

### Below the line (out of scope):
* Data consistency in real-time analytics.
* Advanced security features like spam detection and malicious URL filtering.

## Core Entities
- Original Url
- Short Url
- User

## The API

1. 
```
// Shorten a URL
POST /urls
{
  "long_url": "https://www.example.com/some/very/long/url",
  "custom_alias": "optional_custom_alias",
  "expiration_date": "optional_expiration_date"
}
->
{
  "short_url": "http://short.ly/abc123"
}
```

2. 
```
// Redirect to Original URL
GET /{short_code}
-> HTTP 302 Redirect to the original long URL
```