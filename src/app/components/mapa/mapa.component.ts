import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { Lugar } from '../../interfaces/interfaces';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  mapa: mapboxgl.Map;
  lugares: Lugar[] = [{
    id: '1',
    nombre: 'Jose',
    lng: -75.75512993582937,
    lat: 45.349977429009954,
    color: '#dd8fee'
  },
  {
    id: '2',
    nombre: 'Hulio',
    lng: -75.75195645527508, 
    lat: 45.351584045823756,
    color: '#790af0'
  },
  {
    id: '3',
    nombre: 'Ana',
    lng: -75.75900589557777, 
    lat: 45.34794635758547,
    color: '#19884b'
  }];

  constructor() { }

  ngOnInit(): void {
    this.crearMapa();
  }

  crearMapa() {
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoiaWxsYW41IiwiYSI6ImNrYW4xYWN5dTE1b3gyeW82MXpzaDA5NW8ifQ.cr7S55BP2y7fjcFc1XuwLA';

    this.mapa = new mapboxgl.Map({
      container: 'mapa',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-75.75512993582937, 45.349977429009954],
      zoom: 15.8
    });

    for (const marcador of this.lugares ){
      this.agregarMarcador( marcador );
    }
  }

  agregarMarcador( marcador: Lugar ) {

    const html = `<h2>${ marcador.nombre }</h2>
                  <br>
                  <button>Borrar</button>`;
    
    const customPopup = new mapboxgl.Popup({
      offset: 25,
      closeOnClick: false
    }).setHTML( html );

    const marker = new mapboxgl.Marker({
      draggable: true,
      color: marcador.color
    })
      .setLngLat([marcador.lng, marcador.lat])
      .setPopup( customPopup )
      .addTo( this.mapa );

    marker.on('drag', () => {
      const lngLat = marker.getLngLat();
      console.log(lngLat);

      //TODO: Crear evento al mover el marcador

    })
  }

  crearMarcador() {
    const customMarker: Lugar = {
      id: new Date().toISOString(),
      lng: -75.75512993582937,
      lat: 45.349977429009954,
      nombre: 'Sin nombre',
      color: '#' + Math.floor(Math.random()*16777215).toString(16) 
    }

    this.agregarMarcador( customMarker );
  }

}
