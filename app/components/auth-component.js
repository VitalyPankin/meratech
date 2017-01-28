import Ember from 'ember';
import { translationMacro as t } from "ember-i18n";

export default Ember.Component.extend({
  classNames: [''],
  layoutName: 'components/auth-component',
  session: Ember.inject.service('session'),
  errorMessage: null,
  placeholderLogin: t("common.input_login"),
  placeholderPassword: t("common.input_password"),

  // actions: {
  //   authenticate() {
  //     let { identification, password } = this.getProperties('identification', 'password');
  //     this.get('session').authenticate('authenticator:api-meratech', identification, password).catch((reason) => {
  //       this.set('errorMessage', reason.error || reason);
  //     });
  //   }
  // }
  
  actions: {
    resetError: function(){
      this.set('errorMessage', null);
    },
    authenticate() {
      let { identification, password } = this.getProperties('identification', 'password');
      try {
        this.get('session').authenticate('authenticator:api-meratech', identification, password).then(() => {
          Ember.$('#myModal').modal('hide');
        }, (reason) => {
          this.set('errorMessage', reason.error_description || reason);
        }).catch((reason) => {
          this.set('errorMessage', reason.error_description || reason);
        });
       throw "myException"; // generates an exception
      }
      catch (e) {
      }
    },
    invalidateSession: function() {
        this.get('session').invalidate();
    }
  }
});