import{b as c,e as d,g as h}from"./chunk-GJJVJTXG.js";import{I as s,L as l,Wb as a,Xb as p}from"./chunk-ICF7HI7T.js";var S=(()=>{let o=class o{constructor(r,t,e){this.http=r,this.delegatorService=t,this.httpErrorHandler=e,this.apiUrl=`${c.apiUrl}`,this.httpOptions={headers:new a({"Content-Type":"application/json"})},this.handleError=this.httpErrorHandler.createHandleError("AuthService")}getAll(r,t,e){let i=this.apiUrl+"/role/getAll";return this.delegatorService.post(r,i,null,t,e)}getByRoleId(r,t,e){let i=this.apiUrl+"/role/getByRoleId";return this.delegatorService.post(r,i,null,t,e)}add(r,t,e){let i=this.apiUrl+"/role/add";return this.delegatorService.post(r,i,null,t,e)}update(r,t,e){let i=this.apiUrl+"/role/update";return this.delegatorService.post(r,i,null,t,e)}deleteById(r,t,e){let i=this.apiUrl+"/role/delete";return this.delegatorService.post(r,i,null,t,e)}};o.\u0275fac=function(t){return new(t||o)(l(p),l(d),l(h))},o.\u0275prov=s({token:o,factory:o.\u0275fac,providedIn:"root"});let n=o;return n})();export{S as a};