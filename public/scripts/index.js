// const { pluck } = rxjs.operators;
// const imgLoad = (url) => {
//   return rxjs.Observable.create(observer=>{
//     const request = new XMLHttpRequest();
//     request.open('GET', url);
//     request.responseType = 'json';

//     request.onload = ()=> {
//       if(request.status === 200) {
//         observer.next(request.response);
//         observer.complete();
//       }else {
//         observer.error(Error('Image didn\'t load successfully; error code: ' + request.statusText));
//       }
//     }

//     request.onerror = ()=>{
//       observer.error(Error('There was a network error'));
//     }

//     request.send();
//   })
// }

// imgLoad('https://localhost:9090/assets/data.json').pipe(
//   pluck('firstName')
// ).subscribe(data=>{
//   console.log(data);
// }, error=> console.error(error), ()=> console.log('Ended'));