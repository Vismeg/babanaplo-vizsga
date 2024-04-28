import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from './AuthService';

export function Regisztralas() {
    const [isLoginPending, setRegisterPending] = useState(false);
    const navigate = useNavigate();

    function registerFormSubmit(e){
        e.persist();
        e.preventDefault();
        
        const registerdata = {
            userName: e.target.userName.value,
            password: e.target.password.value,
            email: e.target.email.value,
            fullname: e.target.fullname.value,
        };
        setRegisterPending(true);
        register(registerdata).then(response =>{
            setRegisterPending(false);
            alert("Sikeres regisztráció, a folytatáshoz kérjük jelentkezzen be!");
            navigate('/');

        })
        .catch(error =>{
            alert("Helytelen regisztrációs adatok, kérjük próbálja újra!");
            setRegisterPending(false);
        })
    }
    if (isLoginPending) {
        return (
            <div className="center-item">
                <div className="spinner-border text-danger"></div>
            </div>
        );
    }
    return (
        <div>
             <div className="container-fluid" >
                <div className="row">
                    <div className="col text-center">
                        <br></br>
                        <br></br>
                    </div>
                </div>
            </div>
            <div className="container-fluid" style={{backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: '20px'}}>
                <div className="row">
                    <div className="col text-center">
                        <p className="mb-0" style={{fontWeight: 'bold', fontSize: '30px'}}>Babanapló</p>
                        <p className="mb-0" style={{fontSize: '18px'}}>'az emlékkönyv-írás új dimenziója'</p>
                    </div>
                </div>
            </div>
            <br></br>
        <div className="container-fluid d-flex justify-content-center h-100 login-container">
            <div className="card login-card">
                <div className="card-header">
                    <h3>Regisztráció</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={registerFormSubmit}>

                        <div className='input-group form-group'>
                            <input type = "text" name="userName" className="form-control" placeholder="Felhasználónév"/>
                        </div>
                        <br /> {/* Sorköz hozzáadása */}

                        <div className='input-group form-group'>
                            <input type = "password" name="password" className="form-control" placeholder="Jelszó"/>
                        </div>
                        <br /> {/* Sorköz hozzáadása */}

                        <div className='input-group form-group'>
                            <input type = "email" name="email" className="form-control" placeholder="Email"/>
                        </div>
                        <br /> {/* Sorköz hozzáadása */}

                        <div className='input-group form-group'>
                            <input type = "text" name="fullname" className="form-control" placeholder="Teljes név"/>
                        </div>
                        <br /> {/* Sorköz hozzáadása */}

                    
                        <div className='form-group'>
                            <button type = "submit" name="Regisztráció" className="btn float-right btn-warning" placeholder="email">Regisztráció</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
        </div>
    );
}
export default Regisztralas;