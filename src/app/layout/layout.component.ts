import { Component, OnInit } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(
    private permissionsService: NgxPermissionsService
  ) { }

  ngOnInit() {
    this.loadPermission();
  }

  loadPermission(){
    this.permissionsService.flushPermissions();
    const perm = []
    perm.push(localStorage.getItem('userRole'))
    this.permissionsService.addPermission(perm)
    this.permissionsService.loadPermissions(perm, (permissionName, permissionStore) => {
      return !!permissionStore[permissionName];
    })
  }

}
