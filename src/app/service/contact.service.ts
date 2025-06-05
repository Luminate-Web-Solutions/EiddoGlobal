import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private apiUrl = 'http://localhost:3000/api/contact'; // Your Node.js endpoint

  constructor(private http: HttpClient) {}

  sendMessage(formData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Contact API error:', error);
    let errorMessage = 'An unknown error occurred.';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else if (error.status === 0) {
      errorMessage = 'Backend is unreachable.';
    } else {
      // Server-side error
      errorMessage = `Server returned code ${error.status}, message: ${error.error?.error || error.message}`;
    }

    return throwError(() => new Error(errorMessage));
  }
}
