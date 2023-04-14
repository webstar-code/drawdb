import { getRedirectResult, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userApi } from '../api/user';
import { GOOGLE_ICON } from '../assets';
import { Button } from '../components/Button';
import { auth } from '../firebase';
import { useAppDispatach, useAppSelector } from '../hooks/useRedux';
import { addUserProfile } from '../reducers/userSlice';

const x = { asd: 'Asd', asd123: '!23' };

export default function Login() {
  const { user } = useAppSelector((state) => state.userSlice);
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [name, setName] = useState<string>('');
  const [error, setError] = useState(false);
  const dispatch = useAppDispatach();

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    console.log('google sign in');
    let userAgent = navigator.userAgent;
    let browserName;
    if (userAgent.match(/chrome|chromium|crios/i)) {
      await signInWithRedirect(auth, provider);
      browserName = 'chrome';
    } else if (userAgent.match(/firefox|fxios/i)) {
      browserName = 'firefox';
    } else if (userAgent.match(/safari/i)) {
      await signInWithPopup(auth, provider);
      browserName = 'safari';
    } else if (userAgent.match(/opr\//i)) {
      browserName = 'opera';
    } else if (userAgent.match(/edg/i)) {
      browserName = 'edge';
    } else {
      browserName = 'No browser detection';
    }
    await getRedirectResult(auth);
  };

  useEffect(() => {
    if (user?.id) {
      if (!user.profile?.name) {
        setStep(1);
        return;
      }
      navigate('/diagrams');
    }
  }, [user]);

  const createProfile = () => {
    if (!name) {
      setError(true);
      return;
    }
    setError(false);
    dispatch(addUserProfile({ name })).then((data) => {
      navigate('/diagrams');
    });
  };

  return (
    <div className="relative w-full h-screen flex flex-col">
      <div className="absolute w-full h-full top-0 left-0 flex flex-col -z-10">
        <div className="w-full h-[40%] bg-primary"></div>
        <div className="w-full h-[60%] bg-background"></div>
      </div>

      <div className="w-[90%] md:w-4/5 h-[80%] m-auto">
        <div className="w-full h-full flex flex-col items-center gap-10 px-7 py-10 md:p-10 bg-white rounded-xl drop-shadow-md">
          {step === 0 ? (
            <>
              <h1 className="text-2xl text-black font-semibold">Login</h1>

              <div className="w-full flex flex-col items-center justify-center gap-5">
                <h1 className="text-base font-semibold">Sign in With</h1>
                <div
                  onClick={() => signInWithGoogle()}
                  className="w-20 h-20 p-5 cursor-pointer border border-primary rounded-md"
                >
                  <img src={GOOGLE_ICON} className="w-full h-full" />
                </div>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-2xl text-black font-semibold">Setup Profile</h1>

              <div className="w-full max-w-md flex flex-col gap-4">
                <div className="w-full max-w-md flex flex-col">
                  <label className="text-sm my-1 font-semibold">Name</label>
                  <input
                    className="px-4 py-2 rounded-md shadow-sm max-w-full outline-primary border border-gray-300 mt-1 block w-full"
                    id="name"
                    type="text"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {error && <p className="text-xs text-red-500 font-semibold">Please Enter Your Name</p>}
                </div>
                <div className="w-max ml-auto mt-7">
                  <Button text="Proceed" onClick={() => createProfile()} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
