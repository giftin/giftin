import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError, config } from "rxjs";
import { map, retry, catchError } from "rxjs/operators";
import { Router } from "@angular/router";


@Injectable({ providedIn: "root" })
export class RequestManager {
  
  constructor(
    private http: HttpClient,
    private route: Router,
  ) { }

  apiUrl = 'https://beta.portal.janbazar.in/api/';

  getExecuteAPI(callurl:any, input: any = {}): Observable<any> {

    return this.http
      .get<any>(this.apiUrl + callurl, {
        headers: new HttpHeaders({
          "Content-type": "application/x-www-form-urlencoded; charset=utf-8",
        //   'Authorization': `Bearer ${this.authenticationservice.getToken()}`,
        }),
        params: input
      })
      .pipe(
        map((res: any) => {
          return res;
        }),
        retry(2),
        catchError(err => {
          if (err.status == 401) {
            this.logOut()
          }
          if (err.error instanceof ErrorEvent) {
            return err.error.message;
          } else {
          }

          if (!err.ok && err.status == 0) {
            console.log("Error");
          }

          return throwError(
            new Error("Something bad happened; please try again later.")
          );
        })
      );
  }

  postExecuteAPI(callurl:any, input?: any): Observable<any> {

    let headers = new HttpHeaders({
      "Content-Type": "application/json;charset=UTF-8",
    //   'Authorization': `Bearer ${this._authService.getToken()}`,
    });

    return this.http.post(this.apiUrl + callurl, input, { headers: headers }).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(err => {
        if (err.status == 401) {
          return throwError(JSON.stringify(err.error));
        }
        if (err.error instanceof ErrorEvent) {
          console.error("An error occurred:", err.error.message);
        } else {
          localStorage.setItem("error", JSON.stringify(err));
          // console.error(
          //   `Backend returned code ${err.status}, ` + `body was: ${err.error}`,
          //   `body was: ${JSON.stringify(err)}`
          // );
        }

        if (!err.ok && err.status == 0) {
        }
        return throwError(new Error(`${err}`));
      })
    );
  }
  deleteExecuteAPI(callurl:any): Observable<any> {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",

    });
    let options = { headers: headers };
    return this.http.delete(this.apiUrl + callurl, options).pipe(
      map((res: any) => {
        return res;
      }),
      retry(2),
      catchError(err => {
        if (err.error instanceof ErrorEvent) {
          console.error("An error occurred:", err.error.message);
        } else {
          console.error(
            `Backend returned code ${err.status}, ` + `body was: ${err.error}`,
            `body was: ${JSON.stringify(err)}`
          );
        }

        if (!err.ok && err.status == 0) {
          console.log("Error");
        }

        let values = JSON.parse(err._body);
        if (values.message == "Primary store can not be deleted") {
          return throwError(values.message);
        } else {
          return throwError(new Error(`${err.error}`));
        }
      })
    );
  }
  putExecuteAPI(callurl:any, input?: any): Observable<any> {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
    //   'Authorization': `Bearer ${this._authService.getToken()}`,

    });
    let options = { headers: headers };
    return this.http.put(this.apiUrl + callurl, input, options).pipe(
      map((res: any) => {
        return res;
      }),
      retry(2),
      catchError(err => {
        if (err.status == 401) {

        }
        if (err.error instanceof ErrorEvent) {
          console.error("An error occurred:", err.error.message);
        } else {
          console.error(
            `Backend returned code ${err.status}, ` + `body was: ${err.error}`,
            `body was: ${JSON.stringify(err)}`
          );
        }

        if (!err.ok && err.status == 0) {
          console.log("Error");
        }

        return throwError(
          new Error("Something bad happened; please try again later.")
        );
      })
    );
  }
  patchExecuteAPI(callurl:any, input?: any): Observable<any> {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",

    });
    let options = { headers: headers };
    return this.http.patch(this.apiUrl + callurl, input, options).pipe(
      map((res: any) => {
        return res;
      }),
      retry(2),
      catchError(err => {
        if (err.error instanceof ErrorEvent) {
          console.error("An error occurred:", err.error.message);
        } else {
          console.error(
            `Backend returned code ${err.status}, ` + `body was: ${err.error}`,
            `body was: ${JSON.stringify(err)}`
          );
          localStorage.setItem("error-msg", JSON.stringify(err));
        }

        if (!err.ok && err.status == 0) {
          console.log("Error");
        }

        return throwError(
          new Error("Something bad happened; please try again later.")
        );
      })
    );
  }

  logOut() {
    // throw new Error("Method not implemented.");
    // this.authService.signOut().then().catch(el => console.log(el));
    // this._authService.logout();
    // localStorage.clear();
    // this.route.navigateByUrl("/");
  }

}

