import $ from './vendor/jquery.min.js';
window.$ = $;

import axios from 'axios';
window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
