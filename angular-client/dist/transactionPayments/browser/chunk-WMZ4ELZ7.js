import{a as ge}from"./chunk-MOM55J64.js";import{a as ue}from"./chunk-JWWHVUZO.js";import{a as de}from"./chunk-F6MBCUBG.js";import{v as me,w as pe,y as _e}from"./chunk-NGUZVOSX.js";import{a as G,d as ce}from"./chunk-GJJVJTXG.js";import"./chunk-CSO4ZWHK.js";import{A as q,C as W,F as Y,G as J,H as Q,I as K,V as X,W as Z,b as H,ba as ee,ca as te,da as ie,ea as ne,fa as re,ga as oe,ha as ae,ia as se,qa as le,u as U,v as z,z as $}from"./chunk-IBYGZ3TV.js";import{Ga as v,Ia as m,N as B,Ob as F,Pb as O,Qb as A,Ta as i,Tb as N,Ua as a,V as g,Va as C,W as h,Wa as w,X as b,Xa as D,Y as P,Za as S,ab as _,cb as p,cc as R,fc as j,nb as l,oa as c,ob as x,pa as k,pb as T,ub as V,vb as L,wb as y}from"./chunk-ICF7HI7T.js";import"./chunk-ENQRHBTS.js";var I=n=>({cursor:n}),ke=()=>({placement:"bottom-start"});function Se(n,d){if(n&1){let t=S();i(0,"button",10),_("click",function(){g(t);let s=p();return h(s.handleCreateEvent())}),b(),i(1,"svg",11),C(2,"path",12),a(),l(3," Create "),a()}}function be(n,d){if(n&1){let t=S();w(0),i(1,"li",13)(2,"a",5),_("click",function(){let s=g(t).index,r=p();return h(r.currentPage===s+1?null:r.handlePagination(s+1))}),l(3),a()(),D()}if(n&2){let t=d.index,e=p();c(),m("active",e.currentPage===t+1)("ngStyle",y(3,I,e.currentPage===t+1?"":"pointer")),c(2),x(t+1)}}function Ce(n,d){n&1&&(w(0),i(1,"tr",14)(2,"td",15),l(3,"No Data available"),a()(),D())}function xe(n,d){if(n&1){let t=S();i(0,"li")(1,"a",22),_("click",function(){g(t);let s=p(2).$implicit,r=p(2);return h(r.editBank(s))}),b(),C(2,"svg",23),l(3,"Edit "),a()()}}function we(n,d){if(n&1){let t=S();i(0,"li")(1,"a",22),_("click",function(){g(t);let s=p(2).$implicit,r=p(2);return h(r.toggleDeleteModal(s))}),b(),C(2,"svg",24),l(3,"Delete "),a()()}}function De(n,d){if(n&1&&(i(0,"c-dropdown",18)(1,"button",19),b(),C(2,"svg",20),a(),P(),i(3,"ul",21),v(4,xe,4,0,"li",9)(5,we,4,0,"li",9),a()()),n&2){let t=p(3);m("popperOptions",L(4,ke)),c(),m("caret",!1),c(3),m("ngIf",t.access.edit),c(),m("ngIf",t.access.delete)}}function ye(n,d){if(n&1&&(i(0,"tr")(1,"th",16),l(2),a(),i(3,"td"),l(4),a(),i(5,"td"),l(6),a(),i(7,"td"),v(8,De,6,5,"c-dropdown",17),a()()),n&2){let t=d.$implicit,e=p(2);c(2),x(t.bankId),c(2),x(t.bankName),c(2),x(t.active?"Yes":"No"),c(2),m("ngIf",e.access.edit||e.access.delete)}}function Me(n,d){if(n&1&&(w(0),v(1,ye,9,4,"tr",6),D()),n&2){let t=p();c(),m("ngForOf",t.bankList)}}function Ee(n,d){if(n&1){let t=S();i(0,"div")(1,"c-modal",25,0),_("visibleChange",function(s){g(t);let r=p();return h(r.handleDeleteToggleChange(s))}),i(3,"c-modal-header")(4,"h5",26),l(5,"Delete Bank "),i(6,"small"),l(7),a()(),i(8,"button",27),_("click",function(){g(t);let s=p();return h(s.closeDeleteModal())}),a()(),i(9,"c-modal-body"),l(10,"Are you sure you want to delete the bank?"),a(),i(11,"c-modal-footer")(12,"button",28),_("click",function(){g(t);let s=p();return h(s.closeDeleteModal())}),l(13," Close "),a(),i(14,"button",29),_("click",function(){g(t);let s=p();return h(s.deleteRecord())}),l(15,"Delete"),a()()()()}if(n&2){let t=p();c(),m("@.disabled",!0)("visible",t.deleteModalVisible),c(6),T("(",t.deleteData==null?null:t.deleteData.bankName,")")}}var lt=(()=>{let d=class d{constructor(e,s,r,M,he,ve){this.toastrService=e,this.bankService=s,this.utilService=r,this.route=M,this.localStorageService=he,this.loaderService=ve,this.deleteModalVisible=!1,this.bankList=[],this.totalPages=1,this.currentPage=1,this.access=null,this.accessModule=null,this.accessSubModule=null,this.currentUserRole=this.utilService.getCurrentUserRole(),this.paramsubscriptions=[],this.paginationPageSize=10,this.getAll=()=>{let u=o=>{this.loaderService.hideLoader(),o&&o.success?o.data&&o.data.length?(this.bankList=o.data,this.currentPage=o.currentPage,this.totalPages=o.totalPages):this.bankList=[]:this.toastrService.showError("Error!",o.message)},f=o=>{this.loaderService.hideLoader(),this.toastrService.showError("Error!",o.error&&o.error?.errors?.msg?o.error.errors.msg:"Error while validating credentials.")};this.loaderService.showLoader(),this.bankService.getAll({pageQuery:this.currentPage,pageSize:this.paginationPageSize},u,f)},this.handlePagination=u=>{this.currentPage=u,this.bankList=[],this.getAll()},this.closeDeleteModal=()=>{this.deleteData=null,this.deleteModalVisible=!this.deleteModalVisible},this.deleteRecord=()=>{let u=o=>{this.loaderService.hideLoader(),o&&o.success?(this.toastrService.showSuccess("Success!",o.message),this.closeDeleteModal(),this.getAll()):this.toastrService.showError("Error!",o.message)},f=o=>{this.loaderService.hideLoader(),this.toastrService.showError("Error!",o.error&&o.error?.errors?.msg?o.error.errors.msg:"Error while deleting record.")};this.loaderService.showLoader(),this.bankService.deleteById({bankId:this.deleteData.bankId},u,f)},this.editBank=u=>{this.utilService.goto("/banks/edit",{bankId:u.bankId,ref:u.ref})};let fe=this.route.data.subscribe(u=>{if(this.accessModule=u.module,this.accessSubModule=u.subModule,this.accessModule){let f=this.localStorageService.getValue("user")?.permissions?JSON.parse(this.localStorageService.getValue("user").permissions):ue.permissionList;if(f&&f.length){let o=f.filter(E=>E.key===this.accessModule)[0];o&&o.submodule&&o.submodule.length?this.access=o.submodule.filter(E=>E.key===this.accessSubModule)[0].access:this.access=o.access,this.access=this.access[this.currentUserRole],this.access&&this.access.view?this.getAll():(this.toastrService.showWarning("Warning!","You donot have permission to view this page. Please contact to administrator!"),this.utilService.goto("/dashboard"))}}});this.paramsubscriptions.push(fe)}ngOnInit(){}ngOnDestroy(){try{if(this.paramsubscriptions)for(let e=0;e<this.paramsubscriptions.length;e++)this.paramsubscriptions[e].unsubscribe()}catch(e){console.error(e)}try{this.params&&this.params.unsubscribe()}catch(e){console.error(e)}}numSequence(e){return Array(e)}toggleDeleteModal(e){this.deleteData=e,this.deleteModalVisible=!this.deleteModalVisible}handleDeleteToggleChange(e){this.deleteModalVisible=e}handleCreateEvent(){this.utilService.goto("/banks/add")}};d.\u0275fac=function(s){return new(s||d)(k(_e),k(ge),k(de),k(R),k(ce),k(G))},d.\u0275cmp=B({type:d,selectors:[["app-banks"]],standalone:!0,features:[V],decls:33,vars:13,consts:[["staticBackdropModal",""],[2,"margin-bottom","10px"],["cButton","","color","primary","style","float: left;",3,"click",4,"ngIf"],["align","end"],["cPageItem","",3,"disabled","ngStyle"],["cPageLink","",3,"click","routerLink"],[4,"ngFor","ngForOf"],["cTable","","hover","","responsive",""],["scope","col"],[4,"ngIf"],["cButton","","color","primary",2,"float","left",3,"click"],["width","1rem","height","1rem","viewBox","0 0 24 24","fill","#000000","xmlns","http://www.w3.org/2000/svg"],["d","M4 12H20M12 4V20","stroke","#ffffff","stroke-width","2","stroke-linecap","round","stroke-linejoin","round"],["cPageItem","",3,"active","ngStyle"],[2,"text-align","center"],["colspan","6"],["scope","row"],["variant","nav-item",3,"popperOptions",4,"ngIf"],["variant","nav-item",3,"popperOptions"],["cDropdownToggle","","aria-label","Open user menu",1,"py-0","pe-0",3,"caret"],["cIcon","","name","cilSettings",2,"height","2rem","width","2rem"],["cDropdownMenu","",1,"pt-0","w-auto"],["cDropdownItem","",2,"cursor","pointer","text-decoration","none",3,"click"],["cIcon","","name","cilPencil",1,"me-2"],["cIcon","","name","cilTrash",1,"me-2"],["backdrop","static","id","staticBackdropModal",3,"visibleChange","visible"],["cModalTitle",""],["cButtonClose","",3,"click"],["cButton","","color","secondary",3,"click"],["cButton","","color","danger",3,"click"]],template:function(s,r){s&1&&(i(0,"div",1)(1,"c-row")(2,"c-col"),v(3,Se,4,0,"button",2),a()()(),i(4,"div",1)(5,"c-card")(6,"c-card-header")(7,"h5"),l(8,"Banks List"),a()(),i(9,"c-card-body")(10,"c-pagination",3)(11,"li",4)(12,"a",5),_("click",function(){return r.handlePagination(r.currentPage-1)}),l(13,"Previous"),a()(),v(14,be,4,5,"ng-container",6),i(15,"li",4)(16,"a",5),_("click",function(){return r.handlePagination(r.currentPage+1)}),l(17,"Next"),a()()(),i(18,"table",7)(19,"thead")(20,"tr")(21,"th",8),l(22,"#"),a(),i(23,"th",8),l(24,"Bank Name"),a(),i(25,"th",8),l(26,"Is Active?"),a(),i(27,"th",8),l(28,"Action"),a()()(),i(29,"tbody"),v(30,Ce,4,0,"ng-container",9)(31,Me,2,1,"ng-container",9),a()()()()(),v(32,Ee,16,3,"div",9)),s&2&&(c(3),m("ngIf",r.access.add),c(8),m("disabled",r.currentPage===1)("ngStyle",y(9,I,r.currentPage===1?"":"pointer")),c(3),m("ngForOf",r.numSequence(r.totalPages)),c(),m("disabled",r.currentPage===r.totalPages)("ngStyle",y(11,I,r.currentPage===r.totalPages?"":"pointer")),c(15),m("ngIf",!r.bankList.length),c(),m("ngIf",r.bankList.length),c(),m("ngIf",r.deleteModalVisible))},dependencies:[N,F,O,A,ae,H,Q,J,Y,K,re,ie,ne,z,ee,te,me,se,j,oe,pe,Z,X,$,W,q,le,U],styles:[".banks-container[_ngcontent-%COMP%]   .b-strong[_ngcontent-%COMP%]{display:flex;gap:.5rem}"]});let n=d;return n})();export{lt as BanksComponent};
