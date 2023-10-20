import React, { useState } from 'react'
function Header() {
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    const handleMostrarFormulario = () => {
        setMostrarFormulario(!mostrarFormulario);
      };
    return (

        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="" className="flex items-center">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Vehiculos</span>
                </a>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    
                </div>
            </div>
        </nav>

    )
}

export default Header
