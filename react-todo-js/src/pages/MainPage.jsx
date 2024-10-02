import React from 'react';
import { Link } from 'react-router-dom';

function MainPage() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-indigo-600 to-pink-600 text-white">
      <div className="text-center mb-12">
        <h1 className="text-6xl font-extrabold drop-shadow-lg">환영합니다!</h1>
        <p className="mt-2 text-lg">편리한 서비스를 이용해보세요.</p>
      </div>
      <div className="flex justify-center space-x-6">
        <Link to="/signup">
          <button className="px-8 py-4 text-lg font-semibold text-white bg-purple-700 rounded-lg shadow-lg hover:bg-purple-800 transition ease-in-out duration-300 transform hover:scale-105">
            회원가입
          </button>
        </Link>
        <Link to="/login">
          <button className="px-8 py-4 text-lg font-semibold text-white bg-purple-700 rounded-lg shadow-lg hover:bg-purple-800 transition ease-in-out duration-300 transform hover:scale-105">
            로그인
          </button>
        </Link>
      </div>
    </div>
  );
}

export default MainPage;
