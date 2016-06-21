import Radium from 'radium';
import isMobile from 'ismobilejs';


export default function ConfiguredRadium(component) {
  if (isMobile.any) {
    // Removed Radium.Plugins.resolveInteractionStyles (:hover, :active)
    /* istanbul ignore next */
    return Radium({
      plugins: [
        Radium.Plugins.mergeStyleArray,
        Radium.Plugins.resolveMediaQueries,
        Radium.Plugins.keyframes,
        Radium.Plugins.visited,
        Radium.Plugins.prefix,
        Radium.Plugins.checkProps
      ]
    })(component);
  }
  return Radium()(component);
}
