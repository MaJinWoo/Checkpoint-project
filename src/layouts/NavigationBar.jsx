import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import LoginSignup from './LoginSignup';
export default function NavigationBar() {
  // 로그인 상태를 담는 state
  const [isLogin, setIsLogin] = useState(false);

  // 로딩 중 구현
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        localStorage.setItem(
          'login user',
          JSON.stringify({ email: user.email, displayName: user.displayName, uid: user.uid, photoURL: user.photoURL })
        );
        setIsLogin(true);
        setIsLoading(false);
      } else {
        localStorage.clear();
        setIsLogin(false);
        setIsLoading(false);
      }
    });
  }, []);

  return <>{isLoading ? <div></div> : <LoginSignup isLogin={isLogin} setIsLogin={setIsLogin} />}</>;
}
