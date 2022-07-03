import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {
  
  title = 'Sistema de DAWII - Jacinto';

  constructor(http: HttpClient ){

  }

  ngOnInit() {
    (function(d, m){
    var kommunicateSettings = {"appId":"1faaaec3e7961ef9d8af25666e2d0dd60","conversationTitle":"Bot"};
    var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
    s.src = "https://api.kommunicate.io/v2/kommunicate.app";
    var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
    (window as any).kommunicate = m; m._globals = kommunicateSettings;
    })(document, (window as any).kommunicate || {});
    }
}
