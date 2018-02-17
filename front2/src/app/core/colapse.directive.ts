import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appColapse]'
})
export class ColapseDirective {
  @HostBinding('class.toggle') show = false;

  @HostListener('click') toggleOpen(){
    this.show = !this.show;
  }
  constructor(){}
}
