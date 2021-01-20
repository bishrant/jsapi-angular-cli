import {Component, OnInit, ViewChild} from '@angular/core';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import MapView from '@arcgis/core/views/MapView';
import WebMap from '@arcgis/core/WebMap';
import Sketch from '@arcgis/core/widgets/Sketch';
import esriConfig from '@arcgis/core/config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private view: any = null;
  @ViewChild('mapViewNode', { static: true }) private mapViewEl: any;
  constructor() { }

  initializeMap(): Promise<any> {
    const container = this.mapViewEl.nativeElement;

    const webmap = new WebMap({
      portalItem: {
        id: 'aa1d3f80270146208328cf66d022e09c',
      },
    });

    const view = new MapView({
      container,
      map: webmap
    });

    this.view = view;
    const gLayer = new GraphicsLayer();
    webmap.add(gLayer);

    const sketch = new Sketch({
      view,
      layer: gLayer
    });
    view.ui.add(sketch, "top-right");
    return this.view.when();
  }

  ngOnInit(): any {
    esriConfig.assetsPath = '/assets/';
    this.initializeMap();
  }
}
