import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from './AuthService';

export function Bejelentkezes() {
    const [isLoginPending, setLoginPending] = useState(false);
    const navigate = useNavigate();

    function loginFormSubmit(e) {
        e.persist();
        e.preventDefault();
        const logindata = {
            userName: e.target.userName.value,
            password: e.target.password.value
        };
        setLoginPending(true);
        login(logindata).then(response => {
            setLoginPending(false);
            navigate('/');
        })
            .catch(error => {
                alert("Helytelen bejelentkezési adatok, kérjük próbáld újra!");
                setLoginPending(false);
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
        <div className="container-fluid d-flex justify-content-center h-100 login-container">
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
        </div>
    );
}
export default Bejelentkezes;