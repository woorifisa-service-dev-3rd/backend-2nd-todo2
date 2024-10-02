import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/v1/members/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('memberId', data.data.memberId);
        alert('로그인 성공!');
        setEmail('');
        setPassword('');
        navigate('/todo');
      } else {
        alert('로그인 실패. 이메일 또는 비밀번호를 확인하세요.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-500 to-blue-500">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center w-80">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">로그인</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <input 
              type="email" 
              placeholder="이메일" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="w-full p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="mb-5">
            <input 
              type="password" 
              placeholder="비밀번호" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className="w-full p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button 
            type="submit" 
            className="w-full p-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-200" 
            disabled={loading}
          >
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
