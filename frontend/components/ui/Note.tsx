import { Lightbulb, AlertCircle, Info, CheckCircle2 } from 'lucide-react';

const styles = {
  tip:     { bg: 'bg-yellow', Icon: Lightbulb,   label: 'Tips' },
  warning: { bg: 'bg-pink',   Icon: AlertCircle, label: 'Penting' },
  info:    { bg: 'bg-blue',   Icon: Info,        label: 'Info' },
  success: { bg: 'bg-mint',   Icon: CheckCircle2,label: 'Rumus' },
};

export default function Note({ type = 'tip', title, children }: any) {
  const s = styles[type as keyof typeof styles] || styles.tip;
  return (
    <div className={`${s.bg} border-2 border-ink rounded-xl shadow-neo p-4 my-4`}>
      <div className="flex items-center gap-2 font-extrabold mb-2 text-ink">
        <s.Icon size={18} /> {title || s.label}
      </div>
      <div className="text-sm leading-relaxed text-ink/90">{children}</div>
    </div>
  );
}