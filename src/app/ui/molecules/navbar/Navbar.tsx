'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function Navbar() {
    const pathname = usePathname()

    const handleLogout = () => {
        // Lógica de cierre de sesión
        console.log('Cerrando sesión...')
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
