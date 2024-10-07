import { Injectable } from '@angular/core';
import { ModalComponent } from './modal/modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalComponent!: ModalComponent;

  setModal(modal: ModalComponent) {
    console.log({modal})
    this.modalComponent = modal;
  }

  show(title: string, message: string) {
    console.log({Show:"Show modal"})
    if (this.modalComponent) {
      this.modalComponent.show(title, message);
    } else {
      console.error('Modal component not set!');
    }
  }

  close() {
    console.log("Close Modal")
    if (this.modalComponent) {
      this.modalComponent.closeModal();
    }
  }
}
