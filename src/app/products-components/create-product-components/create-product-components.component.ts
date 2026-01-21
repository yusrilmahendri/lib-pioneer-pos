import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ModalComponent,
  ModalHeaderComponent,
  ModalBodyComponent,
  ModalFooterComponent,
  ModalTitleDirective,
  ButtonDirective,
  ButtonCloseDirective,
  ModalModule
} from '@coreui/angular';
import { DataService, DataServiceType } from '../../shared/service/data.service';
@Component({
  selector: 'app-create-product-components',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ModalComponent,
    ModalHeaderComponent,
    ModalBodyComponent,
    ModalFooterComponent,
    ModalTitleDirective,
    ButtonDirective,
    ButtonCloseDirective,
    ModalModule,
  ],
  templateUrl: './create-product-components.component.html',
})
export class CreateProductComponentsComponent {

  private _visible = false;
  @Input()
  set visible(val: boolean) {
    this._visible = val;
    if (val) {
      this.doGetForm();
      this.doGetCategories();
    }
  }
  get visible() {
    return this._visible;
  }
  @Output() visibleChange = new EventEmitter<boolean>();

   // properti tambahan untuk mode/titel
  @Input() mode: 'create' | 'edit' = 'create';
  @Input() product: any = null; // data produk jika edit

  dataCategories: any[] = [];
  form: any  =  FormGroup;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService
  ) { }


  // ngOnInit tidak perlu fetch data lagi
  ngOnInit() {}

  doGetCategories() {
    this.dataService.list(DataServiceType.MASTER_CATEGORY).subscribe({
      next: (response) => {
        this.dataCategories = response?.data?.data ?? [];
      },
      error: (err) => {
        console.error('Gagal mengambil data kategori:', err);
        this.dataCategories = [];
      }
    });
  }

  doGetForm() { this.form = this.fb.group({
      tanggalInput: ['', Validators.required],
      namaProduk: ['', Validators.required],
      kodeProduk: ['', Validators.required],
      kategori: ['', Validators.required],
      hargaBeli: ['', Validators.required],
      hargaJual: ['', Validators.required],
      stok: ['', Validators.required],
      minimalStok: ['', Validators.required],
      status: ['Tersedia', Validators.required],
    });
  }
  ngOnChanges() {
      this.doGetForm();

  }

  onClose() {
    this.visible = false;
    this.visibleChange.emit(false);
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('✅ Data Produk:', this.form.value);
      this.onClose();
    }
  }

  get title() {
    return this.mode === 'create' ? 'Tambah Produk' : 'Edit Produk';
  }
}
