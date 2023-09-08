import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EllipsifyPipe } from './ellipsify.pipe';
import { SplitStringPipe } from './split-string.pipe';
import { MessageModalComponent } from './componentes/message-modal/message-modal.component';

@NgModule({
  imports: [CommonModule],
  declarations: [EllipsifyPipe, SplitStringPipe, MessageModalComponent],
  exports: [EllipsifyPipe, SplitStringPipe, MessageModalComponent],
})
export class SharedModule {}
