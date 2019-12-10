/* eslint-disable ember/avoid-leaking-state-in-ember-objects */
import Component from '@ember/component';
import { MAP_TYPES } from '../components/google-map';
import layout from '../templates/components/map-component';

export default Component.extend({
  classNames: ['google-map'],
  classNameBindings: [''],
  // layoutName: 'components/map-component',
  layout,

  actions: {
    showOffice: function() {
      this.set('lat', 56.167568);
      this.set('lng', 44.166394);
    },
    showStorage: function() {
      this.set('lat', 56.28133);
      this.set('lng', 44.080741);
    },
    /*
    makeSearch: function(e){
      $('#map').data('SmartContacts').settings.marker.setIcon($('#map').data('SmartContacts').settings.baseUrl+'img/design/mark_grey.png');
                $('#map').data('SmartContacts').settings.sklad.setIcon($('#map').data('SmartContacts').settings.baseUrl+'img/design/mark_blue.png');
                $('#map').data('SmartContacts').settings.map.panTo(new google.maps.LatLng(56.167568, 44.166394));
                //$('#map').data('SmartContacts').settings.sklad.setIcon(settings.baseUrl+'img/design/mark_blue.png');
              }else{
                //alert($('#map').data('SmartContacts').settings.marker);
                $('#map').data('SmartContacts').settings.marker.setIcon($('#map').data('SmartContacts').settings.baseUrl+'img/design/mark_blue.png');
                $('#map').data('SmartContacts').settings.sklad.setIcon($('#map').data('SmartContacts').settings.baseUrl+'img/design/mark_grey.png');
                if(!first_call) $('#map').data('SmartContacts').settings.map.panTo(new google.maps.LatLng(56.281330, 44.080741));
                first_call = 0;

      
    }*/
  },

  didInsertElement: function() {},

  lat: 56.245079,
  lng: 44.100306,
  zoom: 12,
  center: {},
  mapTypes: MAP_TYPES,
  styles: [
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#92b5d4' }],
    },

    {
      featureType: 'landscape',
      elementType: 'geometry.fill',
      stylers: [{ hue: '#f3f5f5' }, { saturation: 1 }, { lightness: 96 }, { visibility: 'on' }],
    },
    {
      featureType: 'administrative',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },

    {
      featureType: 'administrative',
      elementType: 'all',
      stylers: [{ color: '#000' }],
    },
    {
      featureType: 'administrative.country',
      elementType: 'geometry.fill',
      stylers: [{ color: '#000' }],
    },

    {
      featureType: 'administrative.land_parcel',
      elementType: 'geometry.fill',
      stylers: [{ color: '#000' }],
    },

    {
      featureType: 'administrative.locality',
      elementType: 'geometry.fill',
      stylers: [{ color: '#000' }],
    },

    {
      featureType: 'administrative.neighborhood',
      elementType: 'geometry.fill',
      stylers: [{ color: '#000' }],
    },

    {
      featureType: 'administrative.province',
      elementType: 'geometry.fill',
      stylers: [{ color: '#000' }],
    },
    {
      featureType: 'landscape.natural',
      elementType: 'all',
      stylers: [{ color: '#f3f5f5' }],
    },

    {
      featureType: 'landscape.natural.landcover',
      elementType: 'all',
      stylers: [{ lightness: -15 }, { color: '#c7d2b3' }],
    },

    {
      featureType: 'landscape.natural.terrain',
      elementType: 'all',
      stylers: [{ lightness: -15 }, { color: '#c7d2b3' }],
    },
    {
      featureType: 'landscape.man_made',
      elementType: 'geometry.fill',
      stylers: [{ hue: '#dadde5' }, { saturation: -80 }, { lightness: -12 }, { visibility: 'on' }],
    },

    {
      featureType: 'poi.park',
      elementType: 'geometry.fill',
      stylers: [{ color: '#c7d2b3' }],
    },

    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ color: '#505558' }],
    },

    {
      featureType: 'road.local',
      elementType: 'geometry',
      stylers: [{ color: '#adb5b9' }, { weight: 0.3 }],
    },

    {
      featureType: 'road.arterial',
      elementType: 'geometry',
      stylers: [{ color: '#6c7279' }, { weight: 1.0 }],
    },

    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{ color: '#505558' }, { weight: 2.0 }],
    },

    {
      featureType: 'all',
      elementType: 'labels',
      stylers: [],
    },

    {
      featureType: 'administrative',
      elementType: 'all',
      stylers: [
        { color: '#505558' },

        //{ visibility: 'off'}
      ],
    },

    {
      featureType: 'poi',
      elementType: 'all',
      stylers: [
        //{ visibility: 'off'}
      ],
    },

    {
      featureType: 'road',
      elementType: 'all',
      stylers: [{ saturation: -0 }, { lightness: 0 }],
    },

    {
      featureType: 'transit',
      elementType: 'all',
      stylers: [
        //{ visibility: 'off'}
      ],
    }, //*/
  ],
  markers: [
    {
      lat: '56.281330',
      lng: '44.080741',
      isClickable: false,
      isDraggable: false,

      title: 'Офис',
      icon: {
        url: '/assets/images/mark_red.png',
        size: null,
        origin: null,
        anchor: null,
        scaledSize: new google.maps.Size(45, 50),
      },
      click: function() {
        alert(1);
      },
    },
    {
      lat: '56.167568',
      lng: '44.166394',
      isClickable: false,
      isDraggable: false,
      title: 'Склад',
      icon: {
        url: '/assets/images/mark_red.png',
        size: null,
        origin: null,
        anchor: null,
        scaledSize: new google.maps.Size(45, 50),
      },
    },
  ],
});
