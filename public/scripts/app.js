const { of, from, throwError } = rxjs;
const { catchError, tap } = rxjs.operators;

if('serviceWorker' in navigator) {
    from(navigator.serviceWorker.register('./sw.js', {scope: './'})).pipe(
        catchError(err=> throwError('Registration Failed with ' + err)),
        tap(reg=> console.log('Registration succeeded. Scope is ' + reg.scope))
    ).subscribe(console.log);
}