import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Button from '../utils/Button/Button';
import LabelInput from '../utils/LabelInput/LabelInput';
import axios from 'axios';


function ConnectionModal(props) {

    const [identifier, setIdentifier] = useState({
        email : "",
        password : ""
    });

    const [error, setError] = useState('')

    let connection = async () => {
      try {
        const response1 = await axios.get("http://localhost:8000/api/get-csrf-token/", { withCredentials: true });
        const csrfToken = response1.headers['x-csrftoken'];
        
        const response2 = await axios.post("http://localhost:8000/api/users/dj-rest-auth/login/", {
          username: identifier.email,
          password: identifier.password
        }, {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken
          },
          withCredentials: true
        });
    
        const data = response2.data;
        localStorage.setItem('key', data.key);
        axios.defaults.headers.common['Authorization'] = `Token ${data.key}`;
        setError('')
        props.exit();
      } catch (error) {
        setError(error.response.data.non_field_errors[0]);
      }
    };
    
    return (
    <div id="defaultModal" tabIndex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto h-full flex justify-center items-center bg-[#000a]">
        <div className="relative w-full max-w-2xl max-h-full">
            <div className="relative bg-gray-200 rounded-lg shadow dark:bg-gray-700">
                <div className='flex justify-between items-center pr-6'>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white p-6">
                        Connectez vous
                    </h3>
                    <span className='text-xl cursor-pointer' onClick={()=>{
                        props.exit()
                    }}><FontAwesomeIcon icon={faXmark}/></span>
                </div>
                <div className="px-6 space-y-6 pb-6">
                    <LabelInput type="email" col label="Email" value={identifier.email} onChange={(e)=>{
                        setIdentifier({...identifier, email : e.target.value})
                    }}/>
                    <LabelInput type="password" col label="Mot de passe" value={identifier.password}  onChange={(e)=>{
                        setIdentifier({...identifier, password : e.target.value})
                    }}/>
                    <div className='text-red-600'>
                      {error}
                    </div>
                    <Button action={()=>{connection()}}>Se connecter</Button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ConnectionModal;