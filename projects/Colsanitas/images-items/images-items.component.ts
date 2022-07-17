import { Component, OnInit } from '@angular/core';
import { Iteminfo } from 'src/app/models/itemayuda';
import { AyudaVentasServiceColsanitas } from 'src/app/services/items-colsanitas/ayuda-ventas.service';

@Component({
  selector: 'app-images-items',
  templateUrl: './images-items.component.html',
  styleUrls: ['./images-items.component.scss'],
})
export class ImagesItemsComponent implements OnInit {
  public itemsAyuda: Iteminfo[] = this.ayudaItem.itemsAyuda;
  constructor(public ayudaItem: AyudaVentasServiceColsanitas) {}

  ngOnInit() {}
}
