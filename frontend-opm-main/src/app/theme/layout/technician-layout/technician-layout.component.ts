import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routeTransitionAnimations } from './transition-animations';

@Component({
  selector: 'app-technician-layout',
  templateUrl: './technician-layout.component.html',
  styleUrls: ['./technician-layout.component.scss'],
  animations: [routeTransitionAnimations]
})
export class TechnicianLayoutComponent implements OnInit {

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animationState'];
  }

}
