import{b as c,e as d,g as h}from"./chunk-GJJVJTXG.js";import{I as l,L as n,Wb as a,Xb as p}from"./chunk-ICF7HI7T.js";var k=(()=>{let o=class o{constructor(r,t,e){this.http=r,this.delegatorService=t,this.httpErrorHandler=e,this.apiUrl=`${c.apiUrl}`,this.httpOptions={headers:new a({"Content-Type":"application/json"})},this.handleError=this.httpErrorHandler.createHandleError("AuthService")}getAll(r,t,e){let i=this.apiUrl+"/banks/getAll";return this.delegatorService.post(r,i,null,t,e)}getBankID(r,t,e){let i=this.apiUrl+"/banks/getBankID";return this.delegatorService.post(r,i,null,t,e)}getById(r,t,e){let i=this.apiUrl+"/banks/getById";return this.delegatorService.post(r,i,null,t,e)}add(r,t,e){let i=this.apiUrl+"/banks/add";return this.delegatorService.post(r,i,null,t,e)}update(r,t,e){let i=this.apiUrl+"/banks/update";return this.delegatorService.post(r,i,null,t,e)}deleteById(r,t,e){let i=this.apiUrl+"/banks/delete";return this.delegatorService.post(r,i,null,t,e)}};o.\u0275fac=function(t){return new(t||o)(n(p),n(d),n(h))},o.\u0275prov=l({token:o,factory:o.\u0275fac,providedIn:"root"});let s=o;return s})();export{k as a};
