import { trigger, transition, style, query, animate, animateChild, group } from '@angular/animations';
export const routeTransitionAnimations = trigger('triggerName', [
  transition('work-orders => tickets', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100%',
        zIndex: '99'
      })
    ]),
    query(':enter', [style({ right: '-100%', opacity: 0 })]),
    query(':leave', animateChild()),
    group([
      query(':leave', [animate('.5s ease-out', style({ right: '100%', opacity: 0 }))]),
      query(':enter', [animate('.5s ease-out', style({ right: '0%', opacity: 1 }))])
    ]),
    query(':enter', animateChild())
  ]), transition('tickets => work-orders', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: '99'
      })
    ]),
    query(':enter', [style({ left: '-100%', opacity: 0 })]),
    query(':leave', animateChild()),
    group([
      query(':leave', [animate('.5s ease-out', style({ left: '100%', opacity: 0 }))]),
      query(':enter', [animate('.5s ease-out', style({ left: '0%', opacity: 1 }))])
    ]),
    query(':enter', animateChild())
  ]),
  transition('work-orders => followup-tickets', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100%',
        zIndex: '99'
      })
    ]),
    query(':enter', [style({ right: '-100%', opacity: 0 })]),
    query(':leave', animateChild()),
    group([
      query(':leave', [animate('.5s ease-out', style({ right: '100%', opacity: 0 }))]),
      query(':enter', [animate('.5s ease-out', style({ right: '0%', opacity: 1 }))])
    ]),
    query(':enter', animateChild())
  ]), transition('followup-tickets => work-orders', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: '99'
      })
    ]),
    query(':enter', [style({ left: '-100%', opacity: 0 })]),
    query(':leave', animateChild()),
    group([
      query(':leave', [animate('.5s ease-out', style({ left: '100%', opacity: 0 }))]),
      query(':enter', [animate('.5s ease-out', style({ left: '0%', opacity: 1 }))])
    ]),
    query(':enter', animateChild())
  ]),
]);
