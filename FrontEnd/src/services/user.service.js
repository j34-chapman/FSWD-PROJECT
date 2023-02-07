
const login = (email, password) => {
    return fetch("http://localhost:3333/login" ,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
           
        })
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            }else if(response.status === 400){
                throw "Bad request"
            }else{
                throw "something went wrong"
            }
        })
        .then((resJson) => {
            localStorage.setItem("user_id", resJson.user_id);
            localStorage.setItem("session_token", resJson.session_token)
            return resJson
        })
        .catch((error) => {
            console.log("Err", error)
            return Promise.reject(error)
        })
}

const getAllUsers = () => {
    return fetch("http://localhost:3333/users" ,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": localStorage.getItem("session_token")
            }      
        })
        .then((response) => {
            if (response.status === 200) {
                return response.json();

            }else if(response.status === 401){
                throw "Not logged in"
            }else{
                throw "something went wrong"
            }
        })
        .then ((resJson) => {
            return resJson
        })
        .catch((error) => {
            console.log("Err", error)
            return Promise.reject(error)
        })
}

/* 4) found this in slides dont have it but what does doe const data mean  */
const addNewUser = (user_id, first_name, last_name, email, password) => {
    return fetch("http://localhost:3333/users" ,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": localStorage.getItem("session_token")
            },
            body: JSON.stringify({
                //"user_id": user_id,
                "first_name": first_name,
                "last_name": last_name,
                "email": email,
                "password": password
            })
        })
        .then((response) => {
            if (response.status === 201) {
                return response.json();
            } else {
                throw "Something went wrong"
            }
        })
        .then((resJson) => {
            return resJson
        })
        .catch((error) => {
            console.log("Err", error)
            return Promise.reject(error)
        })
}

const logOut = () => {
    return fetch("http://localhost:3333/logout" ,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": localStorage.getItem("session_token")
            }      
        })
        .then((response) => {
            if (response.status === 200) {
                localStorage.removeItem("user_id")
                localStorage.removeItem("session_token")
                return 
            }else if(response.status === 401){
                throw "Not logged in"
            }else{
                throw "something went wrong"
            }
        })
        .catch((error) => {
            console.log("Err", error)
            return Promise.reject(error)
        })
}



export const userService = {
    login,
    logOut,
    getAllUsers,
    addNewUser
}