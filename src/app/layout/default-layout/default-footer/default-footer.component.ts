import { Component } from '@angular/core';
import { FooterComponent, ContainerComponent } from '@coreui/angular';

@Component({
  selector: 'app-default-footer',
  templateUrl: './default-footer.component.html',
  styleUrls: ['./default-footer.component.scss'],
  imports: [ContainerComponent]
})
export class DefaultFooterComponent extends FooterComponent {
  constructor() {
    super();
  }
}
