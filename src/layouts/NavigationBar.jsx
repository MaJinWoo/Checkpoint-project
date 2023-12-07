import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import LoginSignup from './LoginSignup';
import { useDispatch } from 'react-redux';
import { changeLoginStatus } from '../redux/modules/authSlice';
export default function NavigationBar() {
  // 로딩 중 구현
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setIsLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        localStorage.setItem(
          'login user',
          JSON.stringify({ email: user.email, displayName: user.displayName, uid: user.uid, photoURL: user.photoURL })
        );
        dispatch(changeLoginStatus(true));
        setIsLoading(false);
      } else {
        localStorage.clear();
        dispatch(changeLoginStatus(false));
        setIsLoading(false);
      }
    });
  }, []);

  return <>{isLoading ? <div></div> : <LoginSignup />}</>;
}
