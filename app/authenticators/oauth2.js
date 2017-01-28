import OAuth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant';

export default OAuth2PasswordGrant.extend({
  serverTokenRevocationEndpoint: '/revoke',
  serverTokenEndpoint: 'http://api.meratech.ru/oauth1/request',
});
