export default function Button({ children, variant = 'mint', className = '', ...props }: any) {
    const map: any = {
      mint: 'bg-mint', pink: 'bg-pink', yellow: 'bg-yellow',
      blue: 'bg-blue', lavender: 'bg-lavender', cream: 'bg-white',
    };
    return (
      <button
        className={`${map[variant] || map.mint} border-2 border-ink rounded-xl px-5 py-2.5 font-bold
                    shadow-neo transition-all hover:translate-x-[2px] hover:translate-y-[2px]
                    hover:shadow-neo-sm active:translate-x-[4px] active:translate-y-[4px]
                    active:shadow-none disabled:opacity-50 ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }