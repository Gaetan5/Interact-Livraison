import { useI18n } from '../state/I18nContext.jsx';

export default function LangSwitch() {
  const { lang, setLang } = useI18n();
  return (
    <div className="lang-switch">
      <button type="button" className={`lang-btn ${lang==='fr'?'is-active':''}`} onClick={()=>setLang('fr')} aria-label="Français" aria-pressed={lang==='fr'}>FR</button>
      <button type="button" className={`lang-btn ${lang==='en'?'is-active':''}`} onClick={()=>setLang('en')} aria-label="English" aria-pressed={lang==='en'}>EN</button>
    </div>
  );
}
