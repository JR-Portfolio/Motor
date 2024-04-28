import { useState, useEffect } from "react"
import Error from "./ErrorPage"
import PopupWithLongText from "./PopUp"
import { collection, getDocs } from "firebase/firestore"
import Link from "@mui/material/Link"
import { useNavigate } from "react-router-dom"
import { db } from "../firebase"

const ReadService = () => {
	const [service, setService] = useState([])
	const [error, setError] = useState("")
	const navigate = useNavigate()

	const getServices = async () => {
		try {
			const huoltoRef = collection(db, "huolto")
			const querySnapshot = await getDocs(huoltoRef)
			const data = querySnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}))
			setService(data)

			console.log("service data: ", data)
		} catch (error) {
			console.error("Error fetching data: ", error)
			setError(error)
		}
	}

	useEffect(() => {
		getServices()
	}, [])

	console.log("ReadServices, ", service)
	if (!service) {
		throw {
			message: "The password validation failed",
			statusText: "Invalid password",
			status: 403,
		}
	}

	const showPopUp = (text) => {
		navigate("popUp", { state: { text: text} })
	}

	return (
		<>
			{error && <h3>{error}</h3>}
			<>
				<div>
					<table style={{ textAlign: "left", marginLeft: "7%" }}>
						{service.map((s) => (
							<tbody key={s.id}>
								<tr>
									{s.huolto.length > 50 ? (
										<td onClick={ () => showPopUp(s.huolto)}>
											Näytä teksti
										</td>
									) : (
										<td>{s.huolto}</td>
									)}
									<td>Km: {s.km}</td>
									<td>Huoltopaikka: {s.huoltopaikka}</td>
									<td>Kustannukset: {s.kustannukset}</td>
									<td>Maksettu: {s.maksettu}</td>
									<td>Huolto pvm: {s.pvm}</td>
									<td>Huolto pvm: {s.huoltaja}</td>
								</tr>
							</tbody>
						))}
					</table>
				</div>
			</>
		</>
	)
}

export default ReadService
