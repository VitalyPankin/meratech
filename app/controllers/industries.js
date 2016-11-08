import Ember from 'ember';

export default Ember.Controller.extend({
  industries: Ember.A([
    {
      name: 'brewery',
      title: 'Brewery industry'
    },
    {
      name: 'milk',
      title: 'Milk industry'
    },
    {
      name: 'cows',
      title: 'Cow farms'
    },
    {
      name: 'pigs',
      title: 'Pig farms'
    },
    {
      name: 'poultry',
      title: 'Polutry and chicken farms'
    },
    {
      name: 'meat',
      title: 'Meat processing'
    },
    {
      name: 'laundry',
      title: 'Professional laundries'
    }
    ]),
  currentIndustry: null,
  currentIndustryTitle: function(){
    switch(this.get('currentIndustry')){
      case 'poultry': {
        return  "Chicken farm & poultry";
      }
      case 'brewery': {
        return  "Brewery industry";
      }
      case 'laundry': {
        return  "Professional laundries";
      }
      case 'milk': {
        return  "Milk industry";
      }
      case 'cows': {
        return  "Cow farms";
      }
      case 'pigs': {
        return  "Brewery industry";
      }
      case 'chicken': {
        return  "Chicken farms";
      }
      case 'meat': {
        return  "Meat processing";
      }
    }
  }.observes('currentIndustry')
});
