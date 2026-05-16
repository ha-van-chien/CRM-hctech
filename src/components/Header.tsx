import { Icons } from './icons';

export default function Header() {
  return (
    <header style={{
      height: 'var(--header-h)',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 2.5rem',
      position: 'sticky',
      top: 0,
      zIndex: 40
    }}>
      <div style={{ position: 'relative', width: '350px' }}>
        <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
          <Icons.search />
        </div>
        <input 
          type="text" 
          placeholder="Tìm kiếm khách hàng, cơ hội, công việc..." 
          className="input"
          style={{ 
            paddingLeft: '2.75rem', 
            backgroundColor: 'var(--bg-main)', 
            border: 'none',
            borderRadius: '12px'
          }}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button style={{ 
            width: '40px', height: '40px', borderRadius: '10px', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', 
            color: 'var(--text-muted)', backgroundColor: 'var(--bg-main)',
            position: 'relative'
          }}>
            <Icons.bell />
            <span style={{
              position: 'absolute', top: '10px', right: '10px',
              width: '8px', height: '8px', backgroundColor: 'var(--accent)',
              borderRadius: '50%', border: '2px solid white'
            }}></span>
          </button>
          <button style={{ 
            width: '40px', height: '40px', borderRadius: '10px', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', 
            color: 'var(--text-muted)', backgroundColor: 'var(--bg-main)'
          }}>
            <Icons.checkSquare />
          </button>
        </div>
        
        <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--border)' }}></div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 700 }}>Nguyễn Văn A</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>Giám đốc kinh doanh</div>
          </div>
          <div style={{
            width: '44px', height: '44px', borderRadius: '12px',
            backgroundColor: 'var(--primary)', color: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, fontSize: '1rem',
            boxShadow: '0 4px 12px rgba(15, 23, 42, 0.2)'
          }}>
            NV
          </div>
        </div>
      </div>
    </header>
  );
}
