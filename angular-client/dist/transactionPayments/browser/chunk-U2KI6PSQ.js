import{b as p,e as h,g as d}from"./chunk-GJJVJTXG.js";import{I as s,L as o,Wb as l,Xb as c}from"./chunk-ICF7HI7T.js";var j=(()=>{let i=class i{constructor(r,t,e){this.http=r,this.delegatorService=t,this.httpErrorHandler=e,this.apiUrl=`${p.apiUrl}`,this.httpOptions={headers:new l({"Content-Type":"application/json"})},this.handleError=this.httpErrorHandler.createHandleError("AuthService")}getAll(r,t,e){let n=this.apiUrl+"/transactionRequest/getAll";return this.delegatorService.post(r,n,null,t,e)}addTransaction(r,t,e){let n=this.apiUrl+"/transactionRequest/addTransaction";return this.delegatorService.post(r,n,null,t,e)}updateTransaction(r,t,e){let n=this.apiUrl+"/transactionRequest/updateTransaction";return this.delegatorService.post(r,n,null,t,e)}getbyMerchantId(r,t,e){let n=this.apiUrl+"/transactionRequest/getbyMerchantId";return this.delegatorService.post(r,n,null,t,e)}};i.\u0275fac=function(t){return new(t||i)(o(c),o(h),o(d))},i.\u0275prov=s({token:i,factory:i.\u0275fac,providedIn:"root"});let a=i;return a})();export{j as a};
