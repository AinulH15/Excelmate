export default function Card({ children, className = '', bg = 'bg-white' }: any) {
    return (
      <div className={`${bg} border-2 border-ink rounded-2xl shadow-neo p-5 ${className}`}>
        {children}
      </div>
    );
  }