import OAuth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant';
import { computed } from '@ember/object';
import ENV from '../config/environment';

export default OAuth2PasswordGrant.extend({
  serverTokenRevocationEndpoint: '/revoke',
  serverTokenEndpoint: computed(ENV.wordpressHost + 'oauth1/request'),
});
