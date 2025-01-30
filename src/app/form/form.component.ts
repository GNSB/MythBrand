import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/header/header.component';
@Component({
  selector: 'app-form',
  imports: [FormsModule,CommonModule, HeaderComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})

export class FormComponent {

  formatoTallas = [
    {"id_t_talla":1, "value": "Ropa"},
    {"id_t_talla":2, "value":"Zapateria",},
    {"id_t_talla":3, "value":"tamaño"},
    {"id_t_talla":4, "value":"litros"}
  ]
  sizes: { [key: string]: number } = {

    s: 0,

    xs: 0,

    m: 0,

    l: 0,

    xl: 0,

    xxl: 0

  };
  sizesZapateria  = [35,36,37,38,39,40,41,42,43,44,45,46]

prices = [
  { name: 'xs', price: 10 },
  { name: 's', price: 12 },
  { name: 'm', price: 14 },
  { name: 'l', price: 16 },
  { name: 'xl', price: 18 },
  { name: 'xxl', price: 20 }
];

  submittedData: any[] = [];
  searchTerm: string = '';
  selectedItem: any; // Add this line to define the selectedItem property
  selectedColor: string = '';
  clothes: { name: string, selected: boolean, colors: string[], imgPath: string }[] = [
    { name: 'Shirt', selected: false, colors: ['red', 'blue', 'green'], imgPath: 'assets/images/shirts.webp' },
    { name: 'Pants', selected: false, colors: ['black', 'brown', 'gray'], imgPath: 'assets/images/pants.webp' },
    { name: 'Jacket', selected: false, colors: ['yellow', 'purple', 'orange'], imgPath: 'assets/images/jacket.webp' },
    { name: 'Shoes', selected: false, colors: ['white', 'pink', 'cyan'], imgPath: 'assets/images/shoes.webp' },
  ];

  filteredClothes: { name: string, selected: boolean, imgPath:string }[] = this.clothes;

  filterOptions(searchText: string) {

      this.filteredClothes = this.clothes.filter(option =>
           
       option.name.toLowerCase().includes(searchText.toLowerCase())

      );

  }
  selectItem(item: any): void {
    this.clothes.forEach(cloth => cloth.selected = false);
    item.selected = true;
    this.selectedItem = item;
  }

  selectColor(color: string) {

    this.selectedItem.selectedColor = color;

  }
  toggleSize(event: any,color:string): void {
    console.log(event);
    // Reset the scale of all items
    const items = document.querySelectorAll('.color-option');
    items.forEach(item => {
      (item as HTMLElement).style.transform = 'scale(1)';
    });

    // Increase the scale of the clicked item
    event.target.style.transform = 'scale(1.5)';
    this.selectColor(color)
  }

  getTotalPrice(): number {

    return this.submittedData.reduce((total, data) => total + data.prices, 0);

  }

  onSubmit() {
    // Add your form submission logic here
    console.log('Form submitted');

    // Update the table with the selected item and color
    if (this.selectedItem) {
      const selectedSizes = Object.keys(this.sizes).filter(size => this.sizes[size] > 0);
      const totalPrices = selectedSizes.reduce((total, size) => {
        const priceObj = this.prices.find(price => price.name === size);
        return total + (priceObj ? priceObj.price * this.sizes[size] : 0);
      }, 0);

      this.submittedData.push({
        item: this.selectedItem.name,
        color: this.selectedItem.selectedColor,
        sizes: this.sizes,
        prices: totalPrices
      });

      console.log(this.submittedData);

      // Reset the form values
      this.selectedItem.selected = false;
      this.selectedItem = null;
      this.selectedColor = '';
      this.sizes = {
        xs: 0,
        s: 0,
        m: 0,
        l: 0,
        xl: 0,
        xxl: 0
      };
    }
  }

}
