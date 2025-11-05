import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-message-modal',
    templateUrl: './message-modal.component.html',
    styleUrls: ['./message-modal.component.css'],
    standalone: true
})
export class MessageModalComponent {

  @Input() message: string = '';
  @Input() titulo: string = '';

  constructor(public activeModal: NgbActiveModal) {}

}
