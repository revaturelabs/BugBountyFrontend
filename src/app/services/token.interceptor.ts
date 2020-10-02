import {Injectable} from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenService} from "./token.service";
import {flatMap} from "rxjs/operators";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method === 'post' && req.url.endsWith('/login')) {
      return next.handle(req);
    }
    return this.tokenService.$token.pipe(
      flatMap(token => {
        let headers = req.headers;
        if (token !== undefined) {
          headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin': `${window.location.origin}`,
            'Access-Control-Allow-Headers': ['Access-Control-Allow-Origin', 'Content-Type', 'Authorization'],
            'Content-Type': 'application/json'
          });
        }
        return next.handle(req.clone({ headers }));
      }),
    )
  }
}
