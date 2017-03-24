import Ember from 'ember';
import ENV from '../config/environment';
import OAuth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant';
const { RSVP, isEmpty, run, } = Ember;
const assign = Ember.assign || Ember.merge;

export default OAuth2PasswordGrant.extend({
  serverTokenRevocationEndpoint: ENV.wordpressHost,
  serverTokenEndpoint: ENV.wordpressHost,

  authenticate(identification, password, scope = []) {
    return new RSVP.Promise((resolve, reject) => {
      const data                = { 'grant_type': 'password', username: identification, password: password, oauth: 'token',
                    client_id: 'sW0IdbxXSi7NN2sxEHK0ctrWio8jQd',
                    client_secret: '7j971mjzkcSr0Fusd99Y9msAjKYr4P'};
      const serverTokenEndpoint = this.get('serverTokenEndpoint');
      const scopesString = Ember.makeArray(scope).join(' ');
      if (!Ember.isEmpty(scopesString)) {
        data.scope = scopesString;
      }
      this.makeRequest(serverTokenEndpoint, data).then((response) => {
        run(() => {
          const expiresAt = this._absolutizeExpirationTime(response['expires_in']);
          this._scheduleAccessTokenRefresh(response['expires_in'], expiresAt, response['refresh_token']);
          if (!isEmpty(expiresAt)) {
            response = assign(response, { 'expires_at': expiresAt });
          }
          resolve(response);
        });
      }, (xhr) => {
        run(null, reject, xhr.responseJSON || xhr.responseText);
      });
    });
  }
    // restore: function(data) {
    //     return new Ember.RSVP.Promise(function(resolve, reject) {
    //         if (!Ember.isEmpty(data.token)) {
    //             resolve(data);
    //         } else {
    //             reject();
    //         }
    //     });
    // },

    // authenticate: function(options) {
    //     return new Ember.RSVP.Promise((resolve, reject) => {
    //         Ember.$.ajax({
    //             url: this.serverTokenEndpoint,
    //             type: 'POST',
    //             data: JSON.stringify({
    //                 oauth: 'token',
    //                 client_id: 'sW0IdbxXSi7NN2sxEHK0ctrWio8jQd',
    //                 client_secret: '7j971mjzkcSr0Fusd99Y9msAjKYr4P',
    //                 username: options.identification,
    //                 password: options.password
    //             }),
    //             contentType: 'application/json;charset=utf-8',
    //             dataType: 'json'
    //         }).then(function(response) {
    //             Ember.run(function() {
    //                 debugger;
    //                 resolve({
    //                     token: response.id_token
    //                 });
    //             });
    //         }, function(xhr, status, error) {
    //             var response = xhr.responseText;
    //                 debugger;
    //             Ember.run(function() {
    //                 reject(response);
    //             });
    //         });
    //     });
    // },

    // invalidate: function() {
    //     console.log('invalidate...');
    //     return Ember.RSVP.resolve();
    // }

});
