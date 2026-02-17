import Form from "./Form"
import { useNavigate } from "react-router-dom"

const Home = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-neutral-900  text-white ">
            <nav className="absolute top-4 right-4 flex gap-2 bg-white rounded p-1 ">
                 <button className="text-black p-2 rounded" onClick={() => navigate("/login")}>
                    Login
                 </button>
                 <button className="bg-gray-900 text-white p-2 rounded" onClick={() => navigate("/signup")}>
                    Signup
                 </button>
            </nav>
           <div className="pt-20 flex justify-center">
            <Form/>
           </div>
        </div>
    )
}


export default Home