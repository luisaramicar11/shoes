'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation"

export default function Navbar() {
    const pathname = usePathname()
    const router = useRouter();  

    const handleLogout = async() => {
        // Lógica de cierre de sesión
        console.log('Cerrando sesión...')
        try {
            await signOut({redirect: false})
            router.push('/login')
        } catch (error) {
            console.log("Error al cerrar la session", error)
        }
    }

    return (
        <nav className="navbar">
            <div className="navContainer">
                <Link
                    href="/inventario"
                    className={`navLink ${pathname === '/inventario' ? 'active' : ''}`}
                >
                    Inventario
                </Link>

                <Link
                    href="/prestamos"
                    className={`navLink ${pathname === '/prestamos' ? 'active' : ''}`}
                >
                    Préstamos
                </Link>

                <button onClick={handleLogout} className="logoutButton">
                    Cerrar Sesión
                </button>
            </div>
        </nav>
    );
}
