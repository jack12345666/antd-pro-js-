import RenderAuthorize from '@/components/Authorized';
import {getToken} from './authority';
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable import/no-mutable-exports */
let Authorized = RenderAuthorize(getToken());

// Reload the rights component
const reloadAuthorized = () => {
  Authorized = RenderAuthorize(getToken());
};

/** Hard code block need it。 */
window.reloadAuthorized = reloadAuthorized;

export {reloadAuthorized};
export default Authorized;
