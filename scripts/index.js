const PCS = 'prefers-color-scheme';
const getSystemScheme = () => matchMedia(`(${PCS}: dark)`).matches ? 'dark' : 'light';

const getSavedScheme = () => localStorage.getItem('color-scheme');
const clearScheme = () => localStorage.removeItem('color-scheme');
const saveScheme = scheme => localStorage.setItem('color-scheme', scheme);
const updateStorage = scheme => scheme === 'auto' ? clearScheme() : saveScheme(scheme);

const keepRadioButtonChecked = (radioName, value) =>
  document.querySelector(`${radioName}[value=${value}]`).checked = true;

const COLOR_SCHEME_CLASS_PREFIX = 'stylesheet__color__scheme--'
const getColorSchemeStylesheet = scheme =>
  document.getElementsByClassName(COLOR_SCHEME_CLASS_PREFIX+scheme);

const getNewMedia = (scheme, color) => scheme === 'auto' ? `(${PCS}: ${color})` :
  scheme === color ? 'all' : 'not all';

const switchMedia = newScheme => {
  ['light', 'dark'].forEach(colorScheme => {
    const colorStyles = getColorSchemeStylesheet(colorScheme);
    const newMedia = getNewMedia(newScheme, colorScheme);
    [...colorStyles].forEach(link => link.media = newMedia);
  });
};

const initSwitcherListeners = (switcherRadios, callbackFn) => {
  const switcherRadios = document.querySelectorAll(SWITCHER_RADIO_CLASS);
  [...switcherRadios].forEach((radio) => {
    radio.addEventListener('change', event => callbackFn(event.target.value));
  });
};

function runSchemeSwitcher() {
  const SWITCHER_RADIO_CLASS = '.switcher__radio';
  const initSwitcher = keepRadioButtonChecked;
  const systemScheme = getSystemScheme();
  const savedScheme = getSavedScheme();

  const setScheme = scheme => {
    switchMedia(scheme);
    updateStorage(scheme);
  };

  const haveSave = savedScheme !== null ? true : false;
  const needSetScheme = (haveSave && savedScheme !== systemScheme) ? true : false;
  
  if (needSetScheme) setScheme(savedScheme);
  if (haveSave) initSwitcher(SWITCHER_RADIO_CLASS, savedScheme);
  initSwitcherListeners(SWITCHER_RADIO_CLASS, setScheme);
}

runSchemeSwitcher();