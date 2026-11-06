const form = document.getElementById('form');
const result = document.querySelector('#input_name');
const card = document.querySelector('.card');

form.addEventListener('submit', (event) => {
    event.preventDefault()

    //Защита от пустого ввода
    const username = result.value.trim();
    if (!username) return;

    //Корректно кодируем имя при построении URL с помощью encodeURIComponent
    const encodedUsername = encodeURIComponent(username);

    fetch(`https://api.github.com/users/${encodedUsername}`)
        .then(response => {
            console.log('response:', response);

            if (!response.ok) {
                // Если пользователь не найден (404) или другая ошибка, скрываем карточку
                card.style.visibility = 'hidden';

                if (response.status === 404) {
                    throw new Error('Пользователь GitHub не найден');
                } else if (response.status === 403) {
                    // Обработка ограничения запросов
                    throw new Error('Превышен лимит запросов к GitHub API. Попробуйте позже.');
                } else if (response.status >= 500) {
                    throw new Error('Сервер GitHub временно недоступен.');
                } else {
                    throw new Error(`Ошибка сервера (Статус: ${response.status})`);
                }
            }

            return response.json();
        })

        .then((json) => {
            console.log(json)
            card.style.visibility = 'visible';

            let avatar = document.getElementById ('avatar_url');
            avatar.src = json.avatar_url;
            avatar.width = 73;
            avatar.height = 73;

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

        .catch((err) => {
            //Карточка скрыта, если ошибка произошла на этапе сети
            card.style.visibility = 'hidden';

            //Обработка сетевых ошибок
            if (err instanceof TypeError && err.message.includes('fetch')) {
                alert('Сетевая ошибка: Проверьте подключение к интернету.');
            } else {
                //Выводим ошибки
                alert(err.message);
            }
    });
})

