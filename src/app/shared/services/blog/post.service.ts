// Service for processing server-side calls, related to PostViewModel

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { map } from "rxjs/internal/operators/map";
import { catchError } from "rxjs/internal/operators/catchError";

import { SpinnerOverlayService } from "../spinner-overlay.service";
import { BaseService } from '../../common/base.service';
import { ListPageWrapper } from '../../common/list-page-wrapper.model';
import { PostViewModel } from "../../models/blog/post-view-model.model";
import { PostListItem } from "../../models/blog/post-list-item.model";


@Injectable()
export class PostService extends BaseService {

  baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private spinnerService: SpinnerOverlayService) {
    super();
    this.baseUrl = baseUrl;
  }

  createPost(): PostViewModel {
    return new PostViewModel();
  }

  getPost(uID: string): Observable<PostViewModel> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    return this.http.get<PostViewModel>(this.baseUrl + "api/post/" + uID, options)
      .pipe(map(res => {
        return res;
      }),
        catchError(err => this.handleError(err)));
  }

  savePost(item: PostViewModel): Observable<PostViewModel> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    const s = JSON.stringify(item);
    return this.http.post<PostViewModel>(this.baseUrl + "api/post/", s, options)
      .pipe(map(res => {
        return res;
      }),
        catchError(err => this.handleError(err)));
  }

  clonePost(uID: string): Observable<PostViewModel> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    return this.http.post<PostViewModel>(this.baseUrl + "api/post/clone/" + uID, null, options)
      .pipe(map(res => {
        return res;
      }),
        catchError(err => this.handleError(err)));
  }

  getPosts(pageNum: number): Observable<ListPageWrapper<PostListItem>> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };

    return this.http.get<ListPageWrapper<PostListItem>>(this.baseUrl + "api/post/page/" + pageNum, options)
      .pipe(map(res => {
        return res;
      }),
        catchError(err => this.handleError(err)));
  }

  deletePost(uID: string): Observable<any> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    this.spinnerService.show("Deleting Post");
    return this.http.delete(this.baseUrl + "api/post/" + uID, options)
      .pipe(map(res => {
        this.spinnerService.hide();
        return res;
      }),
        catchError(err => {
          this.spinnerService.hide();
          return this.handleError(err);
        }));
  }




}
