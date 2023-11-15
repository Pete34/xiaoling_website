import { translation } from '../scripts/translation-literal.js'

const englishButton = document.querySelector('[data-button="english"]')

const chineseButton = document.querySelector('[data-button="chinese"]')

const tradChineseButton = document.querySelector('[data-button="zh-Hant"]')


// Function to set buttons
export function setButtons() {
	englishButton.addEventListener('click', () => {
		console.log('english')

		EnglishSelected()
	})

	chineseButton.addEventListener('click', () => {
		console.log('english')

		ChineseSelected()
	})

	tradChineseButton.addEventListener('click', () => {
		console.log('trad chinese')

		TraditionalChineseSelected()
	})
}

// Function to set language in Local Storage
export function setLanguage(language) {
	localStorage.setItem('language', language)
}

// Function to get language from Local Storage
export function getLanguage() {
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
export function DisplayLanguage() {
	setButtons();
	let language = getLanguage()

	// Get all elements with data-lang-key attribute
	const langElem = document.querySelectorAll('[data-lang-key]')

	// Loop through each element and set innerHTML to translation
	langElem.forEach((element) => {
		const keyValue = element.getAttribute('data-lang-key').valueOf()

		// Check if translation exists
		if (translation[keyValue]) {
			// Check if semibold is needed
			const makeBold = checkBold(keyValue, language)

			// Set font weight to semibold
			if (makeBold) {
				console.log('makeBold: ' + makeBold)
				console.log(translation[keyValue][language])

				element.style.fontWeight = '600'

				// Set font weight to normal
			} else if (language == 'zh' || language == 'tradZh') {
				element.style.fontWeight = '400'
			}

			// Set innerHTML to translation
			element.innerHTML = translation[keyValue][language]
			// console.log(translation[keyValue][language]);
		}

		// console.log(keyValue)
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

function checkBold(keyValue, language) {
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

export function EnglishSelected() {
	setLanguage('en')

	DisplayLanguage()
}

export function ChineseSelected() {
	setLanguage('zh')

	DisplayLanguage()
}

export function TraditionalChineseSelected() {
	setLanguage('tradZh')

	DisplayLanguage()
}
