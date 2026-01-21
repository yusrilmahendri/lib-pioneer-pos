// Pipe untuk format rupiah
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'rupiah' })
export class RupiahPipe implements PipeTransform {
  transform(value: number | string): string {
    if (value === null || value === undefined || value === '') return '';
    const number = typeof value === 'string' ? parseInt(value.replace(/\D/g, ''), 10) : value;
    return 'Rp ' + number.toLocaleString('id-ID');
  }
}
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
import Swal from 'sweetalert2';
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
    RupiahPipe
  ],
  templateUrl: './create-product-components.component.html',
})
export class CreateProductComponentsComponent {

  private _visible = false;
  @Input()
  set visible(val: boolean) {
    this._visible = val;
    if (val) {
      this.doGetCategories();
      this.doGetStatuses();
      this.doGetForm();
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
  dataStatuses: any[] = [];

  productForm: any  =  FormGroup;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService
  ) { }


  // ngOnInit tidak perlu fetch data lagi
  ngOnInit() {}

  doGetCategories() {
    this.dataService.list(DataServiceType.MASTER_CATEGORY_PRODUCT).subscribe({
      next: (response) => {
        this.dataCategories = response?.data?.data ?? [];
      },
      error: (err) => {
        this.dataCategories = [];
      }
    });
  }

  doGetStatuses() {
    this.dataService.list(DataServiceType.MASTER_STATUS_PRODUCT).subscribe({
      next: (response) => {
        this.dataStatuses = response?.data?.data ?? [];
      },
      error: (err) => {
        this.dataStatuses = [];
      }
    });
  }

    // Event handler untuk input harga agar tetap format rupiah di tampilan, value tetap angka di form
  onHargaInput(value: string, controlName: string) {
    const numericValue = value.replace(/[^\d]/g, '');
    this.productForm.get(controlName).setValue(numericValue, { emitEvent: false });
  }

  doGetForm() {
    this.productForm = this.fb.group({
      tanggalInput: ['', Validators.required],
      namaProduk: ['', Validators.required],
      kodeProduk: ['', Validators.required],
      kategori: ['', Validators.required],
      hargaBeli: ['', Validators.required],
      hargaJual: ['', Validators.required],
      stok: ['', Validators.required],
      minimalStok: ['', Validators.required],
      status: ['', Validators.required],
    });
  }
  ngOnChanges() {
      this.doGetForm();
  }

  onSubmit() {
    if (this.productForm.valid) {
      const formData = this.productForm.value;
      if (this.mode === 'create') {
        this.dataService.create(DataServiceType.CRUD_PRODUCT, formData).subscribe({
          next: (response) => {
            Swal.fire({
              icon: 'success',
              title: 'Berhasil',
              text: 'Produk berhasil dibuat!',
              timer: 1500,
              showConfirmButton: false
            });
            this.onClose();
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Gagal',
              text: 'Gagal membuat produk!',
            });
            console.error('Gagal membuat produk:', err);
          }
        });
      } else if (this.mode === 'edit' && this.product && this.product.id) {
        this.dataService.update(DataServiceType.CRUD_PRODUCT, this.product.id, formData).subscribe({
          next: (response) => {
            Swal.fire({
              icon: 'success',
              title: 'Berhasil',
              text: 'Produk berhasil diupdate!',
              timer: 1500,
              showConfirmButton: false
            });
            this.onClose();
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Gagal',
              text: 'Gagal mengupdate produk!',
            });
            console.error('Gagal mengupdate produk:', err);
          }
        });
      }
    }
  }

    onClose() {
    this.visible = false;
    this.visibleChange.emit(false);
  }

  get title() {
    return this.mode === 'create' ? 'Tambah Produk' : 'Edit Produk';
  }
}
