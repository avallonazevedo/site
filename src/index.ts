import './styles/app.scss';

// Constants
const tokenName = '@avallon:dev:theme';
const dark = 'dark';
const light = 'light';

const createPrefix = (type: string) => `${type}-theme`;

const darkTheme = createPrefix(dark);
const lightTheme = createPrefix(light);

const runApplication = (): void => {
  const theme = localStorage.getItem(tokenName);
  // eslint-disable-next-line prettier/prettier
  const themeSwitcher = document.querySelector('.theme-color-switcher input') as HTMLInputElement;
  const main = document.querySelector('main') as HTMLDivElement;

  if (theme) {
    main.classList.add(createPrefix(theme));
    themeSwitcher.checked = theme === dark;
  }

  themeSwitcher.addEventListener('change', () => {
    const isChecked = themeSwitcher.checked;
    const storage = isChecked ? dark : light;
    localStorage.setItem(tokenName, storage);
    if (isChecked) {
      main.classList.remove(lightTheme);
      main.classList.add(darkTheme);
      return;
    }
    main.classList.remove(darkTheme);
    main.classList.add(lightTheme);
  });
};

document.addEventListener('DOMContentLoaded', runApplication);
