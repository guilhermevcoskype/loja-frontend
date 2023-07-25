import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultImagePipe } from './default-image.pipe';
import { EllipsifyPipe } from './ellipsify.pipe';
import { SplitStringPipe } from './split-string.pipe';
import { MessageModalComponent } from './componentes/message-modal/message-modal.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DefaultImagePipe, EllipsifyPipe, SplitStringPipe, MessageModalComponent],
  exports: [DefaultImagePipe, EllipsifyPipe, SplitStringPipe, MessageModalComponent]
})
export class SharedModule { }
/*
@NgModule({
  declarations: [DefaultImagePipe, EllipsifyPipe, SplitStringPipe],
  imports: [
    CommonModule
  ],
  exports: [
    DefaultImagePipe,
    EllipsifyPipe,
    SplitStringPipe
  ]
})
export class SharedModule { } */
