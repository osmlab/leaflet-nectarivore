if (typeof fetch !== 'undefined') {
  require('abortcontroller-polyfill/dist/polyfill-patch-fetch');
}

import * as services from 'services';

if (window && window.L) {
  window.L.Nectarivore = { ...services };
}

export default { ...services };
