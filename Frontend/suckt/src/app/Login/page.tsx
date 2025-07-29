// app/login/page.tsx

'use client'; // Client Component directive

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // สำหรับ App Router

export default function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // ป้องกันการรีโหลดหน้าเมื่อ submit form

    setError(null); // เคลียร์ข้อผิดพลาดเดิม

    // ตรวจสอบความถูกต้องของข้อมูลเบื้องต้น (ตัวอย่างง่ายๆ)
    if (!email || !password) {
      setError('กรุณากรอกอีเมลและรหัสผ่าน');
      return;
    }

    try {
      // นี่คือส่วนที่คุณจะส่งข้อมูลไปยัง Backend API เพื่อตรวจสอบการ Login
      // ในตัวอย่างนี้เราจะจำลองการทำงานเหมือนมีการเรียก API
      console.log('Attempting login with:', { email, password });

      // ตัวอย่าง: การจำลองการเรียก API
      const response = await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (email === 'user@example.com' && password === 'password123') {
            resolve({ success: true, message: 'เข้าสู่ระบบสำเร็จ!' });
          } else {
            reject(new Error('อีเมลหรือรหัสผ่านไม่ถูกต้อง'));
          }
        }, 1000); // จำลองการดีเลย์ 1 วินาที
      });

      // หาก Login สำเร็จ
      if ((response as { success: boolean }).success) {
        alert('เข้าสู่ระบบสำเร็จ!');
        router.push('/dashboard'); // เปลี่ยนเส้นทางไปยังหน้า Dashboard หรือหน้าอื่นที่ต้องการ
      }
    } catch (err: any) {
      setError(err.message || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#1a3257ff'
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        width: '400px',
        maxWidth: '90%'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>เข้าสู่ระบบ</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>อีเมล:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '16px'
              }}
            />
          </div>
          <div style={{ marginBottom: '30px' }}>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>รหัสผ่าน:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '16px'
              }}
            />
          </div>
          {error && <p style={{ color: 'red', marginBottom: '20px', textAlign: 'center' }}>{error}</p>}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              fontSize: '18px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease'
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#005bb5')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#0070f3')}
          >
            เข้าสู่ระบบ
          </button>
        </form>
      </div>
    </div>
  );
}