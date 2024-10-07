import { Component } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  modalTitle: string = '';
  modalMessage: string = '';
  isVisible: boolean = false; // State to control modal visibility

  show(title: string, message: string) {
    console.log("Show modal on component")
    this.modalTitle = title;
    this.modalMessage = message;
    this.isVisible = true; // Show the modal
  }

  closeModal() {
    console.log("Close modal on component")
    this.isVisible = false; // Hide the modal
  }
}
