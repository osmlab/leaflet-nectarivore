import * as services from 'services';

if (window && window.L) {
  window.L.Nectarivore = { ...services };
}

export default { ...services };
