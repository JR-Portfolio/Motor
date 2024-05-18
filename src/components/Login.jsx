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
	const [loginFormData, setLoginFormData] = useState({
		username: "",
		password: "",
	})

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				alert(`Käyttäjä ${user.email} on jo kirjautunut`)
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
				console.log("Error signing with Google:", errorCode, errorMessage)
			})
	}

	console.log("kirjaantunut ? ", signed)

	function handleChange(e) {
		const { name, value } = e.target
		setLoginFormData((prev) => ({
			...prev,
			[name]: value,
		}))
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
						<input
							name="username"
							onChange={handleChange}
							type="email"
							placeholder="Sähköposti - käyttäjätunnuksena"
							value={loginFormData.username}
						/>
						<input
							name="password"
							onChange={handleChange}
							type="password"
							placeholder="Salasana"
							value={loginFormData.password}
						/>
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
