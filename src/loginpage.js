import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from './AuthService';

export function Bejelentkezes()
{
    const [isLoginPending, setLoginPending] = useState(false);
    //const [loginData, setLoginData] = useState();

    const navigate = useNavigate();

    function loginFormSubmit(e)
    {
        e.persist();
        e.preventDefault();
        const logindata = {
            userName: e.target.userName.value,
            password: e.target.password.value
        };
        setLoginPending(true);
        login(logindata).then(response =>
        {
            //setLoginData(response.data.token);
            setLoginPending(false);

            localStorage.setItem("token", response.data.token);
            localStorage.getItem("token") ? navigate('/szuletes') : navigate('/')
            window.location.reload();
        })
            .catch(error =>
            {
                alert("Helytelen bejelentkezési adatok, kérjük próbáld újra!");
                setLoginPending(false);
            })
    }

    if (isLoginPending)
    {
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
            <div className="container-fluid" >
                <div className="row">
                    <div className="col text-center">
                        <br></br>
                        <br></br>
                    </div>
                </div>

            </div>
            < div className="container-fluid d-flex justify-content-center h-100 login-container" >
                <div className="card login-card">
                    <div>
                        <div className="card-header">
                            <h3>Bejelentkezés</h3>
                        </div>
                    </div>
                    <div className="card-body">
                        <form onSubmit={loginFormSubmit}>
                            <div className='input-group form-group'>
                                <input type="userName" name="userName" className="form-control" placeholder="Felhasználónév" />
                            </div>
                            <br /> {/* Sorköz hozzáadása */}
                            <div className='input-group form-group'>
                                <input type="password" name="password" className="form-control" placeholder="Jelszó" />
                            </div>
                            <br /> {/* Sorköz hozzáadása */}
                            <div className='form-group'>
                                <button type="submit" name="Bejelentkezés" className="btn float-right btn-warning" placeholder="email">Bejelentkezés</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
            

        </div>
    );
    
}
export default Bejelentkezes;