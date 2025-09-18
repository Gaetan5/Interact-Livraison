import { useI18n } from '../state/I18nContext.jsx';

export default function LangSwitch() {
  const { lang, setLang } = useI18n();
  return (
    <div className="lang-switch">
      <button className={`lang-btn ${lang==='fr'?'is-active':''}`} onClick={()=>setLang('fr')} aria-label="Français">FR</button>
      <button className={`lang-btn ${lang==='en'?'is-active':''}`} onClick={()=>setLang('en')} aria-label="English">EN</button>
    </div>
  );
}
