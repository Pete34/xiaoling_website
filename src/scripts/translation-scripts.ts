import { translation } from '../scripts/translation-literal.js'

 

// Get buttons
const { englishButton, chineseButton, tradChineseButton } = AddListeners();

export function AddListeners() {
    const englishButton = document.querySelector('[data-button="english"]')

    const chineseButton = document.querySelector('[data-button="chinese"]')

    const tradChineseButton = document.querySelector('[data-button="zh-Hant"]')

    // Function to set buttons to active
    englishButton.addEventListener('click', () => {
        EnglishSelected()
    })

    chineseButton.addEventListener('click', () => {
        ChineseSelected()
    })

    tradChineseButton.addEventListener('click', () => {
        TraditionalChineseSelected()
    })
    return { englishButton, chineseButton, tradChineseButton }
}

// Function to set language in Local Storage
function setLanguage(language: string) {
    localStorage.setItem('language', language)
}

// Function to get language from Local Storage
function getLanguage() {
    const lang = localStorage.getItem('language') || 'en' // Default to English if not
    if (lang == 'en') {
        changeEnglishButton()
    }

    if (lang == 'zh') {
        changeChineseButton()
    }

    if (lang == 'tradZh') {
        changeTradButton()
    }

    return lang
}
// Function to display language
function DisplayLanguage() {
    let language = getLanguage()

    // Get all elements with data-lang-key attribute
    const langElem = document.querySelectorAll<HTMLElement>('[data-lang-key]')

    // Loop through each element and set innerHTML to translation
    langElem.forEach((element) => {
        const keyValue = element.getAttribute('data-lang-key').valueOf()

        // Check if translation exists
        if (translation[keyValue]) {
            // Check if semibold is needed
            const makeBold = checkBold(keyValue, language)

            // Set font weight to semibold
            if (makeBold) {
                element.style.fontWeight = '600'

                // Set font weight to normal
            } else if (language == 'zh' || language == 'tradZh') {
                element.style.fontWeight = '400'
            }

            // Set innerHTML to translation
            element.innerHTML = translation[keyValue][language]
        }
    })
}

function changeEnglishButton() {
    englishButton.classList.add('active')
    chineseButton.classList.remove('active')
    tradChineseButton.classList.remove('active')
}

function changeChineseButton() {
    englishButton.classList.remove('active')
    chineseButton.classList.add('active')
    tradChineseButton.classList.remove('active')
}

function changeTradButton() {
    englishButton.classList.remove('active')
    chineseButton.classList.remove('active')
    tradChineseButton.classList.add('active')
}

function EnglishSelected() {
    setLanguage('en')
    DisplayLanguage()
}
function ChineseSelected() {
    setLanguage('zh')
    DisplayLanguage()
}

function TraditionalChineseSelected() {
    setLanguage('tradZh')
    DisplayLanguage()
}

function checkBold(keyValue: string, language: string) {
    const bold = keyValue.includes('h1')

    const menu = keyValue.includes('menu')

    const phone = keyValue.includes('phone')

    const email = keyValue.includes('email')

    const name = keyValue.includes('name')

    const hype = keyValue.includes('hype')

    // Check if semi-bold is needed
    const semi = bold || menu || phone || email || name || hype

    const makeBold = semi && language == 'en'
    return makeBold
}

DisplayLanguage();

 document.addEventListener(
    'astro:after-swap',
    () => {
        // This only runs once.
        console.log('after-swap event fired')
        DisplayLanguage()
        
    },
    { once: false }
)

 

 