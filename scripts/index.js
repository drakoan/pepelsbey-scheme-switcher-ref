const PCS = 'prefers-color-scheme';
const getSystemScheme = () => matchMedia(`(${PCS}: dark)`).matches ? 'dark' : 'light';

const getSavedScheme = () => localStorage.getItem('color-scheme');
const clearScheme = () => localStorage.removeItem('color-scheme');
const saveScheme = scheme => localStorage.setItem('color-scheme', scheme);
const updateStorage = scheme => scheme === 'auto' ? clearScheme() : saveScheme(scheme);

const keepRadioButtonChecked = (radioName, value) =>
  document.querySelector(`${radioName}[value=${value}]`).checked = true;

const COLOR_SCHEME_CLASS = 'stylesheet__color__scheme--';
const getColorSchemeStylesheet = scheme => document.querySelectorAll(COLOR_SCHEME_CLASS+scheme);

const getNewMedia = (scheme, color) => scheme === 'auto' ? `(${PCS}: ${color})` :
  scheme === color ? 'all' : 'not all';

const switchMedia = newScheme => {
  ['light', 'dark'].forEach(colorScheme => {
    const colorStyles = getColorSchemeStylesheet(colorScheme);
    const newMedia = getNewMedia(newScheme, colorScheme);
    console.log('For '+colorScheme+': nodes='  + colorStyles + '; media='+newMedia);
    [...colorStyles].forEach(link => link.media = newMedia);
  });
};

const initSwitcherListeners = (switcherRadios, callbackFn) => {
  [...switcherRadios].forEach((radio) => {
    radio.addEventListener('change', event => callbackFn(event.target.value));
  });
};

function runSchemeSwitcher() {
  const SWITCHER_RADIO_CLASS = '.switcher__radio';
  const systemScheme = getSystemScheme();
  const savedScheme = getSavedScheme();
  
  const setScheme = scheme => {
    switchMedia(scheme);
    updateStorage(scheme);
  };

  const needSetScheme = (systemScheme !== null && savedScheme !== systemScheme) ? true : false;
  if (needSetScheme) setScheme(savedScheme);
  
  const needInitSwitcher = savedScheme !== null ? true : false;
  if (needInitSwitcher) keepRadioButtonChecked(SWITCHER_RADIO_CLASS, savedScheme);
  
  const switcherRadios = document.querySelectorAll(SWITCHER_RADIO_CLASS);
  initSwitcherListeners(switcherRadios, setScheme);
}

runSchemeSwitcher();