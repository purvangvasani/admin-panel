import{a as Re}from"./chunk-KVYDP3SW.js";import{a as Ne}from"./chunk-DLZ42C5O.js";import{a as Oe,b as Ae}from"./chunk-6UGNY33E.js";import{a as ke}from"./chunk-JWWHVUZO.js";import{a as fe}from"./chunk-F6MBCUBG.js";import{c as xe,d as O,e as Ce,f as we,g as be,h as k,j as Me,l as ye,o as Ie,p as Ee,q as Te,r as Ve,s as Le,v as De,w as Fe,y as Pe}from"./chunk-NGUZVOSX.js";import{a as K,b as F,d as Se}from"./chunk-GJJVJTXG.js";import"./chunk-CSO4ZWHK.js";import{A as ie,C as ne,F as re,G as oe,H as ae,I as ce,N as se,b as X,ba as le,ca as me,da as de,ea as he,fa as pe,ga as ue,ha as _e,ia as ge,qa as ve,u as Z,v as ee,z as te}from"./chunk-IBYGZ3TV.js";import{Ga as f,Ha as G,Ia as d,N as B,Nb as z,Ob as j,Pb as $,Qb as W,Ta as i,Tb as J,Ua as r,V as v,Va as x,W as S,Wa as V,X as w,Xa as L,Y as I,Za as b,ab as g,cb as h,cc as Q,fc as Y,nb as l,oa as m,ob as D,pa as C,pb as E,ub as H,vb as q,wb as T}from"./chunk-ICF7HI7T.js";import{k as U}from"./chunk-ENQRHBTS.js";var A=s=>({cursor:s}),He=s=>({border:s}),qe=()=>({placement:"bottom-start"});function ze(s,u){s&1&&(i(0,"span",24),l(1," Merchant Name is required"),r())}function je(s,u){if(s&1){let t=b();i(0,"div",2)(1,"c-card")(2,"c-card-header")(3,"h5"),l(4,"Merchant Form"),r()(),i(5,"c-card-body")(6,"form",10)(7,"div",11)(8,"div",12)(9,"label",13),l(10," Merchant Name "),r(),x(11,"input",14),f(12,ze,2,0,"span",15),r(),i(13,"div",12)(14,"label",16),l(15," Mode "),r(),i(16,"select",17),g("change",function(a){v(t);let o=h();return S(o.updateOptionStates(a))}),i(17,"option",18),l(18,"UPI ID "),r(),i(19,"option",19),l(20,"IMPS "),r()()(),i(21,"div",12)(22,"label",13),l(23," Account "),r(),x(24,"ng-select",20),r(),i(25,"div",21)(26,"button",22),g("click",function(){v(t);let a=h();return S(a.submit())}),l(27," Submit "),r(),i(28,"button",23),g("click",function(){v(t);let a=h();return S(a.cancel())}),l(29," Cancel "),r()()()()()()()}if(s&2){let t=h();m(6),d("formGroup",t.merchantForm),m(5),d("ngStyle",T(12,He,t.merchantForm.controls.merchantname.hasError("required")&&t.merchantForm.controls.merchantname.touched?"2px solid red":"")),m(),d("ngIf",t.merchantForm.controls.merchantname.hasError("required")&&t.merchantForm.controls.merchantname.touched),m(4),G("disabled",t.merchantId?!0:null),m(8),d("items",t.accountList)("multiple",!1)("bindValue","accountId")("bindLabel",t.labelType)("clearable",!1),m(2),d("disabled",t.merchantForm.invalid)("ngClass",t.merchantForm.invalid?"btn btn-danger submit":"btn btn-primary submit"),m(2),d("ngClass","btn btn-default")}}function $e(s,u){if(s&1){let t=b();V(0),i(1,"li",25)(2,"a",5),g("click",function(){let a=v(t).index,o=h();return S(o.currentPage===a+1?null:o.handlePagination(a+1))}),l(3),r()(),L()}if(s&2){let t=u.index,n=h();m(),d("active",n.currentPage===t+1)("ngStyle",T(3,A,n.currentPage===t+1?"":"pointer")),m(2),D(t+1)}}function We(s,u){s&1&&(V(0),i(1,"tr",26)(2,"td",27),l(3,"No Data available"),r()(),L())}function Je(s,u){if(s&1){let t=b();i(0,"li")(1,"a",42),g("click",function(){v(t);let a=h(2).$implicit,o=h(2);return S(o.editMerchant(a))}),w(),x(2,"svg",43),l(3,"Edit"),r()()}}function Qe(s,u){if(s&1){let t=b();i(0,"li")(1,"a",42),g("click",function(){v(t);let a=h(2).$implicit,o=h(2);return S(o.toggleDeleteModal(a))}),w(),x(2,"svg",44),l(3,"Delete"),r()()}}function Ye(s,u){if(s&1&&(i(0,"c-dropdown",38)(1,"button",39),w(),x(2,"svg",40),r(),I(),i(3,"ul",41),f(4,Je,4,0,"li",9)(5,Qe,4,0,"li",9),r()()),s&2){let t=h(3);d("popperOptions",q(4,qe)),m(),d("caret",!1),m(3),d("ngIf",t.access==null?null:t.access.edit),m(),d("ngIf",t.access==null?null:t.access.delete)}}function Ke(s,u){if(s&1){let t=b();i(0,"tr")(1,"th",28),l(2),r(),i(3,"td"),l(4),r(),i(5,"td"),l(6),i(7,"a",29),g("click",function(){let a=v(t).$implicit,o=h(2);return S(o.copyText(a,"deposit"))}),w(),i(8,"svg",30)(9,"g",31),x(10,"path",32)(11,"path",33)(12,"path",34)(13,"path",35)(14,"path",36),r()()()(),I(),i(15,"td"),l(16),i(17,"a",29),g("click",function(){let a=v(t).$implicit,o=h(2);return S(o.copyText(a,"withdrawal"))}),w(),i(18,"svg",30)(19,"g",31),x(20,"path",32)(21,"path",33)(22,"path",34)(23,"path",35)(24,"path",36),r()()()(),I(),i(25,"td"),l(26),i(27,"a",29),g("click",function(){let a=v(t).$implicit,o=h(2);return S(o.copyText(a,"merchantStatus"))}),w(),i(28,"svg",30)(29,"g",31),x(30,"path",32)(31,"path",33)(32,"path",34)(33,"path",35)(34,"path",36),r()()()(),I(),i(35,"td"),f(36,Ye,6,5,"c-dropdown",37),r()()}if(s&2){let t=u.$implicit,n=h(2);m(2),D(t.merchantId),m(2),D(t.merchantname),m(2),E(" ",t.depositURL.substring(1,30),"... "),m(10),E(" ",t.withdrawalURL.substring(1,30),"... "),m(10),E(" ",t.merchantStatusURL.substring(1,30),"... "),m(10),d("ngIf",(n.access==null?null:n.access.delete)||(n.access==null?null:n.access.edit))}}function Xe(s,u){if(s&1&&(V(0),f(1,Ke,37,6,"tr",6),L()),s&2){let t=h();m(),d("ngForOf",t.merchantList)}}function Ze(s,u){if(s&1){let t=b();i(0,"div")(1,"c-modal",45,0),g("visibleChange",function(a){v(t);let o=h();return S(o.handleDeleteToggleChange(a))}),i(3,"c-modal-header")(4,"h5",46),l(5,"Delete Merchant "),i(6,"small"),l(7),r()(),i(8,"button",47),g("click",function(){v(t);let a=h();return S(a.cancel())}),r()(),i(9,"c-modal-body"),l(10,"Are you sure you want to delete the merchant?"),r(),i(11,"c-modal-footer")(12,"button",48),g("click",function(){v(t);let a=h();return S(a.cancel())}),l(13," Close "),r(),i(14,"button",49),g("click",function(){v(t);let a=h();return S(a.deleteRecord())}),l(15,"Delete"),r()()()()}if(s&2){let t=h();m(),d("@.disabled",!0)("visible",t.deleteModalVisible),m(6),E("(",t.deleteData==null?null:t.deleteData.merchantname,")")}}var Mt=(()=>{let u=class u{constructor(n,a,o,y,P,_,Ue){this.route=n,this.localStorageService=a,this.utilService=o,this.toastrService=y,this.loaderService=P,this.merchantService=_,this.accountDetailsService=Ue,this.paramsubscriptions=[],this.access=null,this.accessModule=null,this.currentUserRole=this.utilService.getCurrentUserRole(),this.merchantList=[],this.merchantDetails=[],this.accountList=[],this.accountDetails=[],this.totalPages=1,this.currentPage=1,this.editMerchantData=null,this.merchantId=null,this.deleteModalVisible=!1,this.labelType="accountName",this.buildForm=c=>{this.merchantForm=new be({mode:new k(c&&c.mode?c.mode:"upi"),accountId:new k(c&&c.accountId?c.accountId:null,[O.required]),merchantname:new k(c&&c.merchantname?c.merchantname:null,[O.required])}),this.merchantForm.get("mode").valueChanges.subscribe(p=>{this.updateLabelType(p)}),this.updateLabelType(this.merchantForm.get("mode").value)},this.differenceById=(c,p,e)=>{let N=new Set(p.map(M=>M.accountId)),R=c.filter(M=>!N.has(M.accountId));if(e){let M=c.find(Ge=>Ge.accountId===e.accountId);M&&R.push(M)}return R},this.cancel=()=>{this.editMerchantData=null,this.deleteData=null,this.merchantId=null,this.merchantForm.reset(),this.deleteModalVisible=!1,this.updateOptionStates("upi"),this.buildForm()},this.editMerchant=c=>{this.merchantId=c.merchantId,this.editMerchantData=c,this.buildForm(c),this.updateOptionStates(c?.mode?c.mode:this.merchantForm.get("mode").value,c)},this.deleteRecord=()=>{let c=e=>{this.loaderService.hideLoader(),e&&e.success?(this.toastrService.showSuccess("Success!",e.message),this.cancel(),this.getAll(),this.getMerchantForAccounts(),this.updateOptionStates("upi")):this.toastrService.showError("Error!",e.message)},p=e=>{this.loaderService.hideLoader(),this.toastrService.showError("Error!",e.error&&e.error?.errors?.msg?e.error.errors.msg:"Error while deleting record.")};this.loaderService.showLoader(),this.merchantService.deleteById({merchantId:this.deleteData.merchantId},c,p)},this.submit=()=>{let c=e=>{e&&e.success?(this.toastrService.showSuccess("Success!",e.message),this.loaderService.hideLoader(),this.cancel(),this.getAll(),this.getMerchantForAccounts(),this.updateOptionStates("upi")):(this.loaderService.hideLoader(),this.toastrService.showError("Error!",e.message||e.msg))},p=e=>{this.loaderService.hideLoader(),this.toastrService.showError("Error!",e.error&&e.error?.errors?.msg?e.error.errors.msg:"Error while add/update merchant..")};this.loaderService.showLoader(),this.editMerchantData?.merchantId?(this.merchantForm.value.merchantId=this.editMerchantData?.merchantId,this.merchantService.update(this.merchantForm.value,c,p)):this.merchantService.add(this.merchantForm.value,c,p)},this.handlePagination=c=>{this.currentPage=c,this.merchantList=[],this.getAll()},this.getAll=()=>{let c=e=>{e&&e.success?e.data&&e.data.length?(this.merchantList=e.data,this.currentPage=e.currentPage,this.totalPages=e.totalPages):this.merchantList=[]:this.toastrService.showError("Error!",e.message),this.loaderService.hideLoader()},p=e=>{this.loaderService.hideLoader(),this.toastrService.showError("Error!",e.error&&e.error?.errors?.msg?e.error.errors.msg:"Error while fetching merchant.")};this.loaderService.showLoader(),this.merchantService.getAll({pageQuery:this.currentPage},c,p)},this.getMerchantForAccounts=()=>{let c=e=>{e&&e.success?e.data&&e.data.length?this.merchantDetails=e.data:this.merchantDetails=[]:this.toastrService.showError("Error!",e.message),this.loaderService.hideLoader()},p=e=>{this.loaderService.hideLoader(),this.toastrService.showError("Error!",e.error&&e.error?.errors?.msg?e.error.errors.msg:"Error while fetching merchant.")};this.loaderService.showLoader(),this.merchantService.getMerchantForAccounts({},c,p)},this.copyText=(c,p)=>{var e=c;p==="withdrawal"?navigator.clipboard.writeText(F.UIURL+"/withdrawal-add;id="+btoa(e.merchantId)):p==="deposit"?navigator.clipboard.writeText(F.UIURL+"/deposit-add;id="+btoa(e.merchantId)):navigator.clipboard.writeText(F.UIURL+"/merchant-summary;id="+btoa(e.merchantId))};let Be=this.route.data.subscribe(c=>{if(this.accessModule=c.module,this.accessModule){let p=this.localStorageService.getValue("user")?.permissions?JSON.parse(this.localStorageService.getValue("user").permissions):ke.permissionList;if(p&&p.length){let e=p.filter(N=>N.key===this.accessModule)[0];this.access=e.access,this.access=this.access[this.currentUserRole]}}});this.paramsubscriptions.push(Be)}ngOnInit(){this.access&&this.access.view?(this.getAll(),this.getMerchantForAccounts(),this.buildForm(),setTimeout(()=>{this.updateOptionStates("upi")},500)):(this.toastrService.showWarning("Warning!","You donot have permission to view this page. Please contact to administrator!"),this.utilService.goto("/home"))}ngOnDestroy(){try{if(this.paramsubscriptions)for(let n=0;n<this.paramsubscriptions.length;n++)this.paramsubscriptions[n].unsubscribe()}catch(n){console.error(n)}try{this.params&&this.params.unsubscribe()}catch(n){console.error(n)}}toggleDeleteModal(n){this.deleteData=n,this.deleteModalVisible=!this.deleteModalVisible}handleDeleteToggleChange(n){this.deleteModalVisible=n}updateOptionStates(n,a=null){return U(this,null,function*(){a||this.merchantForm.get("accountId")?.reset();let o=n?.target?.value?n.target.value:n,y=_=>{_&&_.success?(_.data=Array.isArray(_.data)?_.data:[_.data],_.data&&_.data.length?this.accountList=this.differenceById(_.data,this.merchantDetails,a):this.accountList=[]):this.toastrService.showError("Error!",_.message),this.loaderService.hideLoader()},P=_=>{this.loaderService.hideLoader(),this.toastrService.showError("Error!",_.error&&_.error?.errors?.msg?_.error.errors.msg:"Error while fetching account details.")};this.accountList=[],this.loaderService.showLoader(),this.accountDetailsService.getAll({mode:o,isMerchantAccount:!0},y,P)})}updateLabelType(n){n==="upi"?this.labelType="upiId":n==="imps"&&(this.labelType="accountName")}numSequence(n){return Array(n)}};u.\u0275fac=function(a){return new(a||u)(C(Q),C(Se),C(fe),C(Pe),C(K),C(Re),C(Ne))},u.\u0275cmp=B({type:u,selectors:[["app-merchant"]],standalone:!0,features:[H],decls:34,vars:13,consts:[["staticBackdropModal",""],["style","margin-bottom: 10px;",4,"ngIf"],[2,"margin-bottom","10px"],["align","end"],["cPageItem","",3,"disabled","ngStyle"],["cPageLink","",3,"click","routerLink"],[4,"ngFor","ngForOf"],["cTable","","hover","","responsive",""],["scope","col"],[4,"ngIf"],[3,"formGroup"],[1,"form-group","row","mb-3"],[1,"col-md-4"],["cLabel","col","for","account"],["type","text","formControlName","merchantname","id","merchantname","placeholder","Enter Merchant Name","required","",1,"form-control",3,"ngStyle"],["style","color: red",4,"ngIf"],["cLabel","col","for","Mode"],["formControlName","mode","aria-label","Default select example","cSelect","",3,"change"],["value","upi"],["value","imps"],["formControlName","accountId","name","accountId",3,"items","multiple","bindValue","bindLabel","clearable"],[1,"col-md-4",2,"margin-top","20px"],[3,"click","disabled","ngClass"],[3,"click","ngClass"],[2,"color","red"],["cPageItem","",3,"active","ngStyle"],[1,"text-center"],["colspan","5"],["scope","row"],["title","Copy URL",2,"text-decoration","none","cursor","pointer",3,"click"],["fill","#000000","height","22px","width","22px","version","1.1","id","Layer_1","xmlns","http://www.w3.org/2000/svg",0,"xmlns","xlink","http://www.w3.org/1999/xlink","viewBox","0 0 64 64","enable-background","new 0 0 64 64",0,"xml","space","preserve"],["id","Text-files"],["d",`M53.9791489,9.1429005H50.010849c-0.0826988,0-0.1562004,0.0283995-0.2331009,0.0469999V5.0228
            C49.7777481,2.253,47.4731483,0,44.6398468,0h-34.422596C7.3839517,0,5.0793519,2.253,5.0793519,5.0228v46.8432999
            c0,2.7697983,2.3045998,5.0228004,5.1378999,5.0228004h6.0367002v2.2678986C16.253952,61.8274002,18.4702511,64,21.1954517,64
            h32.783699c2.7252007,0,4.9414978-2.1725998,4.9414978-4.8432007V13.9861002
            C58.9206467,11.3155003,56.7043495,9.1429005,53.9791489,9.1429005z M7.1110516,51.8661003V5.0228
            c0-1.6487999,1.3938999-2.9909999,3.1062002-2.9909999h34.422596c1.7123032,0,3.1062012,1.3422,3.1062012,2.9909999v46.8432999
            c0,1.6487999-1.393898,2.9911003-3.1062012,2.9911003h-34.422596C8.5049515,54.8572006,7.1110516,53.5149002,7.1110516,51.8661003z
             M56.8888474,59.1567993c0,1.550602-1.3055,2.8115005-2.9096985,2.8115005h-32.783699
            c-1.6042004,0-2.9097996-1.2608986-2.9097996-2.8115005v-2.2678986h26.3541946
            c2.8333015,0,5.1379013-2.2530022,5.1379013-5.0228004V11.1275997c0.0769005,0.0186005,0.1504021,0.0469999,0.2331009,0.0469999
            h3.9682999c1.6041985,0,2.9096985,1.2609005,2.9096985,2.8115005V59.1567993z`],["d",`M38.6031494,13.2063999H16.253952c-0.5615005,0-1.0159006,0.4542999-1.0159006,1.0158005
            c0,0.5615997,0.4544001,1.0158997,1.0159006,1.0158997h22.3491974c0.5615005,0,1.0158997-0.4542999,1.0158997-1.0158997
            C39.6190491,13.6606998,39.16465,13.2063999,38.6031494,13.2063999z`],["d",`M38.6031494,21.3334007H16.253952c-0.5615005,0-1.0159006,0.4542999-1.0159006,1.0157986
            c0,0.5615005,0.4544001,1.0159016,1.0159006,1.0159016h22.3491974c0.5615005,0,1.0158997-0.454401,1.0158997-1.0159016
            C39.6190491,21.7877007,39.16465,21.3334007,38.6031494,21.3334007z`],["d",`M38.6031494,29.4603004H16.253952c-0.5615005,0-1.0159006,0.4543991-1.0159006,1.0158997
            s0.4544001,1.0158997,1.0159006,1.0158997h22.3491974c0.5615005,0,1.0158997-0.4543991,1.0158997-1.0158997
            S39.16465,29.4603004,38.6031494,29.4603004z`],["d",`M28.4444485,37.5872993H16.253952c-0.5615005,0-1.0159006,0.4543991-1.0159006,1.0158997
            s0.4544001,1.0158997,1.0159006,1.0158997h12.1904964c0.5615025,0,1.0158005-0.4543991,1.0158005-1.0158997
            S29.0059509,37.5872993,28.4444485,37.5872993z`],["variant","nav-item",3,"popperOptions",4,"ngIf"],["variant","nav-item",3,"popperOptions"],["cDropdownToggle","","aria-label","Open user menu",1,"py-0","pe-0",3,"caret"],["cIcon","","name","cilSettings",2,"height","2rem","width","2rem"],["cDropdownMenu","",1,"pt-0","w-auto"],["cDropdownItem","",2,"cursor","pointer","text-decoration","none",3,"click"],["cIcon","","name","cilPencil",1,"me-2"],["cIcon","","name","cilTrash",1,"me-2"],["backdrop","static","id","staticBackdropModal",3,"visibleChange","visible"],["cModalTitle",""],["cButtonClose","",3,"click"],["cButton","","color","secondary",3,"click"],["cButton","","color","danger",3,"click"]],template:function(a,o){a&1&&(f(0,je,30,14,"div",1),i(1,"div",2)(2,"c-card")(3,"c-card-header")(4,"h5"),l(5,"Merchant List"),r()(),i(6,"c-card-body")(7,"c-pagination",3)(8,"li",4)(9,"a",5),g("click",function(){return o.handlePagination(o.currentPage-1)}),l(10,"Previous"),r()(),f(11,$e,4,5,"ng-container",6),i(12,"li",4)(13,"a",5),g("click",function(){return o.handlePagination(o.currentPage+1)}),l(14,"Next"),r()()(),i(15,"table",7)(16,"thead")(17,"tr")(18,"th",8),l(19,"#"),r(),i(20,"th",8),l(21,"Merchant Name"),r(),i(22,"th",8),l(23,"Deposit URL"),r(),i(24,"th",8),l(25,"Withdrawal URL"),r(),i(26,"th",8),l(27,"Merchant Status URL"),r(),i(28,"th",8),l(29,"Action"),r()()(),i(30,"tbody"),f(31,We,4,0,"ng-container",9)(32,Xe,2,1,"ng-container",9),r()()()()(),f(33,Ze,16,3,"div",9)),a&2&&(d("ngIf",o.access==null?null:o.access.add),m(8),d("disabled",o.currentPage===1)("ngStyle",T(9,A,o.currentPage===1?"":"pointer")),m(3),d("ngForOf",o.numSequence(o.totalPages)),m(),d("disabled",o.currentPage===o.totalPages)("ngStyle",T(11,A,o.currentPage===o.totalPages?"":"pointer")),m(19),d("ngIf",!o.merchantList.length),m(),d("ngIf",o.merchantList.length),m(),d("ngIf",o.deleteModalVisible))},dependencies:[pe,de,he,le,me,ee,ae,oe,re,ce,ge,_e,ve,Y,ue,J,z,j,$,W,se,X,te,ne,ie,Z,Fe,Me,Te,Ve,xe,Ee,Ce,we,Le,ye,Ie,De,Ae,Oe],styles:[".example-wrapper[_ngcontent-%COMP%]{display:flex;flex-direction:column;height:100%}#myGrid[_ngcontent-%COMP%]{flex:1 1 0px;width:100%}.example-header[_ngcontent-%COMP%]{font-family:Verdana,Geneva,Tahoma,sans-serif;font-size:13px;margin-bottom:5px}.value[_ngcontent-%COMP%]{margin-right:20px;font-weight:700;width:50px;display:inline-block;text-align:right;padding-right:2px}"]});let s=u;return s})();export{Mt as MerchantComponent};