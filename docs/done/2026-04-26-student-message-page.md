# Student Message Page

## What Changed

- Removed the public home page's visible message submission CTA and modal.
- Added `/student` as a dedicated student-facing message submission page.
- Extracted the submission form into a reusable component that still posts to `/api/messages`.

## Why

- The public page should show the submitted lights without exposing the student submission action to general visitors.

## Verification Run

- `npm run test`
- `npm run lint`
- `npm run build`
- Confirmed `http://localhost:3000` no longer exposes the `意気込みを投稿する` text in `src`.
- Opened `http://localhost:3000/student` in Safari at desktop width and a narrow mobile-like window width.

## Residual Risks

- `/student` is still a URL-known-only page; password or shared-code access can be added later if needed.

## Follow-ups

- Decide whether the student page should be linked from private materials only, or protected with a simple studio password.
