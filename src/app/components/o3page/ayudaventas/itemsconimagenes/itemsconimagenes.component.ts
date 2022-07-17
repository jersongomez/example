import { Component, OnInit } from '@angular/core';
import { Iteminfo } from 'src/app/models/itemayuda';
import { AyudaVentasService } from 'src/app/services/o3mobility/ayuda-ventas.service';

@Component({
  selector: 'app-itemsconimagenes',
  templateUrl: './itemsconimagenes.component.html',
  styleUrls: ['./itemsconimagenes.component.scss'],
})
export class ItemsconimagenesComponent implements OnInit {
  public itemsAyuda: Iteminfo[] = this.ayudaItem.itemsAyuda;

  constructor(public ayudaItem: AyudaVentasService) {}

  ngOnInit() {}
}
