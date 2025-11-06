import { Component  } from '@angular/core';
import { RouterLink  } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  ContainerComponent,
  RowComponent
} from '@coreui/angular';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-forget-password',
  imports: [
    RouterLink, 
    FormsModule, 
    ReactiveFormsModule, 
    ContainerComponent,
    RowComponent
  ],
  standalone: true,
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent {

}
