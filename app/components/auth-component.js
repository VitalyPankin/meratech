/* eslint-disable ember/no-jquery */
import Component from '@ember/component';
import { inject as service } from '@ember/service';
import $ from 'jquery';
import layout from '../templates/components/auth-component';

import { translationMacro as t } from 'ember-i18n';

export default Component.extend({
  session: service('session'),
  classNames: [''],
  // layoutName: 'components/auth-component',
  layout,
  errorMessage: null,
  placeholderLogin: t('common.input_login'),
  placeholderPassword: t('common.input_password'),

  // actions: {
  //   authenticate() {
  //     let { identification, password } = this.getProperties('identification', 'password');
  //     this.get('session').authenticate('authenticator:api-meratech', identification, password).catch((reason) => {
  //       this.set('errorMessage', reason.error || reason);
  //     });
  //   }
  // }

  actions: {
    resetError: function() {
      this.set('errorMessage', null);
    },
    authenticate() {
      let { identification, password } = this.getProperties('identification', 'password');
      try {
        this.get('session')
          .authenticate('authenticator:api-meratech', identification, password)
          .then(
            () => {
              $('#myModal').modal('hide');
            },
            reason => {
              this.set('errorMessage', reason.error_description || reason);
            },
          )
          .catch(reason => {
            this.set('errorMessage', reason.error_description || reason);
          });
        throw 'myException'; // generates an exception
        // eslint-disable-next-line no-empty
      } catch (e) {}
    },
    invalidateSession: function() {
      this.get('session').invalidate();
    },
  },
});
