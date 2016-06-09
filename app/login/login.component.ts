import { Component, Directive } from 'angular2/core';
import {FormBuilder, Validators, ControlGroup, Control, FORM_DIRECTIVES, FORM_BINDINGS} from 'angular2/common'
import {Http, HTTP_PROVIDERS, Headers} from 'angular2/http';
import 'rxjs/Rx';
import {Router, ROUTER_PROVIDERS} from 'angular2/router'


@Component({
 selector: 'Login',
 templateUrl: 'app/login/login.html',
 styleUrls: ['css/style.css'],
  directives: [FORM_DIRECTIVES],
  viewBindings: [FORM_BINDINGS]
})
export class LoginComponent { 

  loginForm: ControlGroup;
  http: Http;
  router: Router;
  postResponse: String;
  
    constructor(builder: FormBuilder, http: Http,  router: Router) {
	this.http = http;
	this.router = router;
    this.loginForm = builder.group({
     email: ["", Validators.none],
     password: ["", Validators.none],
   });
   
   if(localStorage.getItem('token') != null){
		 this.router.parent.navigate(['./Home']);
   }
   
  }
  onLogin(): void {
	var data = "email="+this.loginForm.value.email+"&password="+this.loginForm.value.password;
	var headers = new Headers();
	headers.append('Content-Type', 'application/x-www-form-urlencoded');
	this.http.post('http://localhost/php/loginservice.php',data, {headers:headers})
    .map(res => res)
    .subscribe( data => this.postResponse = data,
	err => alert(JSON.stringify(err)),
	() => { 
	 if(this.postResponse._body.indexOf("error") === -1){
		var obj = JSON.parse(this.postResponse._body);
		localStorage.setItem('token', obj.token);
	    this.router.parent.navigate(['./Home']);
	 }else{
		var obj = JSON.parse(this.postResponse._body);
		document.getElementsByClassName("alert")[0].style.display = "block";
		document.getElementsByClassName("alert")[0].innerHTML = obj.error.split("\\r\\n").join("<br/>").split("\"").join("");
	 }
	 }
	);
	
  }
}
