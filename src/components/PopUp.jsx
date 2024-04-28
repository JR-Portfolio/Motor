import { useState } from "react"
import Popover from "@mui/material/Popover"
import Typography from "@mui/material/Typography"
import Link from "@mui/material/Link"
import { useLocation, useNavigate } from "react-router-dom"

function PopupWithLongText() {
	const location = useLocation()
	const { state } = location
	const { text } = state
	console.log("popuptext: ", text)	
	const [anchorEl, setAnchorEl] = useState(text)
	const navigate = useNavigate()

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
		navigate(-1)
	}

	const open = Boolean(anchorEl)
	const id = open ? { text } : undefined

	return (
		<div>
			<Typography>
				<Link
					href="#"
					onClick={handleClick}
				>
					Show Long Text
				</Link>
			</Typography>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "center",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "center",
				}}
			>
				<Typography sx={{ p: 2 }}>
					{text}
				</Typography>
			</Popover>
		</div>
	)
}

export default PopupWithLongText
