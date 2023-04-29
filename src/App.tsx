import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Outlet, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { userApi } from './api/user';
import { auth } from './firebase';
import { useAppDispatach } from './hooks/useRedux';
import { IUser } from './intefaces';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import { login } from './reducers/userSlice';

function App() {
  const dispatch = useAppDispatach();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    let unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const result = await userApi.getUserByEmail(user?.email as string);
        if (result) {
          dispatch(login(result.data));
        } else {
          const newUser: IUser = {
            id: user.uid,
            email: user.email!,
            signedInAt: new Date().toISOString(),
            lastSignedInAt: new Date().toISOString()
          };
          let res = await userApi.createNewUser(newUser);
          dispatch(login(res));
        }
      }
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <p className="text-base text-black">Loading...</p>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route index path="/login" element={<Login />} />
        <Route element={<RequireAuth />}>
          <Route path="/diagrams" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export function Home() {
  return (
    <div className="w-full h-screen mx-auto border flex flex-col text-center ">
      Home Page
      <br />
      MODE: {import.meta.env.MODE}
      <br />
      BASE URL: {import.meta.env.BASE_URL}
      <br />
      DOMAIN: {import.meta.env.VITE_DOMAIN}
    </div>
  );
}

const RequireAuth = () => {
  // if (!user?.email || !user.profile?.name) {
  //   return <Navigate to="/login" state={{ from: location }} />
  // }

  return (
    <>
      <Outlet />
    </>
  );
};

export default App;
