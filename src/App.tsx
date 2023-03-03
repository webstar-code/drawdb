import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useAppDispatach, useAppSelector } from './hooks/useRedux'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import { Outlet } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { userApi } from './api/user'
import { login } from './reducers/userSlice'
import { IUser } from './intefaces'

function App() {
  const dispatch = useAppDispatach();
  const [loading, setLoading] = useState(true);
  const { user } = useAppSelector(state => state.userSlice);

  useEffect(() => {
    setLoading(true);
    let unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const result = await userApi.getUserByEmail(user?.email as string);
        if (result) {
          dispatch(login(result.data))
        } else {
          const newUser: IUser = {
            id: user.uid,
            email: user.email!,
            signedInAt: new Date().toISOString(),
            lastSignedInAt: new Date().toISOString(),
          }
          let res = await userApi.createNewUser(newUser);
          dispatch(login(res))

        }
      }
      setLoading(false)
    })
    return () => {
      unsubscribe();
    }
  }, []);

  if (loading) {
    return (
      <div className='w-screen h-screen flex items-center justify-center'>
        <p className='text-base text-white'>Loading...</p>
      </div>)
  }

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route element={<RequireAuth />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  )
}

const RequireAuth = () => {
  const { user } = useAppSelector(state => state.userSlice);
  let location = useLocation();

  if (!user?.email || !user.name) {
    return <Navigate to="/login" state={{ from: location }} />
  }

  return (
    <>
      <Outlet />
    </>
  );
}

export default App
