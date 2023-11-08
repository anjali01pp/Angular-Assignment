import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appChange]'
})
export class ChangeDirective {

  @Output() fileChanged: EventEmitter<any> = new EventEmitter();

  constructor() { }

  @HostListener('change', ['$event.target.files']) onChange(files: FileList): void {
    this.fileChanged.emit(files);
  }

}
