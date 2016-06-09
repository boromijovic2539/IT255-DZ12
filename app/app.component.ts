import {Component} from 'angular2/core';
import {RouteConfig,Router, ROUTER_DIRECTIVES} from 'angular2/router';
import { HomeComponent } from 'app/home/home.component';
import { FindRoomComponent } from 'app/findroom/findroom.component';
import { LoginComponent } from 'app/login/login.component';
import { RegisterComponent } from 'app/register/register.component';
import { AddRoomComponent } from 'app/addroom/addroom.component';
import {Pipe} from 'angular2/core';

@Component({
 selector: 'moja-aplikacija',
 templateUrl: 'app/router.html',
 directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
 {path:'/FindRoom', name: 'FindRoom', component: FindRoomComponent},
 {path:'/Login', name:'Login', component: LoginComponent},
 {path:'/Home', name:'Home', component: HomeComponent, useAsDefault: true},
 {path:'/Register', name:'Register', component: RegisterComponent},
 {path:'/AddRoom', name:'AddRoom', component: AddRoomComponent}
 ])
export class AppComponent { 
	router: Router;
	isAuth: String;
	
	constructor(router: Router) {
		this.router = router;
		  router.subscribe((val) => {
		  if(localStorage.getItem('token') !== null){
				this.isAuth = "yes";
		  }else{
			    this.isAuth = "no";
		  }
		  });
	}
	
 onLogout(): void {
	localStorage.removeItem("token");
	 this.router.navigate(['./Home']);
	if(localStorage.getItem('token') !== null){
		this.isAuth = "yes";
	}else{
		this.isAuth = "no";
	}
 }
}