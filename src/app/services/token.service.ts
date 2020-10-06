import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, of} from "rxjs";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {flatMap, map} from "rxjs/operators";
import {Router} from "@angular/router";
import Client from "../models/Client";

const loginUrl = `${environment.apiUrl}/login`;
const profileUrl = `${environment.apiUrl}/client`;
const authorization = 'Authorization';
const bearer = 'Bearer ';

export interface LoginForm {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private readonly _token = new BehaviorSubject<string | undefined>(undefined);
  private readonly _error = new BehaviorSubject<string | undefined>(undefined);
  private readonly _headers = new HttpHeaders({
    'Access-Control-Allow-Origin': `${window.location.origin}`,
    'Access-Control-Allow-Headers': ['Access-Control-Allow-Origin', 'Content-Type', 'Authorization'],
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient, private router: Router) {}

  get $token(): Observable<string | undefined> {
    return this._token.asObservable().pipe(
      map(token => {
        if (token === undefined) {
          return sessionStorage.getItem('token');
        }
        return token;
      })
    );
  }

  clearAuthentication(): void {
    this._token.next(undefined);
  }

  get $authenticated(): Observable<boolean> {
    return this.$token.pipe(map(token => token !== undefined));
  }

  get $error(): Observable<string | undefined> {
    return this._error.asObservable();
  }

  public attemptFormAuthentication(form: LoginForm): Observable<boolean> {
    this._error.next(undefined);
    return this.http.post<Client>(loginUrl, form, { observe: 'response', headers: this._headers, withCredentials: true }).pipe(
      map((res: HttpResponse<any>) => {
        if (res.status === 200 && res.headers.has(authorization)) {
          const token = res.headers.get(authorization).replace(bearer, '');
          this._token.next(token);
          const client = res.body;
          localStorage.setItem('client', JSON.stringify(client));
          sessionStorage.setItem('token', token);
          this.router.navigateByUrl('/main');
          return true;
        } else {
          this._error.next('Invalid Credentials');
          this._token.next(undefined);
          this.router.navigateByUrl('/');
          return false;
        }
      }),
    )
  }
}
