const searchParams = new URLSearchParams(window.location.search)
const search = searchParams.get('search');
// const login = document.querySelector('#login')
// login.addEventListener('click', (event)=>{loginAction()})

// function loginAction() {
    fetch('http://localhost:3000/users')
        .then(resp => resp.json())
        .then(users => handleUsers(users))

    function handleUsers(users){
        if (search){
            handleLogin(users)
        }
    }

    function findUser(user){
        if (user.name == search){
            return user
        }
    }

    function handleLogin(users){
        const foundUser = users.find(findUser)
        if (foundUser == undefined){
            console.log("User does not exist")
            const errorMessage = document.createElement('p')
            errorMessage.innerText='User does not exist'
            document.body.append(errorMessage)
        } else {
            window.location.replace(`http://localhost:3001/show.html?user=${foundUser.id}`)
        }
    }
// }
