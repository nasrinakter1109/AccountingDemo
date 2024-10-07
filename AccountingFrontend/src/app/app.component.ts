import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ModalService } from './Shared/modal.service';
import { ModalComponent } from './Shared/modal/modal.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit , AfterViewInit {
  @ViewChild(ModalComponent) modalComponent!: ModalComponent;
  constructor(private modalService: ModalService) {}
 ngAfterViewInit() {
    this.modalService.setModal(this.modalComponent);
  }
  ngOnInit() {
    setTimeout(() => {
      this.modalService.setModal(this.modalComponent);
    });
  }

  triggerModal() {
    console.log("Trigger Modal")
    this.modalService.show('Example Title', 'This is an example message!');
  }
}
