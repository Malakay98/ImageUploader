import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/");
    };

    return (
        <nav className="navbar">
            <div className="navbar-links">
                <Link href="/">Home</Link>
            </div>
            <div className="navbar-auth">
                {router.pathname !== "/login" && router.pathname !== "/imageupd" && (
                    <Link href="/login">
                        <button>Login</button>
                    </Link>
                )}
                {router.pathname !== "/register" && router.pathname !== "/imageupd" && (
                    <Link href="/register">
                        <button>Register</button>
                    </Link>
                )}
                {router.pathname === "/imageupd" && (
                    <button onClick={handleLogout}>Logout</button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;