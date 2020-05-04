
const searchParams = new URLSearchParams(window.location.search);
const search = searchParams.get('search');
console.log(search)

fetch('http://localhost:3000/users')
    .then(resp => resp.json())
    .then(handleUsers)

function handleUsers(users) {
    const foundUser = users.find( user => {
        // console.log(user.name)
        findUser(user)
    })
    console.log(foundUser)
}

function findUser(user) {
    if (user.name == search) 
    {return user}
}

