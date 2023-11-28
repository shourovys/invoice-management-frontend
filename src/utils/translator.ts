import Cookies from 'js-cookie'
// import de from '../lang/de.json'
// import en from '../lang/en.json'
// import es from '../lang/es.json'
// import fr from '../lang/fr.json'
// // import generic from '../lang/generic.json'
// import ko from '../lang/ko.json'
// import zh from '../lang/zh.json'
import { Language } from '../types/pages/login'
// import { firebase_write } from './firebase'

const lang = ((): Language => {
  let l = Cookies.get('lang') || 'generic'

  if (['generic', 'en', 'fr', 'de', 'es', 'ko', 'zh'].includes(l)) {
    return l as Language
  } else {
    return 'generic'
  }
})()

// const multi_lang: { [k: string]: string } = (() =>
//   (
//     ({
//       // generic,
//       en,
//       fr,
//       de,
//       es,
//       ko,
//       zh,
//     }) as { [key: string]: { [key: string]: string } }
//   )[lang])()

const multi_lang: { [k: string]: string } = await (async () => {
  if (lang === 'generic') {
    return {}
  }
  try {
    const res = await fetch(`/lang/${lang}.json`)
    return await res.json()
  } catch (e) {
    console.log(e)
    return {}
  }
})()

const t = (text: string | TemplateStringsArray, ...args: any[]): string => {
  if (typeof text !== 'string') {
    // join the text and args
    text = text.reduce((prev, curr, i) => {
      return prev + curr + (args[i] || '')
    })
  }

  // firebase_write(text).then(() => {
  // })

  if (lang === 'generic' || text === '' || text === ' ') return text
  const translated = multi_lang[text]
  if (translated !== undefined) return translated
  else return text
}

export default t
