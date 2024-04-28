import {
	useEffect,
	useState,
	createContext,
	useContext,
} from "react"
import { app } from "../firebase"
import "firebase/auth"
import { useNavigate } from "react-router-dom"

//import { auth, app } from "../firebase"
//import {onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
	const [signed, setSigned] = useState(false)
	const [user, setUser] = useState(null)
	const [firstname, setFirstName] = useState()
	const navigate = useNavigate()

/*
	useEffect(() => {
		if (!signed) {
			navigate("/login")
		}
	}, [signed])
*/

	useEffect(() => {
		app.auth?.onAuthStateChanged((authUser) => {
			if (authUser) {
				console.log("Authenticated user: ", authUser)
				setUser(authUser)
				setSigned(true)
			} else {
				setUser(null)
				setSigned(false)
			}
		})
	}, [user])

	useEffect(() => {
		setFirstName(localStorage.getItem("firstname"))
		setUser(localStorage.getItem("username"))
	}, [])

	return (
		<AuthContext.Provider
			value={{
				user,
				signed,
				setSigned,
				setUser,
				firstname,
				setFirstName,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

const useAuth = () => {
	return useContext(AuthContext)
}

export { AuthProvider, useAuth }
