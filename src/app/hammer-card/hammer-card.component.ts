import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { trigger, keyframes, animate, transition } from '@angular/animations';
import * as kf from './keyframes';
import { Photos } from './photos';

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
  photos: Photos[]
  @ViewChildren('img') img: QueryList<ElementRef>

  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.fetchImages()
    setTimeout(() => {
      this.img.forEach(i => this.lazyLoadImages(i.nativeElement))
    },2000);
  }

  lazyLoadImages(target) {
    const io = new IntersectionObserver((entries, observer) => {
      let img = entries.forEach(entry => {
        console.log('intersecting');
        if (entry.isIntersecting) {
          const img = entry.target
          const src = img.getAttribute('data-lazy')
          img.setAttribute('src', src)
          img.classList.add('fade')
          observer.disconnect()
        }
      })
    })
    io.observe(target)
  }

  fetchImages() {
    fetch(`https://jsonplaceholder.typicode.com/users`).then(async (response: Response) => {
      this.photos = await response.json()
    })
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
