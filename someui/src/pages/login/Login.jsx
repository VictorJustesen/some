import React, { useContext,useEffect, useRef,useState } from 'react';
import "./login.scss"
import { AuthContext } from '../../context/authContext';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import Info from "../../components/infologin/Infologin"
const Login = () => {


  const {login}=useContext(AuthContext);

  const canvasRef = useRef(null);
  const [showRegister, setShowRegister] = useState(false);
  const [registerInputs,setRegisterInputs] = useState({
    username:"",
    email:"",
    password:"",
    name:"",
  });

const [registerError,setRegisterError] = useState(false)
const [showInfo, setShowInfo] = useState(true);

const [loginInputs,setLoginInputs] = useState({
    username:"",
    password:"",
  });

const [loginError,setLoginError] = useState(false)

const navigate=useNavigate()

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    var letters = 'ABCDEFGHIJKLMNOPQRSTUVXYZ中國漢字文化語言筆書學知智者思哲學';
    letters = letters.split('');

    var fontSize = 10;
    var columns;
    var drops = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        columns = canvas.width / fontSize;
        for (var i = 0; i < columns; i++) {
            drops[i] = Math.floor(Math.random() * canvas.height / fontSize);
        }
    }

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, .1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (var i = 0; i < drops.length; i++) {
            var text = letters[Math.floor(Math.random() * letters.length)];
            ctx.fillStyle = '#0f0';
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            drops[i]++;
            if (drops[i] * fontSize > canvas.height && Math.random() > .95) {
                drops[i] = 0;
            }
        }
    }

    resizeCanvas(); // Initially set the canvas size.

    let intervalId;

    function startMatrix() {
        intervalId = setInterval(draw, 40);
    }

    startMatrix();

    // Listen for resize events
    window.addEventListener('resize', () => {
        clearInterval(intervalId); // Clear existing animation
        resizeCanvas();           // Reset canvas size
        startMatrix();            // Restart the animation
    });

    return () => {
        clearInterval(intervalId);  // Ensure interval is cleared when component is unmounted
        window.removeEventListener('resize', resizeCanvas);  // Remove the resize listener
    };
}, []);

const handleLoginChange= e => {
    setLoginInputs((prev)=> ({...prev, [e.target.name]: e.target.value}));
  };

const handleLogin = async (e) => {
e.preventDefault();
    try{
  await login(loginInputs);
  navigate("/")
    }
    catch(err){
setLoginError(err.response.data)
}
};

const handleRegisterChange= e => {
    setRegisterInputs((prev)=> ({...prev, [e.target.name]: e.target.value}));
  };



  const handleSignUp = async e => {
    e.preventDefault()
        try{
await axios.post("http://localhost:8800/api/auth/register", registerInputs)

        }
        catch(err){
            console.error(err)
setRegisterError(err.response.data)
        }
    
  };

  return (
    <div className='container'>
        { showInfo && <Info onClose={() => setShowInfo(false)} /> }
            <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: -1, backgroundColor: 'black' }} />
            <div className="card">
                {!showRegister ? (
                    // Login content
                    <div className="login">
                        <div className="left">
                            <h1>Hello world!</h1>
                            <p>👩‍💻 Greetings from  <span style={{color:'black'}}>Dev Connect!</span> 👨‍💻 Your passion for code has led you to a nexus of like-minded developers. This is a space where code snippets transform into learning experiences, and developer tales inspire. You're not just joining a platform; you're becoming a part of a movement. Together, let’s shape the future of coding.</p>
                            <span>Don't have an account?</span>
                            <button className="register-btn" onClick={() => setShowRegister(true)}>Register</button>
                            <button className="guest">Guest account</button>
                        </div>
                        <div className="right">
                            <h1>Login</h1>
                            <form>
                                <input type="text" placeholder="username" name='username' onChange={handleLoginChange} />
                                <input type="password" placeholder="password" name='password' onChange={handleLoginChange} />

                                {loginError && loginError}
                                <button className="login-btn" onClick={handleLogin}>Login</button>
                            </form>
                        </div>
                    </div>
                ) : (
                    // Register content
                 /*<input type="password" placeholder="confirm password" name="username" onChange={handleRegisterChange}/>*/

                    <div className="register">
                        <div className="left">
                        <h1>Register</h1>
                        
                 <form>
                   <input type="text" placeholder="username" name="username" onChange={handleRegisterChange}/>
                   <input type="text" placeholder="name" name="name" onChange={handleRegisterChange}/>
                   <input type="email" placeholder="email"name="email" onChange={handleRegisterChange}/>
                   <input type="password" placeholder="password" name="password" onChange={handleRegisterChange}/>
{registerError && registerError}
                   <button onClick={handleSignUp}>Sign Up</button>
                 </form> 
                        </div>
                        <div className="right">
                        <h1>Welcome to socialmediasite!</h1>
                            <p> Introducing <span style={{color:'black'}}>Dev Connect!</span> - where code 🖥️ seamlessly merges with community. Jump in and become a part of our passionate developer community. Experience the confluence of innovative coding debates and life's vibrant moments. Share 🔄, learn 📚, and thrive in an environment crafted especially for you – the developer, both in profession and spirit.</p>
                            <span>do you have an account?</span>
                            <button className="login-btn" onClick={() => setShowRegister(false)}>Back to Login</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
   
);
}

export default Login;