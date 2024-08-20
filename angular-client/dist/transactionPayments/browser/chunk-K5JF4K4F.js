import{a as Q}from"./chunk-PJTZ2CZ7.js";import{a as oe,b as ne}from"./chunk-6UGNY33E.js";import{a as M}from"./chunk-WCWF2U4M.js";import{a as ie}from"./chunk-JWWHVUZO.js";import{a as X}from"./chunk-F6MBCUBG.js";import{b as Y,e as Z,i as ee,v as te,y as se}from"./chunk-NGUZVOSX.js";import{a as q,b as z,e as J,g as K}from"./chunk-GJJVJTXG.js";import"./chunk-CSO4ZWHK.js";import"./chunk-IBYGZ3TV.js";import{Ga as y,I as A,Ia as u,L as V,N as U,Ob as H,Pb as O,Ta as p,Tb as D,Ua as _,V as g,Va as T,W as f,Wa as I,Wb as G,Xa as W,Xb as $,Za as P,ab as v,cb as c,nb as b,oa as h,ob as j,pa as S,pb as B,qb as R,rb as w,sb as x,tb as N,ub as k,vb as F}from"./chunk-ICF7HI7T.js";import"./chunk-ENQRHBTS.js";var L=(()=>{let m=class m{constructor(n,e,o){this.http=n,this.delegatorService=e,this.httpErrorHandler=o,this.apiUrl=`${z.apiUrl}`,this.httpOptions={headers:new G({"Content-Type":"application/json"})},this.handleError=this.httpErrorHandler.createHandleError("AuthService")}update(n,e,o){let a=this.apiUrl+"/profile/update";return this.delegatorService.post(n,a,null,e,o)}getByUserId(n,e,o){let a=this.apiUrl+"/profile/getByUserId";return this.delegatorService.post(n,a,null,e,o)}permissionUpdate(n,e,o){let a=this.apiUrl+"/permission/update";return this.delegatorService.post(n,a,null,e,o)}permissionGetBy(n,e,o){let a=this.apiUrl+"/permission/getBy";return this.delegatorService.post(n,a,null,e,o)}};m.\u0275fac=function(e){return new(e||m)(V($),V(J),V(K))},m.\u0275prov=A({token:m,factory:m.\u0275fac,providedIn:"root"});let r=m;return r})();var ce=()=>({standalone:!0});function ae(r,m){if(r&1){let s=P();p(0,"div",9)(1,"input",10),x("ngModelChange",function(e){g(s);let o=c().$implicit,a=c(3);return w(o.access[a.selectedRole].add,e)||(o.access[a.selectedRole].add=e),f(e)}),v("change",function(){g(s);let e=c().$implicit,o=c(3);return f(o.changePermission(e.key,e.access,"add"))}),_()()}if(r&2){let s=c().$implicit,n=c(3);h(),R("ngModel",s.access[n.selectedRole].add),u("disabled",n.isSuperorAdmin)}}function me(r,m){r&1&&(p(0,"div"),b(1," N/A "),_())}function _e(r,m){if(r&1){let s=P();p(0,"div",9)(1,"input",10),x("ngModelChange",function(e){g(s);let o=c().$implicit,a=c(3);return w(o.access[a.selectedRole].edit,e)||(o.access[a.selectedRole].edit=e),f(e)}),v("change",function(){g(s);let e=c().$implicit,o=c(3);return f(o.changePermission(e.key,e.access,"edit"))}),_()()}if(r&2){let s=c().$implicit,n=c(3);h(),R("ngModel",s.access[n.selectedRole].edit),u("disabled",n.isSuperorAdmin)}}function pe(r,m){r&1&&(p(0,"div"),b(1," N/A "),_())}function he(r,m){if(r&1){let s=P();p(0,"div",9)(1,"input",10),x("ngModelChange",function(e){g(s);let o=c().$implicit,a=c(3);return w(o.access[a.selectedRole].delete,e)||(o.access[a.selectedRole].delete=e),f(e)}),v("change",function(){g(s);let e=c().$implicit,o=c(3);return f(o.changePermission(e.key,e.access,"delete"))}),_()()}if(r&2){let s=c().$implicit,n=c(3);h(),R("ngModel",s.access[n.selectedRole].delete),u("disabled",n.isSuperorAdmin)}}function ue(r,m){r&1&&(p(0,"div"),b(1," N/A "),_())}function ge(r,m){if(r&1){let s=P();p(0,"tr")(1,"td"),b(2),_(),p(3,"td")(4,"div",9)(5,"input",12),x("ngModelChange",function(e){let o=g(s).$implicit,a=c(5);return w(o.access[a.selectedRole].view,e)||(o.access[a.selectedRole].view=e),f(e)}),v("change",function(){let e=g(s).$implicit,o=c(5);return f(o.changePermission(e.key,e.access,"view"))}),_()()(),p(6,"td")(7,"div",9)(8,"input",12),x("ngModelChange",function(e){let o=g(s).$implicit,a=c(5);return w(o.access[a.selectedRole].add,e)||(o.access[a.selectedRole].add=e),f(e)}),v("change",function(){let e=g(s).$implicit,o=c(5);return f(o.changePermission(e.key,e.access,"add"))}),_()()(),p(9,"td")(10,"div",9)(11,"input",12),x("ngModelChange",function(e){let o=g(s).$implicit,a=c(5);return w(o.access[a.selectedRole].edit,e)||(o.access[a.selectedRole].edit=e),f(e)}),v("change",function(){let e=g(s).$implicit,o=c(5);return f(o.changePermission(e.key,e.access,"edit"))}),_()()(),p(12,"td")(13,"div",9)(14,"input",12),x("ngModelChange",function(e){let o=g(s).$implicit,a=c(5);return w(o.access[a.selectedRole].delete,e)||(o.access[a.selectedRole].delete=e),f(e)}),v("change",function(){let e=g(s).$implicit,o=c(5);return f(o.changePermission(e.key,e.access,"delete"))}),_()()()()}if(r&2){let s=m.$implicit,n=c(5);h(2),B(" \u21B3 ",s.name,""),h(3),R("ngModel",s.access[n.selectedRole].view),u("disabled",n.isSuperorAdmin),h(3),R("ngModel",s.access[n.selectedRole].add),u("disabled",n.isSuperorAdmin),h(3),R("ngModel",s.access[n.selectedRole].edit),u("disabled",n.isSuperorAdmin),h(3),R("ngModel",s.access[n.selectedRole].delete),u("disabled",n.isSuperorAdmin)}}function fe(r,m){if(r&1&&(I(0),y(1,ge,15,9,"tr",8),W()),r&2){let s=c().$implicit;h(),u("ngForOf",s.submodule)}}function be(r,m){if(r&1){let s=P();I(0),p(1,"tr")(2,"td")(3,"b"),b(4),_()(),p(5,"td")(6,"div",9)(7,"input",10),x("ngModelChange",function(e){let o=g(s).$implicit,a=c(3);return w(o.access[a.selectedRole].view,e)||(o.access[a.selectedRole].view=e),f(e)}),v("change",function(){let e=g(s).$implicit,o=c(3);return f(o.changePermission(e.key,e.access,"view"))}),_()()(),p(8,"td"),y(9,ae,2,2,"div",11)(10,me,2,0,"div",7),_(),p(11,"td"),y(12,_e,2,2,"div",11)(13,pe,2,0,"div",7),_(),p(14,"td"),y(15,he,2,2,"div",11)(16,ue,2,0,"div",7),_()(),y(17,fe,2,1,"ng-container",7),W()}if(r&2){let s=m.$implicit,n=c(3);h(4),j(s.name),h(3),R("ngModel",s.access[n.selectedRole].view),u("disabled",n.isSuperorAdmin),h(2),u("ngIf",!(s.submodule&&s.submodule.length)),h(),u("ngIf",s.submodule&&s.submodule.length),h(2),u("ngIf",!(s.submodule&&s.submodule.length)),h(),u("ngIf",s.submodule&&s.submodule.length),h(2),u("ngIf",!(s.submodule&&s.submodule.length)),h(),u("ngIf",s.submodule&&s.submodule.length),h(),u("ngIf",s.submodule&&s.submodule.length)}}function ve(r,m){if(r&1&&(p(0,"tbody"),y(1,be,18,10,"ng-container",8),_()),r&2){let s=c(2);h(),u("ngForOf",s.permissions)}}function Re(r,m){r&1&&(p(0,"tbody")(1,"tr",13)(2,"td",14),b(3,"No records available!"),_()()())}function we(r,m){if(r&1&&(p(0,"table",5)(1,"thead")(2,"tr"),T(3,"th",6),p(4,"th",6),b(5,"View"),_(),p(6,"th",6),b(7,"Add"),_(),p(8,"th",6),b(9,"Edit"),_(),p(10,"th",6),b(11,"Delete"),_()()(),y(12,ve,2,1,"tbody",7)(13,Re,4,0,"tbody",7),_()),r&2){let s=c();h(12),u("ngIf",s.permissions.length),h(),u("ngIf",!s.permissions.length)}}function xe(r,m){if(r&1){let s=P();p(0,"div",15)(1,"button",16),v("click",function(){g(s);let e=c();return f(e.submit())}),b(2,"Submit"),_()()}}var Oe=(()=>{let m=class m{constructor(n,e,o,a,E,re){this.toastrService=n,this.utilService=e,this.loaderService=o,this.roleService=a,this.profileService=E,this.authService=re,this.roleList=[],this.currentUserRole=this.utilService.getCurrentUserRole(),this.isSuperorAdmin=!1,this.userRoleLevel=this.utilService.getUserRoleLevel(),this.getAll=()=>{let C=l=>{if(this.loaderService.hideLoader(),l&&l.success)if(l.data&&l.data.length){let t=l.data.find(d=>d.roleName===this.currentUserRole);t&&t.roleName?this.roleList=l.data.filter(d=>{if(d.roleLevel>=t.roleLevel)return d}):this.roleList=l.data,this.selectedRole=this.roleList&&this.roleList.length?this.roleList[0].roleName:null}else this.roleList=[];else this.toastrService.showError("Error!",l.message)},i=l=>{this.loaderService.hideLoader(),this.toastrService.showError("Error!",l.error&&l.error?.errors?.msg?l.error.errors.msg:"Error while validating credentials.")};this.loaderService.showLoader(),this.roleService.getAll({roleType:"general"},C,i)},this.changePermission=(C,i,l)=>{for(let t=0;t<this.permissions.length;t++)if(C===this.permissions[t].key){if(!i[this.selectedRole].view&&l==="view"){if(this.permissions[t]&&this.permissions[t].submodule&&this.permissions[t].submodule.length)for(let d=0;d<this.permissions[t].submodule.length;d++)this.permissions[t].submodule[d].access[this.selectedRole].view=i[this.selectedRole].view,this.permissions[t].submodule[d].access[this.selectedRole].add=i[this.selectedRole].view,this.permissions[t].submodule[d].access[this.selectedRole].edit=i[this.selectedRole].view,this.permissions[t].submodule[d].access[this.selectedRole].delete=i[this.selectedRole].view;this.permissions[t].access[this.selectedRole].view=i[this.selectedRole].view,this.permissions[t].access[this.selectedRole].add=i[this.selectedRole].view,this.permissions[t].access[this.selectedRole].edit=i[this.selectedRole].view,this.permissions[t].access[this.selectedRole].delete=i[this.selectedRole].view}else if(!i[this.selectedRole].add&&l==="add")this.permissions[t].access[this.selectedRole].add=i[this.selectedRole].add,this.permissions[t].access[this.selectedRole].edit=i[this.selectedRole].add,this.permissions[t].access[this.selectedRole].delete=i[this.selectedRole].add;else if(!i[this.selectedRole].edit&&l==="edit")this.permissions[t].access[this.selectedRole].edit=i[this.selectedRole].edit,this.permissions[t].access[this.selectedRole].delete=i[this.selectedRole].edit;else if(i[this.selectedRole].delete&&l==="delete")this.permissions[t].access[this.selectedRole].view=i[this.selectedRole].delete,this.permissions[t].access[this.selectedRole].add=i[this.selectedRole].delete,this.permissions[t].access[this.selectedRole].edit=i[this.selectedRole].delete,this.permissions[t].access[this.selectedRole].delete=i[this.selectedRole].delete;else if(i[this.selectedRole].edit&&l==="edit")this.permissions[t].access[this.selectedRole].view=i[this.selectedRole].edit,this.permissions[t].access[this.selectedRole].add=i[this.selectedRole].edit,this.permissions[t].access[this.selectedRole].edit=i[this.selectedRole].edit;else if(i[this.selectedRole].add&&l==="add")this.permissions[t].access[this.selectedRole].view=i[this.selectedRole].add,this.permissions[t].access[this.selectedRole].add=i[this.selectedRole].add;else if(i[this.selectedRole].view&&l==="view"&&this.permissions[t]&&this.permissions[t].submodule&&this.permissions[t].submodule.length)for(let d=0;d<this.permissions[t].submodule.length;d++)this.permissions[t].submodule[d].access[this.selectedRole].view=i[this.selectedRole].view}else if(this.permissions[t]&&this.permissions[t].submodule&&this.permissions[t].submodule.length)for(let d=0;d<this.permissions[t].submodule.length;d++)C===this.permissions[t].submodule[d].key&&(!i[this.selectedRole].view&&l==="view"?(this.permissions[t].submodule[d].access[this.selectedRole].view=i[this.selectedRole].view,this.permissions[t].submodule[d].access[this.selectedRole].add=i[this.selectedRole].view,this.permissions[t].submodule[d].access[this.selectedRole].edit=i[this.selectedRole].view,this.permissions[t].submodule[d].access[this.selectedRole].delete=i[this.selectedRole].view):!i[this.selectedRole].add&&l==="add"?(this.permissions[t].submodule[d].access[this.selectedRole].add=i[this.selectedRole].add,this.permissions[t].submodule[d].access[this.selectedRole].edit=i[this.selectedRole].add,this.permissions[t].submodule[d].access[this.selectedRole].delete=i[this.selectedRole].add):!i[this.selectedRole].edit&&l==="edit"?(this.permissions[t].submodule[d].access[this.selectedRole].edit=i[this.selectedRole].edit,this.permissions[t].submodule[d].access[this.selectedRole].delete=i[this.selectedRole].edit):i[this.selectedRole].delete&&l==="delete"?(this.permissions[t].submodule[d].access[this.selectedRole].view=i[this.selectedRole].delete,this.permissions[t].submodule[d].access[this.selectedRole].add=i[this.selectedRole].delete,this.permissions[t].submodule[d].access[this.selectedRole].edit=i[this.selectedRole].delete,this.permissions[t].submodule[d].access[this.selectedRole].delete=i[this.selectedRole].delete):i[this.selectedRole].edit&&l==="edit"?(this.permissions[t].submodule[d].access[this.selectedRole].view=i[this.selectedRole].edit,this.permissions[t].submodule[d].access[this.selectedRole].add=i[this.selectedRole].edit,this.permissions[t].submodule[d].access[this.selectedRole].edit=i[this.selectedRole].edit):i[this.selectedRole].add&&l==="add"&&(this.permissions[t].submodule[d].access[this.selectedRole].view=i[this.selectedRole].add,this.permissions[t].submodule[d].access[this.selectedRole].add=i[this.selectedRole].add))},this.permissionsGetby=()=>{let C=l=>{this.loaderService.hideLoader(),l&&l.success&&l.data&&l.data._id?this.permissions=l.data.permissionAccess:this.permissions=ie.permissionList},i=l=>{this.loaderService.hideLoader(),this.toastrService.showError("Error!",l.error&&l.error?.errors?.msg?l.error.errors.msg:"Error while fetching permissions.")};this.loaderService.showLoader(),this.profileService.permissionGetBy({},C,i)},this.submit=()=>{let C=t=>{this.loaderService.hideLoader(),t&&t.success?(this.toastrService.showSuccess("Success!","Permissions updated successfully."),this.permissionsGetby()):this.toastrService.showError("Error!",t.message)},i=t=>{this.loaderService.hideLoader(),this.toastrService.showError("Error!",t.error&&t.error?.errors?.msg?t.error.errors.msg:"Error while updating permissions.")};this.loaderService.showLoader();let l={permissions:this.permissions,type:"transactionPayments"};this.profileService.permissionUpdate(l,C,i)},this.confirmLogout=()=>{this.authService.logout(),this.utilService.goto("/login")},this.isSuperorAdmin=this.userRoleLevel?!(this.currentUserRole==="super"||this.currentUserRole==="admin"):!1}ngOnInit(){this.getAll(),this.permissionsGetby()}};m.\u0275fac=function(e){return new(e||m)(S(se),S(X),S(q),S(M),S(L),S(Q))},m.\u0275cmp=U({type:m,selectors:[["ng-component"]],standalone:!0,features:[N([L,M]),k],decls:8,vars:8,consts:[[1,"container",2,"background-color","white","border-radius","10px","padding","1.5rem"],[1,"d-flex",2,"justify-content","space-between"],["bindValue","roleName","bindLabel","displayName","placeholder","Select Role",3,"ngModelChange","ngModel","items","multiple","clearable","ngModelOptions"],["class","table table-striped",4,"ngIf"],["class","d-flex",4,"ngIf"],[1,"table","table-striped"],["scope","col"],[4,"ngIf"],[4,"ngFor","ngForOf"],[1,"form-check","form-switch"],["type","checkbox","role","switch","id","module.key",1,"form-check-input",3,"ngModelChange","change","ngModel","disabled"],["class","form-check form-switch",4,"ngIf"],["type","checkbox","role","switch","id","submodule.key",1,"form-check-input",3,"ngModelChange","change","ngModel","disabled"],[2,"text-align","center"],["colspan","5"],[1,"d-flex"],[1,"btn","btn-primary",3,"click"]],template:function(e,o){e&1&&(p(0,"div",0)(1,"div",1)(2,"h3"),b(3,"Permissions"),_(),p(4,"ng-select",2),x("ngModelChange",function(E){return w(o.selectedRole,E)||(o.selectedRole=E),E}),_()(),T(5,"hr"),y(6,we,14,2,"table",3)(7,xe,3,0,"div",4),_()),e&2&&(h(4),R("ngModel",o.selectedRole),u("items",o.roleList)("multiple",!1)("clearable",!1)("ngModelOptions",F(7,ce)),h(2),u("ngIf",o.roleList.length),h(),u("ngIf",!o.isSuperorAdmin))},dependencies:[D,H,O,te,Y,Z,ee,ne,oe]});let r=m;return r})();export{Oe as PermissionComponent};