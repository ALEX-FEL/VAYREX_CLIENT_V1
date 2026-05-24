import { useLanguage } from '@/hooks/use-language';

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 px-2 py-1.5 rounded-xl bg-[#141B3D] border border-white/5">
      <button
        onClick={() => setLanguage('fr')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all text-xs font-semibold ${
          language === 'fr'
            ? 'bg-gradient-primary text-white shadow-glow'
            : 'text-[#B8BED6] hover:text-white'
        }`}
      >
        <span className="text-sm">🇨🇲</span>
        <span>FR</span>
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all text-xs font-semibold ${
          language === 'en'
            ? 'bg-gradient-primary text-white shadow-glow'
            : 'text-[#B8BED6] hover:text-white'
        }`}
      >
        <span className="text-sm">🇨🇲</span>
        <span>AN</span>
      </button>
    </div>
  );
}
