import {useState} from "react";
import {Link} from "react-router-dom";
import {registerUser, verifyCode, resendCode} from "../../api/users.js";
import {ErrorMessage} from "../messages/ErrorMessage.jsx";
import {SuccessMessage} from "../messages/SucessMessage.jsx";
import {FaUserPlus} from 'react-icons/fa';
import {AiOutlineEye, AiOutlineEyeInvisible, AiOutlineLock, AiOutlineUser} from "react-icons/ai";

export const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [code, setCode] = useState("");
    const [, setToken] = useState("");
    const [step, setStep] = useState(1);
    const [, setIsVerified] = useState(false);

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();

        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (!email.match(emailPattern)) {
            setErrorMessage("L'adresse e-mail n'est pas valide.");
            setTimeout(() => {
                window.location.reload();
            }, 2000);
            return;
        }

        try {
            const response = await registerUser(email, password);

            if (response.status === 201) {
                setSuccessMessage("Utilisateur créé(e) avec succès. Veuillez continuer la création de compte");
                setStep(2)

            } else if (response.status === 409) {
                setErrorMessage("L'utilisateur existe déjà");
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                setErrorMessage("Vérifier les données saisies");
            }
        } catch (error) {
            console.error("Erreur lors de la création d'utilisateur");
        }
    };


    const handleVerifyCode = async (e) => {
        e.preventDefault();

        try {
            const response = await verifyCode(email, code);

            if (response.status === 200) {
                setSuccessMessage("Votre compte est activé.Veuillez continuer l'inscription");
                setIsVerified(true);

                const data = await response.json()
                const token = data.token

                console.log(token)
                setToken(token)
                setStep(3)

            } else {
                setErrorMessage("Code de vérification incorrect");
                setTimeout(() => {
                    setErrorMessage("");
                }, 2000);
            }
        } catch (error) {
            console.error("Erreur lors de la vérification du code");
        }
    };

    const handleResendCode = async () => {
        try {
            const response = await resendCode(email);
            if (response.status === 200) {
                setSuccessMessage("Un nouveau code de vérification a été envoyé.");
            } else {
                setErrorMessage("Erreur lors de l'envoi du code. Veuillez réessayer.");
            }
        } catch (error) {
            console.error("Erreur lors de l'envoi du code");
        }
    };

    /*
    const handleCompleteRegisterStep1 = async (e) => {
        e.preventDefault();

        try {
            const response = await completeRegisterStep1(token, firstname, lastname, adresse, sexe);

            if (response.status === 200) {
                setSuccessMessage("Première partie de l'inscription complétée avec succès.");
            } else {
                setErrorMessage("Erreur lors de la complétion de la première partie de l'inscription.");
                setTimeout(() => {
                    setErrorMessage("");
                }, 2000);
            }
        } catch (error) {
            console.error("Erreur lors de la complétion de la première partie de l'inscription", error);
        }
    };

     */


    // Fonctions de navigation
    const handleNextStep = () => {
        if (step < 3) {
            setStep(step + 1);
        }
    };

    const handlePreviousStep = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    return (
        <div className="container mt-5">
            {successMessage && <SuccessMessage message={successMessage}/>}
            {errorMessage && <ErrorMessage message={errorMessage}/>}
            <h2 className="text-center mb-4" style={{fontSize: '2.5em'}}>Création de compte</h2>

            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="form-container">
                        {step === 1 && (
                            <form onSubmit={handleSubmit} id="create-user-form"
                                  className="p-5 border rounded shadow-lg bg-light">
                                <div className="form-group mb-4">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text bg-white border-right-0">
                                                <AiOutlineUser size="1.5em"/>
                                            </span>
                                        </div>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="create-username"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Nom d'utilisateur"
                                            required
                                            style={{fontSize: '1.2em'}}
                                        />
                                    </div>
                                </div>
                                <div className="form-group mb-4">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text bg-white border-right-0"
                                                  style={{fontSize: '1.5em'}}>
                                                <AiOutlineLock/>
                                            </span>
                                        </div>
                                        <input
                                            type={passwordVisible ? "text" : "password"}
                                            className="form-control border-left-0 border"
                                            id="login-password"
                                            placeholder="Mot de passe"
                                            style={{height: '45px', fontSize: '1.2em', padding: '10px'}}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                        <div className="input-group-append">
                                            <span
                                                className="input-group-text bg-white border-left-0"
                                                onClick={() => setPasswordVisible(!passwordVisible)}
                                                style={{cursor: 'pointer', fontSize: '1.5em'}}
                                            >
                                                {passwordVisible ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary w-100 mb-3" id="create-user-submit"
                                        style={{fontSize: '1.2em', padding: '10px'}}>
                                    <FaUserPlus/> Envoyer
                                </button>
                                <div className="form-group mb-0">
                                    <p className="text-center mt-3" style={{fontSize: '1.2em'}}>
                                        Déjà un compte ?{' '}
                                        <Link to="/" id="show-login" style={{fontSize: '1.2em'}}>
                                            Se connecter
                                        </Link>
                                    </p>
                                </div>
                                {/* Pagination avec boutons */}
                                <div className="d-flex justify-content-center mt-4">
                                    <div className="pagination">
                                        <button
                                            onClick={handlePreviousStep}
                                            disabled={step === 1}
                                            className={`btn btn-outline-primary mx-2 ${step === 1 ? 'disabled' : ''}`}
                                        >
                                            Précédent
                                        </button>
                                        <button
                                            onClick={handleNextStep}
                                            disabled={step === 2}
                                            className={`btn btn-outline-primary mx-2 ${step === 2 ? 'disabled' : ''}`}
                                        >
                                            Suivant
                                        </button>
                                    </div>
                                </div>
                            </form>
                        )}

                        {step === 2 && (
                            <form onSubmit={handleVerifyCode} id="verify-code-form"
                                  className="p-5 border rounded shadow-lg bg-light">
                                <div className="form-group mb-4">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text bg-white border-right-0">
                                                <AiOutlineUser size="1.5em"/>
                                            </span>
                                        </div>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="verify-code"
                                            value={code}
                                            onChange={(e) => setCode(e.target.value)}
                                            placeholder="Code de validation"
                                            required
                                            style={{fontSize: '1.2em'}}
                                        />
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center mt-4">
                                    <button type="submit" className="btn btn-primary mx-2" id="verify-code-submit"
                                            style={{fontSize: '1.2em', padding: '10px'}}>
                                        Envoyer
                                    </button>
                                    <button type="button" className="btn btn-secondary mx-2" id="resend-code"
                                            style={{fontSize: '1.2em', padding: '10px'}}
                                            onClick={handleResendCode}>
                                        Nouveau
                                    </button>
                                </div>

                                {/* Pagination avec boutons */}
                                <div className="d-flex justify-content-center mt-4">
                                    <div className="pagination">
                                        <button
                                            onClick={handlePreviousStep}
                                            disabled={step === 1}
                                            className={`btn btn-outline-primary mx-2 ${step === 1 ? 'disabled' : ''}`}
                                        >
                                            Précédent
                                        </button>
                                        <button
                                            onClick={handleNextStep}
                                            disabled={step === 2}
                                            className={`btn btn-outline-primary mx-2 ${step === 2 ? 'disabled' : ''}`}
                                        >
                                            Suivant
                                        </button>
                                    </div>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
