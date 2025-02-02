// components/Navbar.tsx
'use client'
import { useState } from "react";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("inventario");

  return (
    <nav className={styles.navbar}>
      <button 
        className={activeTab === "inventario" ? "active" : ""} 
        onClick={() => setActiveTab("inventario")}
      >
        Inventario
      </button>
      <button 
        className={activeTab === "prestamos" ? "active" : ""} 
        onClick={() => setActiveTab("prestamos")}
      >
        Préstamos
      </button>
      <button 
        className={activeTab === "cerrar" ? "active" : ""} 
        onClick={() => setActiveTab("cerrar")}
      >
        Cerrar sesión
      </button>
    </nav>
  );
};

export default Navbar;
