function saveLanguageInStorage(language) {
    localStorage.setItem('language', language);
}

function getLanguageInStorage() {
    return localStorage.getItem('language');
}

function removeLanguageInStorage() {
    localStorage.removeItem('language');
}

function getDefaultLanguage() {
    const userLanguage = navigator.language || navigator.userLanguage;
    saveLanguageInStorage(userLanguage);
    return userLanguage.split('-')[0];
}

function loadResources(language) {
    return $.ajax({
        url: `/locales/${language}.json`,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            return data;
        },
        error: function (err) {
            console.error('Error loading resources:', err);
            return {};
        }
    });
}

i18next.init({
    lng: getLanguageInStorage() || getDefaultLanguage() || 'hy',
    resources: {}
}, function (err, t) {
    if (err) {
        console.error("Error during i18next initialization", err);
        return;
    }

    loadResources(i18next.language).then(function (resources) {
        if (resources && resources.translation) {
            i18next.addResourceBundle(i18next.language, 'translation', resources.translation, true, true);
            updateContent();
        } else {
            console.error('Error: translation data is missing or malformed.');
        }
    });
});

function updateContent() {
    $('[data-i18n]').each(function () {
        const key = $(this).attr('data-i18n');
        $(this).text(i18next.t(key));
    });
}

function changeLanguage(language) {
    i18next.changeLanguage(language, function (err, t) {
        if (err) {
            console.error("Error changing language:", err);
            return;
        }
        saveLanguageInStorage(language);
        loadResources(language).then(function (resources) {
            if (resources && resources.translation) {
                i18next.addResourceBundle(language, 'translation', resources.translation, true, true);
                updateContent();
            } else {
                console.error('Error: translation data is missing or malformed.');
            }
        });
    });
}
