import { useEffect } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { doc, collection, getDocs, updateDoc } from "firebase/firestore"
import { db, auth } from "../firebase"

function ReadUsers() {
	const [error, setError] = useState("")
	const [users, setUsers] = useState([])
	const userRef = collection(db, "Users")
	const [docId, setDocId] = useState(0)

	useEffect(() => {
		getUsers()
	}, [])

	const getUsers = async () => {
		try {
			const querySnapshot = await getDocs(userRef)
			querySnapshot.forEach((doc) => {
				console.log(doc.id, " => ", doc.data())
				setUsers(doc.data())
				setDocId(doc.id)
			})
		} catch (error) {
			console.error("Error fetching data: ", error)
			setError("Failed to retrieve records, ", error)
		}
	}

	return <div>ReadUsers</div>
}

export default ReadUsers
