import { Component, OnInit } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  
  constructor(private permissionsService: NgxPermissionsService) { }

  ngOnInit(): void {
    console.log("get");
    // this.permissionsService.loadPermissions(['Admin', 'Staff']);
    this.loadPermission();
  }

  loadPermission() {
    this.permissionsService.flushPermissions();
    const perm = []
    perm.push(localStorage.getItem('userRole'))
    this.permissionsService.addPermission(perm)
    this.permissionsService.loadPermissions(perm, (permissionName, permissionStore) => {
      return !!permissionStore[permissionName];
    })
  }
}
