import{a as ue}from"./chunk-VKRGKQX6.js";import{a as le}from"./chunk-U2KI6PSQ.js";import{a as ae}from"./chunk-VQLAA2B3.js";import{a as se}from"./chunk-NDAHUKLJ.js";import{a as re}from"./chunk-JWWHVUZO.js";import{a as te}from"./chunk-F6MBCUBG.js";import{u as ne,v as ie,w as oe,y as ce}from"./chunk-NGUZVOSX.js";import{a as W,d as ee}from"./chunk-GJJVJTXG.js";import"./chunk-CSO4ZWHK.js";import{U as Y,V as J,W as Q,ga as K,ha as X,ia as Z,u as q}from"./chunk-IBYGZ3TV.js";import{Ga as I,Ia as h,Ma as R,N as A,Ob as B,Qb as G,Ta as m,Tb as H,Ua as f,V as k,Va as M,W as L,Wa as E,X as x,Xa as N,Y as O,Za as z,ab as v,cb as F,cc as $,fc as U,nb as S,oa as g,ob as j,pa as p,ub as V,wb as y}from"./chunk-ICF7HI7T.js";import"./chunk-ENQRHBTS.js";var T=u=>({cursor:u});function de(u,d){if(u&1){let D=z();E(0),m(1,"li",20)(2,"a",16),v("click",function(){let n=k(D).index,t=F();return L(t.currentPage===n+1?null:t.handlePagination(n+1))}),S(3),f()(),N()}if(u&2){let D=d.index,e=F();g(),h("active",e.currentPage===D+1)("ngStyle",y(3,T,e.currentPage===D+1?"":"pointer")),g(2),j(D+1)}}var Ze=(()=>{let d=class d{constructor(e,n,t,o,l,P,C){this.TransactionService=e,this.fb=n,this.route=t,this.loaderService=o,this.toastrService=l,this.utilService=P,this.localStorageService=C,this.payoutsList=[],this.access=null,this.accessModule=null,this.accessSubModule=null,this.currentUserRole=this.utilService.getCurrentUserRole(),this.paramsubscriptions=[],this.context={componentParent:this},this.columnDefs=[],this.defaultColDef={filter:!0},this.rowSelection="multiple",this.paginationPageSize=10,this.paginationPageSizeSelector=[10,20,50],this.themeClass="ag-theme-quartz",this.totalPages=1,this.currentPage=1,this.status=[{label:"Done",value:"done"},{label:"Rejected",value:"rejected"}],this.onPaginationChanged=r=>{console.log("onPaginationPageLoaded")},this.onGridReady=r=>{this.gridApi=r.api,this.getAllDeposite()},this.dateRangeValidator=r=>{let s=r.get("creationDateFrom")?.value,c=r.get("creationDateTo")?.value;s&&c&&new Date(c)<new Date(s)?r.get("creationDateTo")?.setErrors({dateRangeError:!0}):r.get("creationDateTo")?.setErrors(null)},this.handlePagination=r=>{this.currentPage=r,this.payoutsList=[],this.getAllDeposite()},this.getAllDeposite=()=>{let r=i=>{this.loaderService.hideLoader(),i&&i.success&&i.data&&i.data.length&&(this.rowData=i.data,this.payoutsList=i.data||[],this.currentPage=i.currentPage,this.totalPages=i.totalPages)},s=i=>{this.loaderService.hideLoader(),this.payoutsList=[]};this.loaderService.showLoader();let c={pageQuery:this.currentPage,pageSize:this.paginationPageSize,type:"Withdrawal"};this.TransactionService.getAll(c,r,s)},this.handleToggleEvent=(r,s)=>{let c=a=>{a&&a.success?(this.toastrService.showSuccess("Success!",a.message),this.loaderService.hideLoader(),this.getAllDeposite()):(this.loaderService.hideLoader(),this.toastrService.showError("Error!",a&&a?.message?a?.message:"Error while saving role record."))},i=a=>{this.loaderService.hideLoader(),this.toastrService.showError("Error!",a.error&&a.error?.errors?.msg?a.error.errors.msg:"Error while saving role record.")};this.loaderService.showLoader(),r&&(r.status=s,this.TransactionService.updateTransaction(r,c,i))};let w=this.route.data.subscribe(r=>{if(this.accessModule=r.module,this.accessSubModule=r.subModule,this.accessModule){let s=this.localStorageService.getValue("user")?.permissions?JSON.parse(this.localStorageService.getValue("user").permissions):re.permissionList;if(s&&s.length){let c=s.filter(i=>i.key===this.accessModule)[0];c&&c.submodule&&c.submodule.length?this.access=c.submodule.filter(i=>i.key===this.accessSubModule)[0].access:this.access=c.access,this.access=this.access[this.currentUserRole],this.access&&this.access.view?(this.columnDefs=[{headerName:"#",filter:!1,sortable:!1,valueFormatter:i=>`${i.node.data.id}`,suppressMovable:!0},{headerName:"Merchant",valueFormatter:i=>`${i.node.data.merchantInfo.merchantname+"- ("+i.node.data.merchantInfo?.mode+")"||"-"}`,suppressMovable:!0},{field:"createdAt",filter:"agDateColumnFilter",valueFormatter:i=>{let a=new Date(i.value);return ue(a,"yyyy-dd-MM HH:mm:ss")},filterParams:{comparator:(i,a)=>{if(!a)return-1;let _=new Date(a),b=new Date(_.getFullYear(),_.getMonth(),_.getDate());return i.getTime()===b.getTime()?0:b<i?-1:b>i?1:0}}},{headerName:"Amount",field:"amount",suppressMovable:!0},{headerName:"Status",field:"status",suppressMovable:!0},{headerName:"Account Number",field:"accountNumber",suppressMovable:!0},{headerName:"Account Name",field:"accountName",suppressMovable:!0}],this.access?.edit&&this.columnDefs.push({headerName:"Action",filter:!1,sortable:!1,valueFormatter:i=>`${i.node.data}`,cellRenderer:ae,cellRendererParams:{specificId:"toggleButton",onClick:this.onButtonClick.bind(this)}}),this.getAllDeposite()):(this.toastrService.showWarning("Warning!","You donot have permission to view this page. Please contact to administrator!"),this.utilService.goto("/dashboard"))}}});this.paramsubscriptions.push(w)}ngOnInit(){this.buildForm()}handleRefreshEvent(){this.getAllDeposite()}onButtonClick(e,n){this.handleToggleEvent(e,n)}ngOnDestroy(){try{if(this.paramsubscriptions)for(let e=0;e<this.paramsubscriptions.length;e++)this.paramsubscriptions[e].unsubscribe()}catch(e){console.error(e)}try{this.params&&this.params.unsubscribe()}catch(e){console.error(e)}}buildForm(e){this.payoutsForm=this.fb.group({account:[e&&e.account?e.account:"Account"],currency:[e&&e.currency?e.currency:"Currency"],status:[e&&e.status?e.status:"Status"],operationAmountFrom:[e&&e.operationAmountFrom?e.operationAmountFrom:null],operationAmountTo:[e&&e.operationAmountTo?e.operationAmountTo:null],creationDateFrom:[e&&e.creationDateFrom?e.creationDateFrom:null],creationDateTo:[e&&e.creationDateTo?e.creationDateTo:null]},{validators:this.dateRangeValidator})}getHoursDifference(e,n,t){let o=new Date(e),P=(t!=="Processing"?new Date(n):new Date).getTime()-o.getTime(),C=Math.floor(P/1e3),w=Math.floor(C/3600),r=Math.floor(C%3600/60),s=C%60;return`${this.pad(w)}:${this.pad(r)}:${this.pad(s)} Hrs`}pad(e){return e.toString().padStart(2,"0")}numSequence(e){return Array(e)}handleFilterEvent(){let e=this.payoutsForm.value;return this.payoutsList=this.payoutsList.filter(n=>{let t=!0;if(e.account!==void 0&&n.account!==void 0&&e.account!=="Account"){let o=n.account.toLowerCase().includes(e.account.toLowerCase());t=t&&o}if(e.currency!==void 0&&n.currency!==void 0&&e.currency!=="Currency"){let o=n.currency.toLowerCase().includes(e.currency.toLowerCase());t=t&&o}if(e.status!==void 0&&n.status!==void 0&&e.status!=="Status"){let o=n.status.toLowerCase().includes(e.status.toLowerCase());t=t&&o}if(e.operationAmountFrom!==void 0&&e.operationAmountFrom!==null&&n.amount!==void 0&&n.amount!==null){let o=n.amount>=e.operationAmountFrom;t=t&&o}if(e.operationAmountTo!==void 0&&e.operationAmountTo!==null&&n.amount!==void 0&&n.amount!==null){let o=n.amount<=e.operationAmountTo;t=t&&o}if(e.creationDateFrom!==void 0&&e.creationDateFrom!==null&&n.created_at!==void 0&&n.created_at!==null){let o=new Date(n.created_at),l=new Date(e.creationDateFrom);t=t&&o>=l}if(e.creationDateTo!==void 0&&e.creationDateTo!==null&&n.created_at!==void 0&&n.created_at!==null){let o=new Date(n.created_at),l=new Date(e.creationDateTo);t=t&&o<=l}return t}),this.payoutsList}};d.\u0275fac=function(n){return new(n||d)(p(le),p(ne),p($),p(W),p(ce),p(te),p(ee))},d.\u0275cmp=A({type:d,selectors:[["app-payouts"]],standalone:!0,features:[V],decls:25,vars:21,consts:[["breakpoint","md",1,"payouts-container"],[1,"justify-content-center"],["lg","12","xl","12"],[1,"example-wrapper"],[1,"example-header"],[2,"margin-top","6px"],["cButton","","color","light",3,"click"],["fill","#000000","height","1rem","width","1rem","version","1.1","id","Layer_1","xmlns","http://www.w3.org/2000/svg",0,"xmlns","xlink","http://www.w3.org/1999/xlink","viewBox","0 0 383.748 383.748",0,"xml","space","preserve","stroke","#ffffff"],["id","SVGRepo_bgCarrier","stroke-width","0"],["id","SVGRepo_tracerCarrier","stroke-linecap","round","stroke-linejoin","round"],["id","SVGRepo_iconCarrier"],["d","M62.772,95.042C90.904,54.899,137.496,30,187.343,30c83.743,0,151.874,68.13,151.874,151.874h30 C369.217,81.588,287.629,0,187.343,0c-35.038,0-69.061,9.989-98.391,28.888C70.368,40.862,54.245,56.032,41.221,73.593 L2.081,34.641v113.365h113.91L62.772,95.042z"],["d","M381.667,235.742h-113.91l53.219,52.965c-28.132,40.142-74.724,65.042-124.571,65.042 c-83.744,0-151.874-68.13-151.874-151.874h-30c0,100.286,81.588,181.874,181.874,181.874c35.038,0,69.062-9.989,98.391-28.888 c18.584-11.975,34.707-27.145,47.731-44.706l39.139,38.952V235.742z"],[2,"float","right"],["align","end","size","sm"],["cPageItem","",3,"disabled","ngStyle"],["cPageLink","",3,"click","routerLink"],[4,"ngFor","ngForOf"],[1,"data-table"],[2,"width","100%","height","500px",3,"paginationChanged","gridReady","columnDefs","defaultColDef","rowSelection","paginationPageSize","paginationPageSizeSelector","pagination","suppressPaginationPanel","suppressScrollOnNewData","rowData","context"],["cPageItem","",3,"active","ngStyle"]],template:function(n,t){n&1&&(m(0,"c-container",0)(1,"c-row",1)(2,"c-col",2)(3,"div",3)(4,"div",4)(5,"div",5)(6,"button",6),v("click",function(){return t.handleRefreshEvent()}),x(),m(7,"svg",7),M(8,"g",8)(9,"g",9),m(10,"g",10)(11,"g"),M(12,"path",11)(13,"path",12),f()()()(),O(),m(14,"div",13)(15,"c-pagination",14)(16,"li",15)(17,"a",16),v("click",function(){return t.handlePagination(t.currentPage-1)}),S(18,"Previous"),f()(),I(19,de,4,5,"ng-container",17),m(20,"li",15)(21,"a",16),v("click",function(){return t.handlePagination(t.currentPage+1)}),S(22,"Next"),f()()()()()(),m(23,"div",18)(24,"ag-grid-angular",19),v("paginationChanged",function(l){return t.onPaginationChanged(l)})("gridReady",function(l){return t.onGridReady(l)}),f()()()()()()),n&2&&(g(16),h("disabled",t.currentPage===1)("ngStyle",y(17,T,t.currentPage===1?"":"pointer")),g(3),h("ngForOf",t.numSequence(t.totalPages)),g(),h("disabled",t.currentPage===t.totalPages)("ngStyle",y(19,T,t.currentPage===t.totalPages?"":"pointer")),g(4),R(t.themeClass),h("columnDefs",t.columnDefs)("defaultColDef",t.defaultColDef)("rowSelection",t.rowSelection)("paginationPageSize",t.paginationPageSize)("paginationPageSizeSelector",t.paginationPageSizeSelector)("pagination",!0)("suppressPaginationPanel",!0)("suppressScrollOnNewData",!0)("rowData",t.rowData)("context",t.context))},dependencies:[se,Z,X,U,K,H,B,G,Y,ie,oe,Q,J,q],styles:[".payouts-container[_ngcontent-%COMP%]   .b-strong[_ngcontent-%COMP%]{line-height:2.5}.payouts-container[_ngcontent-%COMP%]   .header-container[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center}.payouts-container[_ngcontent-%COMP%]   .right-header[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin-left:10px}.payouts-container[_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%]     .ag-cell-value.ag-cell.ag-cell-not-inline-editing.ag-cell-normal-height.ag-column-last.ag-cell-focus{overflow:visible}.payouts-container[_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%]     .ag-row{z-index:0}.payouts-container[_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%]     .ag-row.ag-row-focus{z-index:1}.example-wrapper[_ngcontent-%COMP%]{display:flex;flex-direction:column;height:100%}#myGrid[_ngcontent-%COMP%]{flex:1 1 0px;width:100%}.example-header[_ngcontent-%COMP%]{font-family:Verdana,Geneva,Tahoma,sans-serif;font-size:13px;margin-bottom:5px}.value[_ngcontent-%COMP%]{margin-right:20px;font-weight:700;width:50px;display:inline-block;text-align:right;padding-right:2px}"]});let u=d;return u})();export{Ze as PayoutsComponent};