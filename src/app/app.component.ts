import { Component } from '@angular/core';
import { RodapeComponent } from './rodape/rodape.component';
import { RouterOutlet } from '@angular/router';
import { CabecalhoComponent } from './cabecalho/cabecalho/cabecalho.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [CabecalhoComponent, RouterOutlet, RodapeComponent]
})
export class AppComponent {
  title = 'loja-frontend';
}
