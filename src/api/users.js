export const registerUser = async (email, password) => {

    try {
        return await fetch('http://localhost:8000/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password}),
        });
    } catch (error) {
        console.error("Erreur lors de creation de compte")
    }

}

export const verifyCode = async (email, code) => {

    try {
        return await fetch(`http://localhost:8000/users/verify-code?email=${email}&code=${code}`, {
            method: 'POST',
        });
    } catch (error) {
        console.error("Erreur lors de la vérification du code");
    }
}

export const resendCode = async (email) => {

    try {
        return await fetch(`http://localhost:8000/users/resend-verification-code?email=${email}`, {
            method: 'POST',
        });
    } catch (error) {
        console.error("Erreur lors de la vérification du code");
    }
}


export const completeRegisterStep1 = async (token, firstname, lastname, adresse, sexe) => {

    try {
        return await fetch(`http://localhost:8000/users/complete-register-1?token=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({firstname, lastname, adresse, sexe}),
        });
    } catch (error) {
        console.error("Erreur lors de creation de compte de la partie 1")
    }

}


export const completeRegisterStep2 = async (token, niveau, serie, etablissement, role) => {

    try {
        return await fetch('http://localhost:8000/users/complete-register-2', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({token, niveau, serie, etablissement, role}),
        });
    } catch (error) {
        console.error("Erreur lors de creation de compte de la partie 2")
    }

}



