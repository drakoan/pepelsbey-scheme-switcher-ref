const PCS = 'prefers-color-scheme';
const getSystemScheme = () => matchMedia(`(${PCS}: dark)`).matches ? 'dark' : 'light';

const getSavedScheme = () => localStorage.getItem('color-scheme');
const clearScheme = () => localStorage.removeItem('color-scheme');
const saveScheme = scheme => localStorage.setItem('color-scheme', scheme);
const updateStorage = scheme => scheme === 'auto' ? clearScheme() : saveScheme(scheme);

const keepRadioButtonChecked = (radioName, value) =>
  document.querySelector(`${radioName}[value=${value}]`).checked = true;

const getColorSchemeStylesheet = scheme => document.querySelectorAll(
  `link[rel=stylesheet][media*=${PCS}][media*=${scheme}]`);

const getNewMedia = (scheme, color) => scheme === 'auto' ? `(${PCS}: ${color})` :
  scheme === color ? 'all' : 'not all';

const switchMedia = scheme => {
  ['ligth', 'dark'].forEach(color => {
    const colorStyles = getColorSchemeStylesheet(color);
    const newMedia = getNewMedia(scheme, color);
    [...colorStyles].forEach(link => link.media = newMedia);
  });
};

const initSwitcherListeners = (switcherRadios, callbackFn) => {
  [...switcherRadios].forEach((radio) => {
    radio.addEventListener('change', event => callbackFn(event.target.value));
  });
};

function runShemeSwitcher() {
  const SWITCHER_RADIO_CLASS = '.switcher__radio';
  const systemScheme = getSystemScheme();
  const savedScheme = getSavedScheme();
  
  const setScheme = scheme => {
    switchMedia(scheme);
    updateStorage(scheme);
  };

  const needSetSheme = (systemScheme !== null && savedScheme !== systemScheme) ? true : false;
  if (needSetSheme) setScheme(savedScheme);
  
  const needInitSwitcher = savedScheme !== null ? true : false;
  if (needInitSwitcher) keepRadioButtonChecked(SWITCHER_RADIO_CLASS, savedScheme);
  
  const switcherRadios = document.querySelectorAll(SWITCHER_RADIO_CLASS);
  initSwitcherListeners(switcherRadios, setScheme);
}

runShemeSwitcher();