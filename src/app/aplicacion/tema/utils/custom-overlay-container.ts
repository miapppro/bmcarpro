import { Injectable } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

@Injectable()
export class CustomOverlayContainer extends OverlayContainer {
  override _createContainer(): void {
    const container = document.createElement('div');
    container.classList.add('cdk-overlay-container');

    const inputTag = document.getElementById('app') as HTMLInputElement;
    inputTag.appendChild(container);


    // document.getElementById('app').appendChild(container);
    this._containerElement = container;

    /*
    const inputTag = document.getElementById('name-input') as HTMLInputElement;
    const value = inputTag.value;
    */
  }
}
