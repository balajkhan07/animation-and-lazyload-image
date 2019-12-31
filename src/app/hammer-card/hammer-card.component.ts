import { Component, OnInit } from '@angular/core';
import { trigger, keyframes, animate, transition } from '@angular/animations';
import * as kf from './keyframes';

@Component({
  selector: 'app-hammer-card',
  templateUrl: './hammer-card.component.html',
  styleUrls: ['./hammer-card.component.css'],
  animations: [
    trigger('cardAnimator', [
      transition('* => wobble', animate(1000, keyframes(kf.wobble))),
      transition('* => flipOutY', animate(1000, keyframes(kf.flipOutY))),
      transition('* => jello', animate(1000, keyframes(kf.jello))),
      transition('* => rotateOutUpRight', animate(1000, keyframes(kf.rotateOutUpRight))),
      transition('* => slideOutLeft', animate(1000, keyframes(kf.slideOutLeft))),
      transition('* => swing', animate(1000, keyframes(kf.swing))),
      transition('* => zoomOutRight', animate(1000, keyframes(kf.zoomOutRight)))
    ])
  ]
})
export class HammerCardComponent implements OnInit {

  animationState: string;

  constructor() { }

  ngOnInit() {
  }

  startAnimation(state: string) {
    if (!this.animationState) {
      this.animationState = state
    }
  }

  resetAnimationState() {
    this.animationState = ''
  }

}
