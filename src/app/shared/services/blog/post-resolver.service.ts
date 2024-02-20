// Resolver service for PostViewModel

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { PostViewModel } from '../../models/blog/post-view-model.model';

import { SpinnerOverlayService } from '../spinner-overlay.service';
import { PostService } from './post.service';


@Injectable()
export class PostResolverService implements Resolve<PostViewModel> {

  constructor(private postService: PostService, private spinnerService: SpinnerOverlayService) { }

  resolve(route: ActivatedRouteSnapshot): PostViewModel | Observable<PostViewModel> | Observable<never> {
    if (route.params['uid'] && route.params['uid'] !== 'new') {
      this.spinnerService.show();
      return this.postService.getPost(route.params['uid']).pipe(catchError(() => {
        this.spinnerService.hide();
        return EMPTY;
      }), mergeMap(something => {
        if (something) {
          this.spinnerService.hide();
          return of(something);
        } else {
          this.spinnerService.hide();
          return EMPTY;
        }
      })
      );
    }
    else {
      return this.postService.createPost();
    }
  }
}
