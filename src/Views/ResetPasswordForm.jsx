import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import Header from './Header';

const ForgotPasswordForm = () => {
  const [message, setMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const handleResetPassword = async (data) => {
    try {
      

      const response = await fetch('https://sigaemail.host8b.me/correo.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correo: data.correo, // Use data.correo instead of correoElectronico
        }),
      });
      const result = await response.json();
      console.log(result)

      if (response.done) {
        setMessage('Error al enviar el correo de recuperación');
      } else {
        
        setMessage('Correo de recuperación enviado correctamente');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error al enviar el correo de recuperación conexión fallida');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Header />
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-blue-500 mb-2">Recuperación de Contraseña</h1>
        <p className="text-sm text-gray-600 mb-4">
          Ingresa tu dirección de correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
        </p>
        <form className="mb-4" onSubmit={handleSubmit(handleResetPassword)}>
          <div className="mb-9 relative">
            <div className="relative">
              <input
                type="text"
                id="outlined_error"
                aria-describedby="outlined_error_help"
                className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                  errors.correo ? 'dark:text-white dark:border-red-500 border-red-600 dark:focus:border-red-500 focus:outline-none focus:border-red-600' : 'dark:text-gray-500 dark:border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600'
                } peer`}
                placeholder=" "
                {...register('correo', { required: 'Este campo es requerido', pattern: { value: /^[\w.-]+@(?:uthh\.edu\.mx|gmail\.com)$/, message: 'El formato de correo no es válido' } })}

              />
              <label
                htmlFor="passwordInput"
                className={`absolute text-sm ${
                  errors.correo ? 'text-red-600 dark:text-red-500' : 'text-gray-500 dark:text-gray-400'
                } duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 ${
                  errors.correo ? 'peer-focus:text-red-600' : 'peer-focus:text-gray-500'
                } peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto`}
              >
                Correo Electrónico
              </label>
            </div>
            {errors.correo && <p className="mt-2 text-xs text-red-600 dark:text-red-400"><span className="font-medium">Oh, snap!</span> {errors.correo.message}</p>}
          </div>
          <button
            type="submit"
            className="mb-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-blue-900 hover:text-white focus:ring-blue-900 w-full"
          >
            Enviar Correo de Recuperación
          </button>
          {message && <p>{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
