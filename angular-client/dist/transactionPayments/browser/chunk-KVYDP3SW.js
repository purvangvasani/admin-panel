import{b as h,e as p,g as d}from"./chunk-GJJVJTXG.js";import{I as l,L as o,Wb as s,Xb as c}from"./chunk-ICF7HI7T.js";var S=(()=>{let n=class n{constructor(r,t,e){this.http=r,this.delegatorService=t,this.httpErrorHandler=e,this.apiUrl=`${h.apiUrl}`,this.httpOptions={headers:new s({"Content-Type":"application/json"})},this.handleError=this.httpErrorHandler.createHandleError("MerchantService")}getAll(r,t,e){let i=this.apiUrl+"/merchant/getAll";return this.delegatorService.post(r,i,null,t,e)}getById(r,t,e){let i=this.apiUrl+"/merchant/getById";return this.delegatorService.post(r,i,null,t,e)}add(r,t,e){let i=this.apiUrl+"/merchant/add";return this.delegatorService.post(r,i,null,t,e)}update(r,t,e){let i=this.apiUrl+"/merchant/update";return this.delegatorService.post(r,i,null,t,e)}deleteById(r,t,e){let i=this.apiUrl+"/merchant/deleteById";return this.delegatorService.post(r,i,null,t,e)}getMerchantSummaryById(r,t,e){let i=this.apiUrl+"/merchant/getMerchantSummaryById";return this.delegatorService.post(r,i,null,t,e)}getMerchantForAccounts(r,t,e){let i=this.apiUrl+"/merchant/getMerchantForAccounts";return this.delegatorService.post(r,i,null,t,e)}};n.\u0275fac=function(t){return new(t||n)(o(c),o(p),o(d))},n.\u0275prov=l({token:n,factory:n.\u0275fac,providedIn:"root"});let a=n;return a})();export{S as a};
