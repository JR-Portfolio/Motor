import { useEffect, useState } from "react"
import { useAuth } from "./AppContentext"
import { useNavigate } from "react-router-dom"

import Main from "./Main"
import {
	signInWithEmailAndPassword,
	getAuth,
	onAuthStateChanged,
	signInWithPopup,
	GoogleAuthProvider,
} from "firebase/auth"
//import { db } from "../firebase"
import "../css/Login.css"
import Error from "./ErrorPage"

const Login = () => {
	const auth = getAuth()
	const [error, setError] = useState("")
	const navigate = useNavigate()
	const { signed, setSigned } = useAuth()

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {				
				setSigned(true)
				return true
			} else {
				return false
			}
		})
	}, [])

	const handleSubmit = (e) => {
		e.preventDefault()
		const provider = new GoogleAuthProvider()
		signInWithPopup(auth, provider)
			.then((result) => {
				const credential =
					GoogleAuthProvider.credentialFromResult(result)
				const token = credential.accessToken
				const user = result.user
				setSigned(true)
				console.log("User signed in with Google:", user)
			})
			.catch((error) => {
				const errorCode = error.code
				const errorMessage = error.message
				const email = error.email
				const credential = GoogleAuthProvider.credentialFromError(error)
				console.log(
					"Error signing with Google:",
					errorCode,
					errorMessage
				)
			})
	}

	return (
		<div>
			{error && <Error />}
			{!signed ? (
				<div className="login-container">
					<form
						onSubmit={handleSubmit}
						className="login-form"
					>
						<button>Kirjaudu Googlen tunnareilla</button>
					</form>
				</div>
			) : (
				navigate("/")
			)}
		</div>
	)
}

export default Login
