const form = document.getElementById('form');
const result = document.querySelector('#input_name');
form.addEventListener('submit', (event) => {
    event.preventDefault()

    fetch(`https://api.github.com/users/${result.value}`)
        .then(response => {
            console.log('response:', response)
            return response.json()
        })

        .then((json) => {
            console.log(json)

            let avatar = document.getElementById ('avatar_url');
            avatar.src = json.avatar_url;
            avatar.width = 73;
            avatar.hight = 73;

            let name_bio = document.getElementById ('name_bio');
            name_bio.textContent = json.name;

            let login = document.getElementById ('login');
            login.textContent = json.login;

            let repos = document.getElementById ('repos');
            repos.textContent = json.public_repos;

            let bio = document.getElementById ('bio');
            bio.textContent = json.bio;

            let followers = document.getElementById ('followers');
            followers.textContent = json.followers;

            let following = document.getElementById ('following');
            following.textContent = json.following;

            let location = document.getElementById ('location');
            location.textContent = json.location ?? "-";

            let company = document.getElementById ('coumpany');
            company.textContent = json.company ?? "-";

            let blog = document.getElementById ('blog');
            blog.textContent = json.blog ? json.blog : "-";


        })
})

