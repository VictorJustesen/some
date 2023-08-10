import React, { useEffect, useRef,useState } from 'react';
import "./login.scss"

const Login = () => {
  const canvasRef = useRef(null);
  const [showRegister, setShowRegister] = useState(false);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    
    var letters = 'ABCDEFGHIJKLMNOPQRSTUVXYZ中國漢字文化語言筆書學知智者思哲學';
    letters = letters.split('');

    var fontSize = 10;
    var columns = canvas.width / fontSize;

    var drops = [];
    for (var i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * canvas.height / fontSize); 
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

    const intervalId = setInterval(draw, 40);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='container'>
       <div className="login">
         <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: -1 }} />
         <div className="card">
           {!showRegister ? ( 
             // Login content
             <>
               <div className="left">
                 <h1>Hello world!</h1>
                 <p>Welcome to my social media site! This is a social media platform for developers, programmers, and everything alike.</p>
                 <span>Don't have an account?</span>
                 <button className="register" onClick={() => setShowRegister(true)}>Register</button> 
                 <button className="guest">Guest account</button>
               </div>
               <div className="right">
                 <h1>Login</h1>
                 <form>
                   <input type="text" placeholder="username" />
                   <input type="password" placeholder="password" />
                   <button>Login</button>
                 </form>        
               </div>
             </>
           ) : (
             // Register content
             < >
             <div className="left">
               <h1>Hello world!</h1>
               <p>Welcome to my social media site! This is a social media platform for developers, programmers, and everything alike.</p>
               <span>Don't have an account?</span>
               <button className="register" onClick={() => setShowRegister(true)}>Register</button> 
               <button className="guest">Guest account</button>
             </div>
             
               <div className="right">
                <span>do you have a account?</span>
                <button onClick={() => setShowRegister(false)}>Back to Login</button>
               </div>
           </>
           )}
         </div>
       </div>
    </div>
   );
 }
 
 export default Login;