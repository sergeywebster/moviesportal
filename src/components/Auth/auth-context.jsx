import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import  { auth}   from "../../helpers/firebase";


const AuthContext = createContext({
    isLoggedIn: false,
    onLogin: () => {},
    onLogout: () => {},
    user: {},
});



export const AuthContextProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [authUser, setAuthUser] = useState({});

    useEffect(() => {
        // Get user data
        if(auth) {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    console.log(user.displayName)
                    setAuthUser({
                        name: user.displayName,
                        email: user.email,
                        uid: user.uid, 
                    });
                } else {
                    setAuthUser({});
                    console.log('no user')
                }

            });
        }

        // Get data from localstorage
        const storageValue = localStorage.getItem('isLoggedIn');

        if(storageValue === '1') {
            setIsLoggedIn(true);
        } 
        else {
            signOut(auth).then(() => {

            }).catch((error)  => {
                console.log(error)
            })
        }

    }, []);

 
    // Listen to log in
    const loginHandler = () => {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 1);
    }

    // Listen to log out
    const logoutHandler = () => {
        if(auth) {
            signOut(auth).then(() => {
                setIsLoggedIn(false);
                localStorage.removeItem('isLoggedIn');
                
                console.log('you sign out');
            }).catch((error)  => {
                console.log(error)
            })
        }
        
    }

    

    return (
        <AuthContext.Provider 
            value={{
                isLoggedIn: isLoggedIn, 
                onLogin: loginHandler,
                onLogout: logoutHandler,
                user : authUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    )

}

export default AuthContext;
