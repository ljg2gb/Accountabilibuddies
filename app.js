
const searchParams = new URLSearchParams(window.location.search);
const search = searchParams.get('search');
let usersURL = 'http://localhost:3000/users'
if (search) {
    usersURL = `http://localhost:3000/users?search=${search}`
}
console.log(search)

fetch('http://localhost:3000/users')
    .then(resp => resp.json())
    .then(addDropDownOptions)

// function handleUsers(users) {
//     const foundUser = users.find( user => {
//         // console.log(user.name)
//         findUser(user)
//     })
//     console.log(foundUser)
// }

// function findUser(user) {
//     if (user.name == search) 
//     {return user}
// }

const $select = document.querySelector('#users')
function addDropDownOptions(users) {
    users.forEach(user => {
        const $option = document.createElement('option')
        $option.value = user.id
        $option.innerText = user.name
        $select.append($option)
    })

}


