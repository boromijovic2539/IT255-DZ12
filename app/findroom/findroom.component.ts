import { Component, Directive } from 'angular2/core';
import {Http, HTTP_PROVIDERS, Headers} from 'angular2/http';
import {SearchPipe} from 'app/pipe/search';
import {SearchPipeKV} from 'app/pipe/searchKV';
import 'rxjs/Rx';
import {Router, ROUTER_PROVIDERS} from 'angular2/router';
import { FormBuilder, Validators, ControlGroup, Control, FORM_DIRECTIVES, FORM_BINDINGS} from 'angular2/common'

@Component({
    selector: 'FindRoom',
    templateUrl: 'app/findroom/findroom.html',
    directives: [FORM_DIRECTIVES],
    viewBindings: [FORM_BINDINGS],
    pipes: [SearchPipe, SearchPipeKV]
})

export class FindRoomComponent {
    loginForm: ControlGroup;
    http: Http;
    router:Router;
    postResponse: String;
    beds:String ="";
    kvadratura:String ="";
    rooms: Object[];


    constructor(builder: FormBuilder, http: Http, router: Router){
        this.http = http;
        this.router = router;
        var headers = new Headers();

        http.get('http://localhost/php/getrooms.php',{headers:headers})
            .map(res => res.json()).share()
            .subscribe(rooms => {this.rooms = rooms.rooms;
            setInterval(function(){
                $('#example').dataTable({
					paging:false,
                    searching:false
                });
            },200);
            });

    }
}