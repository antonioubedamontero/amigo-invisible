"use strict";(self.webpackChunkamigo_invisible=self.webpackChunkamigo_invisible||[]).push([[535],{8535:(U,d,e)=>{e.r(d),e.d(d,{FormModule:()=>J});var c=e(6814),l=e(1896),g=e(3999),a=e(6223),t=e(5879),h=e(9515),v=e(497),u=e(5195),m=e(4170),_=e(2296),x=e(617),C=e(2032),b=e(2596),T=e(5940);function Z(i,s){if(1&i&&(t.TgZ(0,"div",10),t._UZ(1,"mat-spinner"),t._uU(2),t.qZA()),2&i){const n=t.oxw(2);t.xp6(2),t.hij(" ",n.i18n.loading," ")}}function F(i,s){if(1&i){const n=t.EpF();t.TgZ(0,"div",14)(1,"mat-form-field",15),t._UZ(2,"input",16),t.TgZ(3,"mat-error"),t._uU(4),t.qZA(),t.TgZ(5,"mat-icon",17),t._uU(6,"emoji_emotions"),t.qZA()(),t.TgZ(7,"button",18),t.NdJ("click",function(){const p=t.CHM(n).index,N=t.oxw(3);return t.KtG(N.removeParticipant(p))}),t.TgZ(8,"mat-icon",19),t._uU(9,"delete_forever"),t.qZA()()()}if(2&i){const n=s.index,o=t.oxw(3);t.xp6(2),t.Q6J("placeholder",o.i18n.personField.placeHolder)("formControlName",n),t.xp6(2),t.hij(" ",o.getControlErrors(n)," "),t.xp6(3),t.Q6J("matTooltip",o.i18n.buttons.remove)}}function P(i,s){if(1&i&&(t.TgZ(0,"form",11)(1,"mat-card")(2,"mat-card-content",12),t.YNc(3,F,10,4,"div",13),t.qZA()()()),2&i){const n=t.oxw(2);t.Q6J("formGroup",n.raffleForm),t.xp6(3),t.Q6J("ngForOf",n.participants.controls)}}function O(i,s){if(1&i){const n=t.EpF();t.TgZ(0,"div",1)(1,"div",2),t.YNc(2,Z,3,1,"div",3),t.TgZ(3,"h1"),t._uU(4),t.qZA(),t.TgZ(5,"p"),t._uU(6),t.qZA(),t.TgZ(7,"div",4)(8,"button",5),t.NdJ("click",function(){t.CHM(n);const r=t.oxw();return t.KtG(r.addParticipant())}),t.TgZ(9,"mat-icon",6),t._uU(10,"add"),t.qZA(),t._uU(11),t.qZA(),t.TgZ(12,"button",7),t.NdJ("click",function(){t.CHM(n);const r=t.oxw();return t.KtG(r.cleanParticipants())}),t.TgZ(13,"mat-icon",6),t._uU(14,"delete_forever"),t.qZA(),t._uU(15),t.qZA()(),t.YNc(16,P,4,2,"form",8),t.TgZ(17,"div")(18,"button",9),t.NdJ("click",function(){t.CHM(n);const r=t.oxw();return t.KtG(r.generateRaffle())}),t.TgZ(19,"mat-icon"),t._uU(20,"redeem"),t.qZA(),t._uU(21),t.qZA()()()()}if(2&i){const n=t.oxw();t.xp6(2),t.Q6J("ngIf",n.loading),t.xp6(2),t.Oqu(n.i18n.title),t.xp6(2),t.Oqu(n.i18n.selectText),t.xp6(2),t.Q6J("disabled",n.hasBlankPersons),t.xp6(3),t.hij(" ",n.i18n.buttons.add," "),t.xp6(1),t.Q6J("disabled",0===n.participants.length),t.xp6(3),t.hij(" ",n.i18n.buttons.deleteAll," "),t.xp6(1),t.Q6J("ngIf",n.hasParticipants),t.xp6(2),t.Q6J("disabled",n.participants.length<2||n.raffleForm.invalid),t.xp6(3),t.hij(" ",n.i18n.sendButton," ")}}const M=[{path:"",component:(()=>{class i{constructor(n,o,r,p){this.fb=n,this.translateService=o,this.router=r,this.raffleService=p,this.loading=!1,this.suscriptions=[],this.raffleForm=this.fb.group({participants:this.fb.array([])})}ngOnInit(){const n=g.A.subscribe(o=>{this.getTranslations()});this.suscriptions.push(n)}ngOnDestroy(){this.suscriptions.forEach(n=>n.unsubscribe())}addParticipant(){this.participants.push(this.fb.control("",[a.kI.required,a.kI.minLength(2),this.noNameRepetitionsValidator()]))}removeParticipant(n){this.participants.removeAt(n)}cleanParticipants(){this.participants.clear()}generateRaffle(){this.loading=!0,this.raffleService.loadParticipants(this.participants.value),this.raffleService.generateRaffle(),this.loading=!1,this.router.navigate(["sorteo"])}get participants(){return this.raffleForm.get("participants")}get hasParticipants(){return this.participants.controls.length>0}get hasBlankPersons(){return!!this.participants.controls.find(n=>""===n.value)}getTranslations(){const n=this.translateService.get("form").subscribe(o=>{this.i18n=o});this.suscriptions.push(n)}getControlErrors(n){const o=this.participants.at(n);if(!o.errors)return"";const r=Object.keys(o.errors)[0];return this.i18n.personField[r]??this.i18n.personField.nonRegisteredError}noNameRepetitionsValidator(){return n=>this.participants.value.includes(n.value)?{repeatedName:!0}:null}static#t=this.\u0275fac=function(o){return new(o||i)(t.Y36(a.qu),t.Y36(h.sK),t.Y36(l.F0),t.Y36(v.m))};static#n=this.\u0275cmp=t.Xpm({type:i,selectors:[["app-form"]],decls:1,vars:1,consts:[["class","form-container",4,"ngIf"],[1,"form-container"],[1,"form-container__content"],["class","progess-spinner",4,"ngIf"],[1,"buttons"],["mat-raised-button","","color","primary",3,"disabled","click"],[1,"material-icons-outlined"],["mat-raised-button","","color","warn",3,"disabled","click"],["class","form-container__card",3,"formGroup",4,"ngIf"],["mat-raised-button","","color","primary",1,"button",3,"disabled","click"],[1,"progess-spinner"],[1,"form-container__card",3,"formGroup"],["formArrayName","participants"],["class","person",4,"ngFor","ngForOf"],[1,"person"],["appearance","outline"],["matInput","",3,"placeholder","formControlName"],["matSuffix","",1,"material-icons-outlined"],["mat-raised-button","","color","warn",1,"person__delete-icon-container",3,"matTooltip","click"],[1,"material-icon-outlined","delete-icon"]],template:function(o,r){1&o&&t.YNc(0,O,22,10,"div",0),2&o&&t.Q6J("ngIf",r.i18n)},dependencies:[c.sg,c.O5,u.a8,u.dn,m.KE,m.TO,m.R9,_.lW,x.Hw,C.Nt,b.gM,T.Ou,a._Y,a.Fj,a.JJ,a.JL,a.sg,a.u,a.CE],styles:[".form-container[_ngcontent-%COMP%]{height:100%;padding:0 .5rem;font-size:1.2rem}.form-container__content[_ngcontent-%COMP%]{height:100%;padding-block:1rem;text-align:center}.form-container__card[_ngcontent-%COMP%]{margin:auto;width:100%;margin-bottom:2rem}@media (min-width: 576px){.form-container[_ngcontent-%COMP%]{padding:0 2rem}.form-container__content[_ngcontent-%COMP%]{background-color:#f5f5f5}}.person[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:center;align-items:flex-start;gap:1rem}.person__delete-icon-container[_ngcontent-%COMP%]{height:3.4rem}.person__delete-icon-container[_ngcontent-%COMP%]   .delete-icon[_ngcontent-%COMP%]{margin:auto}.buttons[_ngcontent-%COMP%]{margin-block:2rem;display:flex;flex-direction:column;gap:1rem}.button[_ngcontent-%COMP%]{width:100%}@media (min-width: 576px){.buttons[_ngcontent-%COMP%]{flex-direction:row;justify-content:center}.button[_ngcontent-%COMP%]{width:auto}.form-container__card[_ngcontent-%COMP%]{width:max-content;min-width:45vw;max-width:90%}}.progess-spinner[_ngcontent-%COMP%]{margin-bottom:2rem;display:flex;gap:1rem;flex-direction:column;align-items:center;justify-content:center}"]})}return i})()}];let y=(()=>{class i{static#t=this.\u0275fac=function(o){return new(o||i)};static#n=this.\u0275mod=t.oAB({type:i});static#i=this.\u0275inj=t.cJS({imports:[l.Bz.forChild(M),l.Bz]})}return i})();var A=e(25);let J=(()=>{class i{static#t=this.\u0275fac=function(o){return new(o||i)};static#n=this.\u0275mod=t.oAB({type:i});static#i=this.\u0275inj=t.cJS({imports:[c.ez,y,A.m]})}return i})()}}]);