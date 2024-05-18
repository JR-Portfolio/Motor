/*
import React from "react"
import bcrypt from "bcryptjs"
*/
function support() {
	/*
	function credentials(loginFormData) {
		const saltRounds = 10
		const { username, password } = loginFormData
		let unameValidate = false

		if (
			(username.includes(".com") || username.includes(".fi")) &&
			username.includes("@")
		) {
			unameValidate = true
		}

		const storedHash = localStorage.getItem("hash")

		bcrypt.compare(password, users.hash, function (err, result) {
			setSigned(result)

			if (result) {
				setLoggedIn(result)
				localStorage.setItem("loggedIn", true)
				localStorage.setItem("username", username)
				localStorage.setItem("firsname", users.firstname)
				const updateUserRef = doc(db, "Users", docId)
				updateDoc(updateUserRef, {
					loggedIn: true,
				})
			}

			if (!result) {
				const updateUserRef = doc(db, "Users", docId)
				updateDoc(updateUserRef, {
					loggedIn: false,
				})

				throw {
					message: "The password validation failed",
					statusText: "Invalid password",
					status: 403,
				}
			}
		})
	}
*/

	return <div>Tukikoodia / tarpeetonta, mutta ei viitsi tuhota.</div>
}

export default support
