// client/src/pages/Login.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authcontext'; 

export default function Login() {
  const navigate = useNavigate();
  const { loginWithGoogle, user } = useAuth(); // <--- 2. Get the login tool

  // 3. If the user is successfully logged in, send them to the Profile (or Dashboard)
  useEffect(() => {
    if (user) {
      navigate('/dashboard'); // Changed to dashboard to match your flow
    }
  }, [user, navigate]);

  const handleLogin = async () => {
    try {
      // 4. The Real Login Trigger
      await loginWithGoogle(); 
      // The useEffect above will handle the redirect automatically
    } catch (error) {
      console.error("Login Error:", error);
      alert("Login failed. Check console for details.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-700">
        <h2 className="text-3xl font-bold mb-6 text-center">Welcome Back</h2>
        
        <button
          onClick={handleLogin} // <--- 5. Connect the button to the real function
          className="w-full bg-white text-gray-900 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
        >
          <img 
            src="https://www.google.com/favicon.ico" 
            alt="Google" 
            className="w-5 h-5" 
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}