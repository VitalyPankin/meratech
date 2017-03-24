import Ember from 'ember';
import { translationMacro as t } from "ember-i18n";

export default Ember.Component.extend({  
  layoutName: 'components/date-picker',
  from: null,
  to: null,
  direction: null,
  selectedYear: null,
  selectedMonth: null,
  selected: null,
  months: ['january','february','march','april','may','june','july','august','september','october','november','december'],
  displayMonths: function(){
    let months = this.get('dateObject').find((item) => {
      if(item.year===this.get('selectedYear')) {
        return true;
      }
    });
    if(this.get('direction')==='to'){
      this.set('selectedMonth', months.months[months.months.length-1]);
    }else{
      this.set('selectedMonth', months.months[0]);
    }
    return months.months;
  }.property('selectedYear'),
  displaySelectedMonths: function(){
    return this.get('i18n').t("common.months."+this.get('selectedMonth').toString().toLowerCase()).toString().substr(0,3);
  }.property('selectedMonth', 'i18n.locale'),
  dateObject: function(){
    let result = [],
        direction = this.get('direction'),
        from = this.get('from'),
        to = this.get('to'),
        yearsDiff = Math.floor(to.year()-from.year())+1,
        monthsDiff = Math.floor(to.diff(from, 'months', true))+1;
        console.log('yearsDiff:'+yearsDiff+' monthsDiff:'+monthsDiff);
    if(yearsDiff){
      for (var i = 0; i < yearsDiff; i++) {
        let months = [];
        if(from.year()===from.year()+i) {
          //first year
          if(yearsDiff===1){
            for (var j = from.month(); j < from.month()+monthsDiff-1; j++) {
              months.push(this.get('months')[j]);
            }
          }else{
            for (var j = from.month(); j < 12; j++) {
              months.push(this.get('months')[j]);
            }
          }
        }else if(to.year()===from.year()+i){
          for (var j = 0; j < to.month()+1; j++) {
            months.push(this.get('months')[j]);
          }
        }else{
          months = this.get('months');
        }  
        result.push({
          year: from.year()+i,
          months: months
        });
      } 
    }else{
      let months = [];
      for (var i = 0; i < monthsDiff; i++) {
        months.push(this.get('months')[from.month()+i]);
      } 
      result.push({
        year: from.year(),
        months: months
      });
    }
    return result;
  }.property('from','to'),
  updateSelected: function(){
    if(this.get('direction')==='to'){
      this.set('selected', moment('01 '+this.get('selectedMonth')+' '+this.get('selectedYear')+' 23:59:59', 'DD MMMM YYYY HH:mm:ss').endOf('month'));
    }else{
      this.set('selected', moment('01 '+this.get('selectedMonth')+' '+this.get('selectedYear')+' 00:00:01', 'DD MMMM YYYY HH:mm:ss'));
    }
  }.observes('selectedMonth'),

  init() {
    this._super(...arguments);
    if(this.get('direction')==='to'){
      this.set('selectedYear', this.get('to').year());
      this.set('selectedMonth', this.get('months')[this.get('to').month()]);
    }else{
      this.set('selectedYear', this.get('from').year());
      this.set('selectedMonth', this.get('months')[this.get('from').month()]); 
    }
  },

  actions: {
    setYear: function(value){
      this.set('selectedYear', value);
    },
    setMonth: function(value){
      this.set('selectedMonth', value);
    }
  },

  didInsertElement: function(){
  }
});