import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import * as Sentry from '@sentry/browser';

export function handleHttpResponseError(
  err: HttpErrorResponse
): Observable<never> {
  Sentry.captureException(err);
  return throwError(`App error - message: ${err.message}`);
}
