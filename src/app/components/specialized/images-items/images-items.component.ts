import { Component, OnInit } from '@angular/core';
import { Iteminfo } from 'src/app/models/itemayuda';
import { AyudaVentasService } from 'src/app/services/o3mobility/ayuda-ventas.service';

@Component({
  selector: 'app-images-items',
  templateUrl: './images-items.component.html',
  styleUrls: ['./images-items.component.scss'],
})
export class ImagesItemsComponent implements OnInit {
  public itemsAyuda: Iteminfo[] = this.ayudaItem.itemsAyuda;
  constructor(public ayudaItem: AyudaVentasService) {}

  ngOnInit() {}
}
