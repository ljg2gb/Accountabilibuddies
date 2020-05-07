const searchParams = new URLSearchParams(window.location.search)
const userName = searchParams.get('search');

fetch('http://localhost:3000/users')
    .then(resp => resp.json())
    .then(users => handleUsers(users))

function handleUsers(users){
    if (userName){
        handleLogin(users)
    }
}

function handleLogin(users){
    const foundUser = users.find(findUser)
    if (foundUser == undefined){
        errorMessage()
    } else {
        window.location.replace(`http://localhost:3001/show.html?user=${foundUser.id}`)
    }
}

function findUser(user){
    if (user.name == userName){
        return user
    }
}

function errorMessage(){
    const errorResponse = document.getElementById('error')
    errorResponse.innerText='User does not exist. Please try again or create an account.'
    console.log(errorResponse)
}
