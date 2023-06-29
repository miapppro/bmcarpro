import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime } from 'rxjs/operators';
import { Menu } from '../../tema/components/menu/menu.model';
import { MenuService } from '../../tema/components/menu/menu.service';
import { VerticalMenuComponent } from '../../tema/components/menu/vertical-menu/vertical-menu.component';
import { listTransition } from '../../tema/utils/app-animation';
import { DynamicMenuService } from './dynamic-menu.service';


@Component({
  selector: 'app-dynamic-menu',
  templateUrl: './dynamic-menu.component.html',
  providers: [DynamicMenuService, MenuService],
  animations: [listTransition],
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    '[@listTransition]': ''
  }
})
export class DynamicMenuComponent implements OnInit, AfterViewInit {

  public menuItems: Array<Menu>;
  public icons = ['home', 'person', 'card_travel', 'delete', 'event', 'favorite', 'help'];
  public form!: FormGroup;
  constructor(
    public formBuilder: FormBuilder, public snackBar: MatSnackBar,
    private menuService: MenuService, private dynamicMenuService: DynamicMenuService) {

    this.menuItems = this.menuService.getVerticalMenuItems();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      icon: null,
      routerLink: ['', Validators.required],
      href: ['', Validators.required],
      target: null,
      hasSubMenu: false,
      parentId: 0
    });
  }

  ngAfterViewInit() {
    this.form.valueChanges.pipe(debounceTime(500)).subscribe((menu: Menu) => {
      if (menu.routerLink && menu.routerLink !== '') {
        this.form.controls.href.setValue(null);
        this.form.controls.href.disable();
        this.form.controls.href.clearValidators();
        this.form.controls.target.setValue(null);
        this.form.controls.target.disable();
      } else {
        this.form.controls.href.enable();
        this.form.controls.href.setValidators([Validators.required]);
        this.form.controls.target.enable();
      }
      this.form.controls.href.updateValueAndValidity();

      if (menu.href && menu.href !== '') {
        this.form.controls.routerLink.setValue(null);
        this.form.controls.routerLink.disable();
        this.form.controls.routerLink.clearValidators();
        this.form.controls.hasSubMenu.setValue(false);
        this.form.controls.hasSubMenu.disable();
      } else {
        this.form.controls.routerLink.enable();
        this.form.controls.routerLink.setValidators([Validators.required]);
        this.form.controls.hasSubMenu.enable();
      }
      this.form.controls.routerLink.updateValueAndValidity();
    });
  }

  onSubmit(menu: Menu): void {
    console.log('MENU FORM: ', menu);
    if (this.form.valid) {
      this.dynamicMenuService.addNewMenuItem(VerticalMenuComponent, this.menuItems, menu);
      this.form.reset({
        hasSubMenu: false,
        parentId: 0
      });
    }
  }

}
