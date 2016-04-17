import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['nav navbar-nav navbar-right search-component'],
  classNameBindings: ['isActive:active'],
  layoutName: 'components/search-component',
  isActive: false,
  isFocused: false,
  justFocusedOut: false,
  requestText: '',



  actions: {
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

      
    }
  },

  didInsertElement: function(){
    var style = [
                  {
                    featureType:  'water',
                    elementType:  'geometry',
                    stylers: [  
                      { color: '#92b5d4' }
                    ]
                  },
                    
                  {
                    featureType:  'landscape',
                    elementType: 'geometry.fill',
                    stylers: [
                      { hue: '#f3f5f5' },
                      { saturation: 1 },
                      { lightness: 96 },
                      { visibility: 'on' }
                    ]
                  },
                  {
                    featureType:  'administrative',
                    elementType: 'labels',
                    stylers: [
                      { visibility: 'off' }
                    ]
                  },
                    
                  {
                    featureType:  'administrative',
                    elementType: 'all',
                    stylers: [
                      { color: '#000' }
                    ]
                  },
                  {
                    featureType:  'administrative.country',
                    elementType: 'geometry.fill',
                    stylers: [
                      { color: '#000' }
                    ]
                  },
                  
                  {
                    featureType:  'administrative.land_parcel',
                    elementType: 'geometry.fill',
                    stylers: [
                      { color: '#000' }
                    ]
                  },
                  
                  {
                    featureType:  'administrative.locality',
                    elementType: 'geometry.fill',
                    stylers: [
                      { color: '#000' }
                    ]
                  },
                    
                  {
                    featureType:  'administrative.neighborhood',
                    elementType: 'geometry.fill',
                    stylers: [
                      { color: '#000' }
                    ]
                  },
                    
                  {
                    featureType:  'administrative.province',
                    elementType: 'geometry.fill',
                    stylers: [
                      { color: '#000' }
                    ]
                  },
                  {
                    featureType:  'landscape.natural',
                    elementType: 'all',
                    stylers: [
                      { color: '#f3f5f5' }
                    ]
                  },
                  
                  {
                    featureType:  'landscape.natural.landcover',
                    elementType: 'all',
                    stylers: [
                    { lightness: -15 },
                      { color: '#c7d2b3' }
                    ]
                  },
                  
                  {
                    featureType:  'landscape.natural.terrain',
                    elementType: 'all',
                    stylers: [
                    { lightness: -15 },
                      { color: '#c7d2b3' }
                    ]
                  },
                  {
                    featureType:  'landscape.man_made',
                    elementType: 'geometry.fill',
                    stylers: [
                      { hue: '#dadde5' },
                      { saturation: -80 },
                      { lightness: -12 },
                      { visibility: 'on' }
                    ]
                  },
                  
                  
                  {
                    featureType:  'poi.park',
                    elementType: 'geometry.fill',
                    stylers: [
                      { color: '#c7d2b3' }
                    ]
                  },
                  
                  {
                    featureType:  'road',
                    elementType: 'geometry',
                    stylers: [
                      { color: '#505558' }
                    ]
                  },
                    
                  {
                    featureType: 'road.local',
                    elementType: 'geometry',
                    stylers: [
                      { color: '#adb5b9' },
                      { weight: 0.3 }
                    ]
                  },
                    
                  {
                    featureType: 'road.arterial',
                    elementType: 'geometry',
                    stylers: [
                      { color: '#6c7279' },
                      { weight: 1.0 }
                    ]
                  },
                    
                  {
                    featureType: 'road.highway',
                    elementType: 'geometry',
                    stylers: [
                      { color: '#505558' },
                      { weight: 2.0 }
                    ]
                  },
                  
                  {
                    featureType:  'all',
                    elementType: 'labels',
                    stylers: [
                    
                    ]
                  },
                  
                  {
                    featureType:  'administrative',
                    elementType: 'all',
                    stylers: [
                      { color: '#505558' }
            
                      //{ visibility: 'off'}
                    ]
                  },
                  
                  {
                    featureType:  'poi',
                    elementType: 'all',
                    stylers: [
                      //{ visibility: 'off'}
                        ]
                  },
                    
                  {
                    featureType:  'road',
                    elementType: 'all',
                    stylers: [  
                      { saturation: -0 },
                      { lightness: 0}
                        ]
                  },
                  
                  {
                    featureType:  'transit',
                    elementType: 'all',
                    stylers: [
                      //{ visibility: 'off'}
                    ]
                  }//*/
                ];
            var meratechMapType = new google.maps.StyledMapType(meratechStyles,{name: "Meratech"});
            var point = new google.maps.LatLng(56.281330, 44.080741);
            var point2 = new google.maps.LatLng(56.167568, 44.166394);
            //var pointM1 = new google.maps.LatLng(58.8434976, 2.2365821);
            var center = new google.maps.LatLng(56.245079, 44.100306);
            //var point2 = new google.maps.LatLng(45.525958, -73.595113);
            //var pointM2 = new google.maps.LatLng(58.525958, -73.595113);
            //var center2 = new google.maps.LatLng(47.525958, -73.595113);
            var myMapOptions = {
              zoom: 13,
              center: center,
              mapTypeControl: false,
              scrollwheel: true,
              scaleControl: false,
              panControl: false,
              rotateControl: false,
              streetViewControl: false,
              overviewMapControl: false,
              zoomControlOptions: {
                position:google.maps.ControlPosition.LEFT_TOP,
                style:google.maps.ZoomControlStyle.SMALL
              },
              mapTypeId: google.maps.MapTypeId.TERRAIN
            };

            settings.map = new google.maps.Map(this,myMapOptions);   
            var image = new google.maps.MarkerImage(
              settings.baseUrl+'img/design/mark_blue.png',
              new google.maps.Size(41,45),
              new google.maps.Point(0,0),
              new google.maps.Point(20,45)
            );

            var shadow = new google.maps.MarkerImage(
              settings.baseUrl+'img/design/mark_grey.png',
              new google.maps.Size(41,45),
              new google.maps.Point(0,0),
              new google.maps.Point(13,27)
            );


            settings.marker = new google.maps.Marker({
              draggable: false,
              raiseOnDrag: false,
              icon: image,
              //shape: shape,
              map: settings.map,
              position: point,
              clickable: false
            });
            settings.sklad = new google.maps.Marker({
              draggable: false,
              raiseOnDrag: false,
              icon: shadow,
              //shape: shape,
              map: settings.map,
              position: point2,
              clickable: false
            });
  }

/*
  operationsByTagGroupedByAdress: function() {

    var arr = Ember.A();
    var phoneNumbers = this.get('operationsByTag');
    phoneNumbers.forEach(function(operation) {
      var path = operation.get('path');
      var soughtForElement = arr.findBy('path', path);
      if(soughtForElement){
        soughtForElement.operationList.pushObject(operation);
      }else{
        var operationList = Ember.A();
        operationList.pushObject(operation);
        arr.pushObject({
          path:path,
          operationList: operationList
        });
      }
    });
    return arr.sortBy('path');
  }.property('operationsByTag'),
*/

  // focusOut: function() {
  //   if(!this.get('isFocused')){
  //     if(!this.get('requestText')){
  //       this.set('isActive', false);
  //       // for check if makeSearch not clicked right after focusOut
  //       this.set('justFocusedOut', true);
  //     }
  //   }
  // }.observes('isFocused')
});
