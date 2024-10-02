import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/v1/members/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        alert('회원가입이 완료되었습니다!');
        setName('');
        setEmail('');
        setPassword('');
        navigate('/'); 
      } else {
        alert('회원가입에 실패했습니다.');
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
      <div className="bg-white p-10 rounded-lg shadow-lg text-center w-96">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">회원가입</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input 
              type="text" 
              placeholder="이름" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition mb-2"
            />
          </div>
          <div className="mb-4">
            <input 
              type="email" 
              placeholder="이메일" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition mb-2"
            />
          </div>
          <div className="mb-4">
            <input 
              type="password" 
              placeholder="패스워드" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition mb-2"
            />
          </div>
          <button 
            type="submit" 
            className={`w-full py-3 rounded-lg bg-purple-600 text-white font-semibold transition duration-200 hover:bg-purple-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} 
            disabled={loading}
          >
            {loading ? '가입 중...' : '회원가입'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
