import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { Observable, BehaviorSubject, Subject, ReplaySubject, of } from 'rxjs';
import { Job } from '../../models/job.model';

@Injectable({ providedIn: 'root' })
export class JobsService {
  private jobs: Job[];
  private filteredJobs$: Subject<Job[]> = new ReplaySubject<Job[]>(1);

  constructor(private httpClient: HttpClient) {}

  getSearchResults(): Observable<Job[]> {
    return this.filteredJobs$.asObservable();
  }

  sendPostRequest(data: any): Observable<any> {
    return this.httpClient.post<any>(
      'https://search.torre.co/opportunities/_search/?q=skill%2Frole%3Aios',
      { title: 'Angular POST Request Example' }
    );
  }

  // search(searchTerm: string): Observable<void> {
  //   return this.fetchJobs().pipe(
  //     tap((jobs: Job[]) => {
  //       jobs = jobs.filter((job) =>
  //         job.objective.toLowerCase().includes(searchTerm)
  //       );
  //       this.filteredJobs$.next(jobs);
  //     }),
  //     map(() => void 0)
  //   );
  // }

  private fetchJobs(): Observable<Job[]> {
    // return cached jobs
    if (this.jobs) {
      return of(this.jobs);
    }

    this.httpClient
      .post<any>(
        'https://search.torre.co/opportunities/_search/?q=skill%2Frole%3Aios',
        { title: 'Angular POST Request Example' }
      )
      .subscribe((data) => {
        console.log(data.results);
        this.jobs = data.results;
      });

    // fetch and cache jobs
    // return this.httpClient
    //   .post<any>(
    //     'https://search.torre.co/opportunities/_search/?q=skill%2Frole%3Aios',
    //     { title: 'Angular POST Request' }
    //   )
    //   .pipe(tap((jobs: Job[]) => (this.jobs = jobs)));
  }
}
