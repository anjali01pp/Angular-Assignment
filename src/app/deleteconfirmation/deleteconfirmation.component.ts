import { Component ,Input,Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-deleteconfirmation',
  templateUrl: './deleteconfirmation.component.html',
  styleUrls: ['./deleteconfirmation.component.css']
})
export class DeleteconfirmationComponent {
  @Input() message!: string;
  @Output() confirmed = new EventEmitter<boolean>();

  confirmDelete() {
    this.confirmed.emit(true);
  }

  cancelDelete() {
    this.confirmed.emit(false);
  }
}
