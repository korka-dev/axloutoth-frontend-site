import {useState} from "react";
import {loginUser, getUserInfo} from "../../api/auth.js";
import {Link} from "react-router-dom";
import {ErrorMessage} from "../messages/ErrorMessage.jsx";
import {SuccessMessage} from "../messages/SucessMessage.jsx";
import {AiOutlineUser, AiOutlineLock, AiOutlineLogin, AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai';

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await loginUser(username, password);

            if (response.status === 200) {
                setSuccessMessage("Utilisateur connecté(e) avec succès");
                setTimeout(() => {
                    window.location.reload();
                }, 3000);

                const data = await response.json();
                window.localStorage.setItem('access_token', data.access_token);

                const currentUser = await (await getUserInfo(window.localStorage.getItem("access_token"))).json();
                window.localStorage.setItem('currentUser', currentUser.name);
            } else {
                setErrorMessage("Email ou mot de passe incorrect");
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            }
        } catch (error) {
            console.error("Une erreur s'est produite lors de la connexion");
        }
    };

    return (
        <div className="container mt-5">
            {errorMessage && <ErrorMessage message={errorMessage}/>}
            {successMessage && <SuccessMessage message={successMessage}/>}
            <div className="text-center mb-4">
                <h2>Bienvenue sur le site Axlou Toth</h2>
                <AiOutlineUser size="2em" style={{marginBottom: '10px'}}/>
                <h2 className="text-center mb-4" style={{fontSize: '2.5em'}}>Connexion</h2>
            </div>

            <div className="row justify-content-center">
                <div className="col-md-8">
                    <form onSubmit={handleLogin} className="rounded p-5 border shadow-lg bg-light">
                        <div className="form-group mb-4">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text bg-white border-right-0">
                                        <AiOutlineUser size="1.5em"/>
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    className="form-control border-left-0 border"
                                    id="login-username"
                                    placeholder="Nom d'utilisateur"
                                    style={{height: '40px', padding: '8px'}}
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group mb-4">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text bg-white border-right-0">
                                        <AiOutlineLock size="1.5em"/>
                                    </span>
                                </div>
                                <input
                                    type={passwordVisible ? "text" : "password"}
                                    className="form-control border-left-0 border"
                                    id="login-password"
                                    placeholder="Mot de passe"
                                    style={{height: '40px', padding: '8px'}}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <div className="input-group-append">
                                    <span
                                        className="input-group-text bg-white border-left-0"
                                        onClick={() => setPasswordVisible(!passwordVisible)}
                                        style={{cursor: 'pointer'}}
                                    >
                                        {passwordVisible ? <AiOutlineEyeInvisible size="1.5em"/> :
                                            <AiOutlineEye size="1.5em"/>}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block" id="login-submit"
                                style={{fontSize: '1.2em', padding: '10px'}}>
                            <AiOutlineLogin size="1.5em" style={{marginRight: '5px'}}/>
                            Se connecter
                        </button>
                        <p className="mt-4 text-center">
                            {/* eslint-disable-next-line react/no-unescaped-entities */}
                            Vous n'avez pas de compte ?{' '}
                            <Link to="/register" id="show-register" style={{fontSize: '1.1em'}}>
                                Créer un compte
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};
