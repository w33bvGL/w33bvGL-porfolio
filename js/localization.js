function saveLanguageInStorage(language) {
    localStorage.setItem('language', language);
}

// function removeLanguageInStorage(language) {
//     localStorage.removeItem('language');
// }

function getDefaultLanguage() {
    const userLanguage = navigator.language || navigator.userLanguage;
    saveLanguageInStorage(userLanguage);
    return userLanguage.split('-')[0];
}

i18next.init({
    lng: localStorage.getItem('language') || getDefaultLanguage() || 'en',
    resources: {
        en: {
            translation: {
                "title": "Welcome to my website",
                "description": "This is an example of localization"
            }
        },
        ru: {
            translation: {
                "title": "Добро пожаловать на мой сайт",
                "description": "Это пример локализации"
            }
        }
    }
}, function (err, t) {
    if (err) {
        console.error("Error during i18next initialization", err);
        return;
    }

    updateContent();
});

function updateContent() {
    document.querySelectorAll('[data-i18n]').forEach((element) => {
        const key = element.getAttribute('data-i18n');
        element.textContent = i18next.t(key); // Переводим ключ
    });
}

function changeLanguage(language) {
    i18next.changeLanguage(language, (err, t) => {
        if (err) return console.error("Error changing language:", err);
        saveLanguageInStorage(language);
        updateContent();
    });
}
