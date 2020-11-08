import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, ReplaySubject } from 'rxjs';
import { Job } from '../../models/job.model';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { handleHttpResponseError } from 'src/app/utils/handleHttpResponseError';

@Injectable({ providedIn: 'root' })
export class JobsService {
  private jobs: Job[];
  private filteredJobs$: Subject<Job[]> = new ReplaySubject<Job[]>(1);

  constructor(
    private angularFirestore: AngularFirestore,
    private httpClient: HttpClient
  ) {}

  getSearchResults(): Observable<Job[]> {
    return this.filteredJobs$.asObservable();
  }

  sendPostRequest(skills: any): Observable<any> {
    let q = '';
    if (skills.length > 0) {
      const map1 = skills.map(
        (x) => `skill%2Frole%3A${x.toLowerCase()}%20and%20`
      );
      q = `/?q=${map1}`;
    }
    q = q.replace(/\,/g, '');

    return this.httpClient.post<any>(
      `https://search.torre.co/opportunities/_search${q}`,
      { title: 'Angular POST Request Example' }
    );
  }

  applyJob(userID: string, jobID: string, jobData: any): Promise<any> {
    try {
      const data = {
        ...jobData,
        userID,
        jobID,
        createdBy: userID,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        status: 'ACTIVE',
      };

      return new Promise<any>((resolve, reject) => {
        this.angularFirestore
          .collection('appliedJobs')
          .add(data)
          .then(
            (res) => {},
            (err) => reject(err)
          );
      });
    } catch (err) {
      handleHttpResponseError(err);
    }
  }
}
