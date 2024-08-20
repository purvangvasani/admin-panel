import"./chunk-6ZRW4NQ5.js";import{a as Ne}from"./chunk-VQLAA2B3.js";import{a as Re}from"./chunk-NDAHUKLJ.js";import{a as Ce}from"./chunk-PJTZ2CZ7.js";import{a as Ae,b as qe}from"./chunk-6UGNY33E.js";import{a as M}from"./chunk-WCWF2U4M.js";import{a as Ve}from"./chunk-JWWHVUZO.js";import{a as be}from"./chunk-F6MBCUBG.js";import{b as ye,c as we,d as F,e as xe,f as Ee,g as De,h as E,i as Pe,j as Fe,l as Me,o as Ie,s as Ue,v as ke,w as Le,y as Te}from"./chunk-NGUZVOSX.js";import{a as ie,b as fe,d as ve,e as Se,g as _e}from"./chunk-GJJVJTXG.js";import"./chunk-CSO4ZWHK.js";import{A as ne,C as le,ba as ae,ca as ce,da as de,ea as me,fa as ue,ga as pe,ha as he,ia as ge,u as re,v as oe,z as se}from"./chunk-IBYGZ3TV.js";import{Ga as b,I as L,Ia as m,L as D,Ma as N,N as V,Nb as W,Ob as J,Pb as K,Qb as Y,Ta as l,Tb as $,Ua as a,V as _,Va as x,W as C,Wa as R,Wb as Q,Xa as T,Xb as X,Za as P,ab as v,cb as g,cc as Z,ec as ee,fc as te,nb as u,oa as d,ob as A,pa as S,pb as q,qb as B,rb as j,sb as O,tb as z,ub as G,vb as H,wb as y}from"./chunk-ICF7HI7T.js";import"./chunk-ENQRHBTS.js";var I=(()=>{let c=class c{constructor(t,o,i){this.http=t,this.delegatorService=o,this.httpErrorHandler=i,this.apiUrl=`${fe.apiUrl}`,this.httpOptions={headers:new Q({"Content-Type":"application/json"})},this.handleError=this.httpErrorHandler.createHandleError("AuthService")}getAll(t,o,i){let p=this.apiUrl+"/user/getAll";return this.delegatorService.post(t,p,null,o,i)}getByUserId(t,o,i){let p=this.apiUrl+"/user/getByUserId";return this.delegatorService.post(t,p,null,o,i)}add(t,o,i){let p=this.apiUrl+"/user/add";return this.delegatorService.post(t,p,null,o,i)}update(t,o,i){let p=this.apiUrl+"/user/update";return this.delegatorService.post(t,p,null,o,i)}deleteById(t,o,i){let p=this.apiUrl+"/user/deleteById";return this.delegatorService.post(t,p,null,o,i)}};c.\u0275fac=function(o){return new(o||c)(D(X),D(Se),D(_e))},c.\u0275prov=L({token:c,factory:c.\u0275fac,providedIn:"root"});let n=c;return n})();var k=n=>({cursor:n}),U=n=>({border:n}),Je=()=>({standalone:!0});function Ke(n,c){n&1&&(l(0,"span",27),u(1," First Name is required"),a())}function Ye(n,c){n&1&&(l(0,"span",27),u(1," Last name is required"),a())}function $e(n,c){n&1&&(l(0,"span",27),u(1," Email is required"),a())}function Qe(n,c){n&1&&(l(0,"label",28),u(1,"Active?"),a())}function Xe(n,c){n&1&&(l(0,"div",16)(1,"div",29),x(2,"input",30),a()())}function Ze(n,c){if(n&1){let r=P();l(0,"div",12)(1,"c-card")(2,"c-card-header")(3,"h5"),u(4,"Users Form"),a()(),l(5,"c-card-body")(6,"form",13)(7,"div",14)(8,"label",15),u(9,"First Name"),a(),l(10,"div",16),x(11,"input",17),b(12,Ke,2,0,"span",18),a(),l(13,"label",15),u(14,"Last Name"),a(),l(15,"div",16),x(16,"input",19),b(17,Ye,2,0,"span",18),a()(),l(18,"div",14)(19,"label",15),u(20,"Email"),a(),l(21,"div",16),x(22,"input",20),b(23,$e,2,0,"span",18),a(),b(24,Qe,2,0,"label",21)(25,Xe,3,0,"div",22),a(),l(26,"div",23)(27,"label",15),u(28,"Role"),a(),l(29,"div",16)(30,"ng-select",24),O("ngModelChange",function(o){_(r);let i=g();return j(i.selectedRole,o)||(i.selectedRole=o),C(o)}),a()()()(),l(31,"button",25),v("click",function(){_(r);let o=g();return C(o.submit())}),u(32," Submit "),a(),l(33,"button",26),v("click",function(){_(r);let o=g();return C(o.cancel())}),u(34," Cancel "),a()()()()}if(n&2){let r=g();d(6),m("formGroup",r.userForm),d(5),m("ngStyle",y(17,U,r.userForm.controls.firstname.hasError("required")&&r.userForm.controls.firstname.touched?"2px solid red":"")),d(),m("ngIf",r.userForm.controls.firstname.hasError("required")&&r.userForm.controls.firstname.touched),d(4),m("ngStyle",y(19,U,r.userForm.controls.lastname.hasError("required")&&r.userForm.controls.lastname.touched?"2px solid red":"")),d(),m("ngIf",r.userForm.controls.lastname.hasError("required")&&r.userForm.controls.lastname.touched),d(5),m("ngStyle",y(21,U,r.userForm.controls.email.hasError("required")&&r.userForm.controls.email.touched?"2px solid red":"")),d(),m("ngIf",r.userForm.controls.email.hasError("required")&&r.userForm.controls.email.touched),d(),m("ngIf",r.editUserData==null?null:r.editUserData.userId),d(),m("ngIf",r.editUserData==null?null:r.editUserData.userId),d(5),B("ngModel",r.selectedRole),m("items",r.roleList)("multiple",!1)("clearable",!1)("ngModelOptions",H(23,Je)),d(),m("disabled",r.userForm.invalid)("ngClass",r.userForm.invalid?"btn btn-danger submit":"btn btn-primary submit"),d(2),m("ngClass","btn btn-default")}}function et(n,c){if(n&1){let r=P();R(0),l(1,"li",31)(2,"a",8),v("click",function(){let o=_(r).index,i=g();return C(i.currentPage===o+1?null:i.handlePagination(o+1))}),u(3),a()(),T()}if(n&2){let r=c.index,t=g();d(),m("active",t.currentPage===r+1)("ngStyle",y(3,k,t.currentPage===r+1?"":"pointer")),d(2),A(r+1)}}function tt(n,c){if(n&1){let r=P();l(0,"div")(1,"c-modal",32,0),v("visibleChange",function(o){_(r);let i=g();return C(i.handleDeleteToggleChange(o))}),l(3,"c-modal-header")(4,"h5",33),u(5,"Delete User "),l(6,"small"),u(7),a()(),l(8,"button",34),v("click",function(){_(r);let o=g();return C(o.closeDeleteModal())}),a()(),l(9,"c-modal-body"),u(10,"Are you sure you want to delete the role?"),a(),l(11,"c-modal-footer")(12,"button",35),v("click",function(){_(r);let o=g();return C(o.closeDeleteModal())}),u(13," Close "),a(),l(14,"button",36),v("click",function(){_(r);let o=g();return C(o.deleteRecord())}),u(15,"Delete"),a()()()()}if(n&2){let r=g();d(),m("@.disabled",!0)("visible",r.deleteModalVisible),d(6),q("(",(r.deleteData==null?null:r.deleteData.firstname)+" "+(r.deleteData==null?null:r.deleteData.lastname),")")}}var Bt=(()=>{let c=class c{constructor(t,o,i,p,w,Be,je,Oe,ze){this.toastrService=t,this.userService=o,this.router=i,this.roleService=p,this.loaderService=w,this.utilService=Be,this.route=je,this.localStorageService=Oe,this.authService=ze,this.userList=[],this.totalPages=1,this.currentPage=1,this.deleteModalVisible=!1,this.access=null,this.accessModule=null,this.accessSubModule=null,this.currentUserRole=this.utilService.getCurrentUserRole(),this.userRoleLevel=this.utilService.getUserRoleLevel(),this.paramsubscriptions=[],this.userId="",this.context={componentParent:this},this.columnDefs=[],this.defaultColDef={filter:!0},this.rowSelection="multiple",this.paginationPageSize=10,this.paginationPageSizeSelector=[10,20,50],this.themeClass="ag-theme-quartz",this.buildForm=s=>{this.userForm=new De({firstname:new E(s&&s.firstname?s.firstname:null,[F.required]),lastname:new E(s&&s.lastname?s.lastname:null,[F.required]),email:new E(s&&s.email?s.email:null,[F.email]),active:new E(s&&s.active?s.active:!1)}),s?.role&&(this.selectedRole=s?.role?._id)},this.getAllRoles=()=>{let s=e=>{e&&e.success?e.data&&e.data.length&&(this.roleList=e.data):this.toastrService.showError("Error!",e.message),this.loaderService.hideLoader()},h=e=>{this.loaderService.hideLoader(),this.toastrService.showError("Error!",e.error&&e.error?.errors?.msg?e.error.errors.msg:"Error while fetching roles.")};this.loaderService.showLoader(),this.roleService.getAll({roleType:"general"},s,h)},this.handlePagination=s=>{this.currentPage=s,this.userList=[],this.getAll()},this.getAll=()=>{let s=e=>{e&&e.success?e.data&&e.data.length?(e.data=e.data.filter(f=>f.role.roleLevel>0),this.userList=e.data,this.rowData=e.data,this.currentPage=e.currentPage,this.totalPages=e.totalPages):this.userList=[]:this.toastrService.showError("Error!",e.message),this.loaderService.hideLoader()},h=e=>{this.loaderService.hideLoader(),this.toastrService.showError("Error!",e.error&&e.error?.errors?.msg?e.error.errors.msg:"Error while fetching users.")};this.loaderService.showLoader(),this.userService.getAll({pageQuery:this.currentPage,pageSize:this.paginationPageSize,userRoleLevel:this.userRoleLevel},s,h)},this.cancel=()=>{this.editUserData=null,this.deleteData=null,this.deleteModalVisible=!1,this.buildForm()},this.editUser=s=>{this.editUserData=s,this.selectedRole=s.role,this.buildForm(s)},this.closeDeleteModal=()=>{this.deleteData=null,this.deleteModalVisible=!this.deleteModalVisible},this.deleteRecord=()=>{let s=e=>{e&&e.success?(this.toastrService.showSuccess("Success!",e.message),this.cancel(),this.getAll()):this.toastrService.showError("Error!",e.message),this.loaderService.hideLoader()},h=e=>{this.loaderService.hideLoader(),this.toastrService.showError("Error!",e.error&&e.error?.errors?.msg?e.error.errors.msg:"Error while deleting record.")};this.loaderService.showLoader(),this.userService.deleteById({userId:this.deleteData.userId},s,h)},this.resetPassword=s=>{let h=f=>{this.loaderService.hideLoader(),f.success?(this.toastrService.showSuccess("Success!",f.message),this.utilService.goto("/login")):this.toastrService.showError("Error!",f.message)},e=f=>{this.loaderService.hideLoader(),this.toastrService.showError("Error!",f.message)};this.loaderService.showLoader(),this.authService.resetPassword({email:s},h,e)},this.submit=()=>{let s=e=>{e&&e.success?(this.toastrService.showSuccess("Success!",e.message),this.loaderService.hideLoader(),this.cancel(),this.getAll()):(this.loaderService.hideLoader(),this.toastrService.showError("Error!",e.message||e.msg))},h=e=>{this.loaderService.hideLoader(),this.toastrService.showError("Error!",e.error&&e.error?.errors?.msg?e.error.errors.msg:"Error while add/update user..")};this.userForm.value.role=this.selectedRole,this.loaderService.showLoader(),this.editUserData?.userId?(this.userForm.value.userId=this.editUserData?.userId,this.userService.update(this.userForm.value,s,h)):this.userService.add(this.userForm.value,s,h)},this.onPaginationChanged=s=>{console.log("onPaginationPageLoaded")},this.onGridReady=s=>{this.gridApi=s.api,this.getAll()};let Ge=this.route.data.subscribe(s=>{if(this.accessModule=s.module,this.accessSubModule=s.subModule,this.accessModule){let h=this.localStorageService.getValue("user")?.permissions?JSON.parse(this.localStorageService.getValue("user").permissions):Ve.permissionList;if(h&&h.length){let e=h.filter(f=>f.key===this.accessModule)[0];e&&e.submodule&&e.submodule.length?this.access=e.submodule.filter(f=>f.key===this.accessSubModule)[0].access:this.access=e.access,this.access=this.access[this.currentUserRole]}}});this.paramsubscriptions.push(Ge)}ngOnInit(){this.access&&this.access.view?(this.columnDefs=[{headerName:"#",filter:!1,sortable:!1,valueFormatter:t=>`${t.node.data.userId}`,suppressMovable:!0},{headerName:"First Name",field:"firstname",suppressMovable:!0},{headerName:"Last Name",field:"lastname",suppressMovable:!0},{headerName:"Email",field:"email",suppressMovable:!0},{headerName:"Is Active?",filter:!1,sortable:!1,valueFormatter:t=>`${t.node.data.active?"Yes":"No"}`,suppressMovable:!0}],this.access.edit&&this.columnDefs.push({headerName:"Action",filter:!1,sortable:!1,valueFormatter:t=>`${t.node.data}`,cellRenderer:Ne,cellRendererParams:{specificId:"actionButtons",onClick:this.onButtonClick.bind(this)}}),this.getAll(),this.getAllRoles(),this.buildForm()):(this.toastrService.showWarning("Warning!","You donot have permission to view this page. Please contact to administrator!"),this.utilService.goto("/home"))}onButtonClick(t,o){o==="update"?this.editUser(t):o==="reset"?this.resetPassword(t.email):this.toggleDeleteModal(t)}ngOnDestroy(){try{if(this.paramsubscriptions)for(let t=0;t<this.paramsubscriptions.length;t++)this.paramsubscriptions[t].unsubscribe()}catch(t){console.error(t)}try{this.params&&this.params.unsubscribe()}catch(t){console.error(t)}}numSequence(t){return Array(t)}toggleDeleteModal(t){this.deleteData=t,this.deleteModalVisible=!this.deleteModalVisible}handleDeleteToggleChange(t){this.deleteModalVisible=t}};c.\u0275fac=function(o){return new(o||c)(S(Te),S(I),S(ee),S(M),S(ie),S(be),S(Z),S(ve),S(Ce))},c.\u0275cmp=V({type:c,selectors:[["ng-component"]],standalone:!0,features:[z([M,I]),G],decls:15,vars:23,consts:[["staticBackdropModal",""],["style","margin-bottom: 10px;",4,"ngIf"],[1,"example-wrapper"],[1,"example-header"],[2,"margin-top","6px"],[2,"float","right"],["align","end","size","sm"],["cPageItem","",3,"disabled","ngStyle"],["cPageLink","",3,"click","routerLink"],[4,"ngFor","ngForOf"],[2,"width","100%","height","300px",3,"paginationChanged","gridReady","columnDefs","defaultColDef","rowSelection","paginationPageSize","paginationPageSizeSelector","pagination","suppressPaginationPanel","suppressScrollOnNewData","rowData","context"],[4,"ngIf"],[2,"margin-bottom","10px"],[3,"formGroup"],[1,"form-group","row","mb-3"],[1,"col-md-2","col-form-label"],[1,"col-md-4"],["type","text","formControlName","firstname","id","firstname","placeholder","eg: John","required","",1,"form-control",3,"ngStyle"],["style","color: red",4,"ngIf"],["type","text","formControlName","lastname","id","lastname","placeholder","eg: Kennedy","required","",1,"form-control",3,"ngStyle"],["type","email","formControlName","email","id","email","placeholder","eg: Kennedy","required","",1,"form-control",3,"ngStyle"],["class","col-md-2 form-check-label col-form-label",4,"ngIf"],["class","col-md-4",4,"ngIf"],[1,"form-group","row"],["bindValue","_id","bindLabel","displayName","placeholder","Select Role",3,"ngModelChange","ngModel","items","multiple","clearable","ngModelOptions"],[3,"click","disabled","ngClass"],[3,"click","ngClass"],[2,"color","red"],[1,"col-md-2","form-check-label","col-form-label"],[1,"form-check","form-switch"],["type","checkbox","id","active","formControlName","active",1,"form-check-input"],["cPageItem","",3,"active","ngStyle"],["backdrop","static","id","staticBackdropModal",3,"visibleChange","visible"],["cModalTitle",""],["cButtonClose","",3,"click"],["cButton","","color","secondary",3,"click"],["cButton","","color","danger",3,"click"]],template:function(o,i){o&1&&(b(0,Ze,35,24,"div",1),l(1,"div",2)(2,"div",3)(3,"div",4)(4,"div",5)(5,"c-pagination",6)(6,"li",7)(7,"a",8),v("click",function(){return i.handlePagination(i.currentPage-1)}),u(8,"Previous"),a()(),b(9,et,4,5,"ng-container",9),l(10,"li",7)(11,"a",8),v("click",function(){return i.handlePagination(i.currentPage+1)}),u(12,"Next"),a()()()()()(),l(13,"ag-grid-angular",10),v("paginationChanged",function(w){return i.onPaginationChanged(w)})("gridReady",function(w){return i.onGridReady(w)}),a()(),b(14,tt,16,3,"div",11)),o&2&&(m("ngIf",i.access==null?null:i.access.add),d(6),m("disabled",i.currentPage===1)("ngStyle",y(19,k,i.currentPage===1?"":"pointer")),d(3),m("ngForOf",i.numSequence(i.totalPages)),d(),m("disabled",i.currentPage===i.totalPages)("ngStyle",y(21,k,i.currentPage===i.totalPages?"":"pointer")),d(3),N(i.themeClass),m("columnDefs",i.columnDefs)("defaultColDef",i.defaultColDef)("rowSelection",i.rowSelection)("paginationPageSize",i.paginationPageSize)("paginationPageSizeSelector",i.paginationPageSizeSelector)("pagination",!0)("suppressPaginationPanel",!0)("suppressScrollOnNewData",!0)("rowData",i.rowData)("context",i.context),d(),m("ngIf",i.deleteModalVisible))},dependencies:[Re,ge,he,te,pe,$,W,J,K,Y,qe,Ae,ue,de,me,oe,ae,ce,se,le,ne,re,Le,Fe,we,ye,xe,Ee,Ue,Me,Ie,ke,Pe],styles:[".example-wrapper[_ngcontent-%COMP%]{display:flex;flex-direction:column;height:100%}#myGrid[_ngcontent-%COMP%]{flex:1 1 0px;width:100%}.example-header[_ngcontent-%COMP%]{font-family:Verdana,Geneva,Tahoma,sans-serif;font-size:13px;margin-bottom:5px}.value[_ngcontent-%COMP%]{margin-right:20px;font-weight:700;width:50px;display:inline-block;text-align:right;padding-right:2px}"]});let n=c;return n})();export{Bt as UsersComponent};
