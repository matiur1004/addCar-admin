// Resolver service for PostListItem

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationExtras } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { take, mergeMap, catchError } from 'rxjs/operators';

import { SpinnerOverlayService } from '../spinner-overlay.service';
import { ListPageWrapper } from '../../common/list-page-wrapper.model';
import { ListSettingsService } from '../list-settings.service';

import { PostService } from './post.service';
import { PostListItem } from '../../models/blog/post-list-item.model';

@Injectable()
export class PostListResolverService implements Resolve<ListPageWrapper<PostListItem>> {

  constructor(private postService: PostService, private router: Router, private spinnerService: SpinnerOverlayService, private listSettings: ListSettingsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ListPageWrapper<PostListItem> | Observable<any> | Observable<never> {
    let page = "1";
    const settings = this.listSettings.get(`/content-management/posts`);

    if (route.params['pageNum']) {
      page = route.params['pageNum'];
      this.listSettings.set(`/content-management/posts`, { page: page });
    } else if (settings && settings.page) {
      this.router.navigate([`/content-management/posts/page/${settings.page}`])
      return;
    }

    this.spinnerService.show();
    return this.postService.getPosts(+page).pipe(catchError(error => {
      this.spinnerService.hide();
      return EMPTY;
    }), mergeMap(something => {
      this.spinnerService.hide();
      if (something) {
        return of(something);
      } else {
        return EMPTY;
      }
    })
    );
  }
}
