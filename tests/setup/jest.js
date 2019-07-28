import $ from 'jquery';
import lodash from 'lodash';

// mock 'uid' to generate duplicate ids
jest.mock('uid', () => jest.fn(() => 1));

// setup jquery
window.$ = $;
window.jQuery = $;

// setup lodash
window._ = lodash;

// setup froala editor
window.$.fn.froalaEditor = () => {};
