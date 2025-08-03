'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!username || !password || !confirm) {
      setError('กรุณากรอกข้อมูลให้ครบ');
      return;
    }

    if (password !== confirm) {
      setError('รหัสผ่านไม่ตรงกัน');
      return;
    }

    // จำลองการสมัครสำเร็จ
    alert('สมัครสมาชิกสำเร็จ!');
    router.push('/Login');
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f2f2f2'
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        width: '400px',
        maxWidth: '90%'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>Apply for membership</h2>
        <form onSubmit={handleRegister}>
          <label style={{ fontWeight: 'bold' }}>username</label>
          <input
            type="text"
            value={username}
            onChange={e => setusername(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '16px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
          <label style={{ fontWeight: 'bold' }}>password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '16px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
          <label style={{ fontWeight: 'bold' }}>Confirm password</label>
          <input
            type="password"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '16px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
          {error && <p style={{ color: 'red', marginBottom: '16px' }}>{error}</p>}
          <button type="submit" style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer'
          }}>
            Apply for membership
          </button>
        </form>
        <div style={{ marginTop: '16px', textAlign: 'center' }}>
          <a href="/Login" style={{ color: '#0070f3' }}>Return to login</a>
        </div>
      </div>
    </div>
  );
}

