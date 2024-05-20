import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routeTransitionAnimations } from "./transition-animations"

@Component({
  selector: 'app-folders-layout',
  templateUrl: './folders-layout.component.html',
  styleUrls: ['./folders-layout.component.scss'],
  animations: [routeTransitionAnimations]
})
export class FoldersLayoutComponent implements OnInit, AfterViewInit {

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
