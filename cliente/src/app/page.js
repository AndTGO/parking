"use client"
import Header from '@/components/Header'
import List from '@/components/List'
import { useState } from 'react'
import Form from '@/components/Form'
import Modal from '@/components/Modal'
import Update from '@/components/Update'
import Car from '@/components/Car'



export default function Home() {
  const [isEntryModalOpen, setIsEntryModalOpen] = useState(false);
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const [ModalOpen, setModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [updateList, setUpdateList] = useState(0); 


  const [formData, setFormData] = useState(null);

  const handleConfirmClick = () => {
    setIsConfirmModalOpen(true);
  };

  const handleConfirmModalClose = () => {
    setIsConfirmModalOpen(false);
  };

  const handleFormSubmit = (data) => {
    console.log(data);
    setIsEntryModalOpen(false);
    setUpdateList(updateList + 1);
  };

  const handleFormSubmitUp = (data) => {
    console.log(data);
    setIsExitModalOpen(false);
    setUpdateList(updateList + 1);
  };

  const handleForm = (data) => {
    console.log(data);
    setModalOpen(false);
  };

  const handleStartNewMonth = () => {
    setIsConfirmModalOpen(false);

    fetch('http://localhost:4000/api//registerReset', {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log('Registros actualizados correctamente');
        } else {
          console.error('Error al actualizar registros');
        }
      })
      .catch((error) => {
        console.error('Error de red:', error);
      });
  };


  return (
    <div>
      <div>
        <Header />
      </div>
      <div className='content'>
        <div className='card-to-do'>
          <div className='add-todo'>
            <div className='menu'>

              <button
                className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover-bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => setModalOpen(true)}
              >
                Registro vehiculo
              </button>
              <Modal isOpen={ModalOpen} onClose={() => setModalOpen(false)}>
                <Car onSubmit={handleForm} />
              </Modal>

              <button
                className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover-bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => setIsEntryModalOpen(true)}
              >
                Registro Ingreso
              </button>
              <Modal isOpen={isEntryModalOpen} onClose={() => setIsEntryModalOpen(false)}>
                <Form onSubmit={handleFormSubmit} />
              </Modal>

              <button
                className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover-bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => setIsExitModalOpen(true)}
              >
                Registrar Salida
              </button>
              <Modal isOpen={isExitModalOpen} onClose={() => setIsExitModalOpen(false)}>
                <Update onSubmitUp={handleFormSubmitUp} />
              </Modal>

              <button
                className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover-bg-blue-700 dark:focus:ring-blue-800"
                onClick={handleConfirmClick}
              >
                Comenzar Nuevo Mes
              </button>

              {/* Confirmation Modal */}
              <Modal
                isOpen={isConfirmModalOpen}
                onClose={handleConfirmModalClose}
              >
                <div>
                  <p>¿Está seguro de comenzar un nuevo mes?</p>
                  <button onClick={handleStartNewMonth}>Sí</button>
                  <button onClick={handleConfirmModalClose}>No</button>
                </div>
              </Modal>

            </div>
          </div>
          <List updateList={updateList} />
        </div>
      </div>

    </div>
  )
}
