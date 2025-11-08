import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  AvatarComponent,
  ButtonDirective,
  ButtonGroupComponent,
  CardBodyComponent,
  CardComponent,
  CardFooterComponent,
  CardHeaderComponent,
  ColComponent,
  FormCheckLabelDirective,
  GutterDirective,
  ProgressComponent,
  TableDirective,
  BadgeComponent,
  ButtonModule,
  PageItemDirective,
  PageLinkDirective,
  PaginationComponent,
  ButtonCloseDirective,
  ModalBodyComponent,
  ModalComponent,
  ModalHeaderComponent,
  ModalTitleDirective,
  RowComponent,
  InputGroupComponent,
  DropdownComponent,
  DropdownToggleDirective,
  DropdownItemDirective,
  NavComponent,
  NavItemComponent,
  NavLinkDirective,
} from '@coreui/angular';
import { IconDirective, IconSetService } from '@coreui/icons-angular'; // Untuk c-icon
import { cilCalendar ,cilPencil, cilTrash, cilPlus , cilPrint, cilSearch, cilYen  } from '@coreui/icons';

// --- Interface Definitions ---
interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  unit?: string;
}

interface CartItem extends Product {
  quantity: number;
  total: number;
}
// --- End Interface Definitions ---

@Component({
  selector: 'app-cashier-components',
  imports: [
      CommonModule, // Diperlukan untuk *ngIf, *ngFor
      FormsModule, // Diperlukan untuk [(ngModel)]
      // CoreUI Component Imports:
      AvatarComponent,
      ButtonDirective,
      ButtonGroupComponent,
      CardBodyComponent,
      CardComponent,
      CardFooterComponent,
      CardHeaderComponent,
      ColComponent,
      FormCheckLabelDirective,
      GutterDirective,
      ProgressComponent,
      TableDirective,
      BadgeComponent,
      ButtonModule,
      PageItemDirective,
      PageLinkDirective,
      PaginationComponent,
      ButtonCloseDirective,
      ModalBodyComponent,
      ModalComponent,
      ModalHeaderComponent,
      ModalTitleDirective,
      RowComponent,
      InputGroupComponent,
      DropdownComponent,
      DropdownToggleDirective,
      DropdownItemDirective,
      NavComponent,
      NavItemComponent,
      NavLinkDirective,
      IconDirective,
      ],
  standalone: true,
  templateUrl: './cashier-components.component.html',
  styleUrl: './cashier-components.component.scss',
  providers: [IconSetService]
})
export class CashierComponentsComponent implements OnInit {
// --- Data & State Management (Signals) ---

  public icons = { cilPencil, cilTrash, cilPlus, cilPrint, cilSearch, cilYen, cilCalendar};
  // Data statis (simulasi data produk dari backend)
  products: Product[] = [
    { id: 'BRG-0B1', name: 'Aqua 500ml', price: 15000, stock: 120, category: 'Minuman', unit: 'Minuman' },
    { id: 'BRG-0A1S', name: 'Indomie goreng telur', price: 15000, stock: 120, category: 'Makanan', unit: 'Makanan' },
    { id: 'BRG-0C01', name: 'Chickroll regular', price: 35000, stock: 30, category: 'Cemilan', unit: 'Cemilan' },
    { id: 'BRG-0C02', name: 'Chickroll big one', price: 45000, stock: 20, category: 'Cemilan', unit: 'Cemilan' },
    { id: 'BRG-0C03', name: 'Coffee Mawang', price: 25000, stock: 50, category: 'Minuman', unit: 'Minuman' },
  ];

  // State
  cartItems = signal<CartItem[]>([]);
  discountPercentage = signal<number>(0);
  ppnPercentage = signal<number>(11); // PPN 11% sesuai gambar

  selectedCategory = signal<string>('Semua');
  searchText = signal<string>('');
  kasirName = 'Ahmad Budi Utomo';
  transactionDate = '22/10/2025';
  branchName = 'Chickroll Yogyakarta';

  // --- Computed Signals ---

  // Filter produk berdasarkan kategori dan pencarian
  filteredProducts = computed(() => {
    const category = this.selectedCategory();
    const text = this.searchText().toLowerCase();

    return this.products.filter(p => {
      const matchesCategory = category === 'Semua' || p.category === category;
      const matchesSearch = p.name.toLowerCase().includes(text) || p.id.toLowerCase().includes(text);
      return matchesCategory && matchesSearch;
    });
  });

  // Total biaya sebelum diskon dan PPN
  subTotal = computed(() => {
    return this.cartItems().reduce((sum, item) => sum + item.total, 0);
  });

  // Total item di keranjang
  totalItems = computed(() => {
    return this.cartItems().reduce((sum, item) => sum + item.quantity, 0);
  });

  // Nilai diskon dalam Rupiah
  discountAmount = computed(() => {
    return this.subTotal() * (this.discountPercentage() / 100);
  });

  // SubTotal setelah diskon
  subTotalAfterDiscount = computed(() => {
    return this.subTotal() - this.discountAmount();
  });

  // Nilai PPN dalam Rupiah
  ppnAmount = computed(() => {
    // PPN dihitung dari subTotal setelah diskon
    return this.subTotalAfterDiscount() * (this.ppnPercentage() / 100);
  });

  // Total akhir yang harus dibayar
  totalPayment = computed(() => {
    return this.subTotalAfterDiscount() + this.ppnAmount();
  });


  ngOnInit(): void {
    // Simulasi penambahan item awal jika diperlukan
    // this.addToCart(this.products[0]);
  }

  // --- Methods ---

  // Menambah produk ke keranjang
  addToCart(product: Product): void {
    if (product.stock <= 0) {
      console.warn(`Produk ${product.name} habis.`);
      return;
    }

    this.cartItems.update(items => {
      const existingItem = items.find(item => item.id === product.id);

      if (existingItem) {
        if (existingItem.quantity < product.stock) {
             existingItem.quantity += 1;
             existingItem.total = existingItem.quantity * existingItem.price;
        } else {
             console.warn(`Stok maksimum untuk ${product.name} tercapai.`);
        }
      } else {
        items.push({
          ...product,
          quantity: 1,
          total: product.price
        });
      }

      return [...items]; // Kembalikan array baru untuk memicu pembaruan Signal
    });
  }

  // Mengubah kuantitas item di keranjang
  updateCartItemQuantity(itemId: string, newQuantity: number): void {
    this.cartItems.update(items => {
      const itemIndex = items.findIndex(item => item.id === itemId);

      if (itemIndex > -1) {
        const item = items[itemIndex];
        const productData = this.products.find(p => p.id === itemId);
        const maxStock = productData?.stock ?? Infinity;

        // Kuantitas tidak boleh negatif dan tidak boleh melebihi stok
        item.quantity = Math.max(0, Math.min(newQuantity, maxStock));
        item.total = item.quantity * item.price;

        // Hapus jika kuantitas 0
        if (item.quantity === 0) {
          items.splice(itemIndex, 1);
        }
      }

      return [...items];
    });
  }

  computeRemoveItem(itemId: string): void {
    this.cartItems.update(items => {
      return items.filter(item => item.id !== itemId);
    });
  }

  // Mengosongkan keranjang
  clearCart(): void {
    this.cartItems.set([]);
  }

  // Simulasi proses pembayaran
  checkout(): void {
    if (this.totalPayment() > 0) {
      // Mengganti alert() dengan console.log() atau modal kustom
      console.log(`Pembayaran sejumlah Rp ${this.formatRupiah(this.totalPayment())} berhasil!`);
      this.clearCart();
    } else {
      console.warn('Keranjang masih kosong.');
    }
  }

  // Helper untuk format Rupiah
  formatRupiah(number: number): string {
    return number.toLocaleString('id-ID');
  }
}