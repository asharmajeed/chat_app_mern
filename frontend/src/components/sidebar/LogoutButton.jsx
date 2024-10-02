import { BiLogOut } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../store/authSlice";

const LogoutButton = () => {
	const dispatch = useDispatch();
	const { loading } = useSelector((state) => state.auth)

	const handleLogout = () => {
		dispatch(logout())
	}
	
	return (
		<div className='mt-auto'>
			{!loading ? (
				<BiLogOut className='w-6 h-6 text-white cursor-pointer' onClick={handleLogout} />
			) : (
				<span className='loading loading-spinner'></span>
			)}
		</div>
	);
};
export default LogoutButton;