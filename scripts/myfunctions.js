

document.getElementById('search').addEventListener('click', searchUserInfo);

function searchUserInfo() {

    var contentInput = document.getElementsByTagName('input')[0].value;

    if (contentInput === '') {

        alert('You have to put a username');

    } else {

        loadInfoUser(contentInput);
        loadRepoInfo(contentInput);
    }
};

function loadInfoUser(currentUser) {

    var myRequest = new XMLHttpRequest();

    myRequest.open('GET', 'https://api.github.com/users/' + currentUser, true);

    myRequest.onload = function () {

        if (this.status == 200) {

            var user = JSON.parse(this.responseText);

            getUserInfo(user);

            document.getElementById('userSucces', 'gitLogo').removeAttribute('class');
            document.getElementById('userSucces').setAttribute('class', 'show');
            document.getElementById('gitLogo').setAttribute('class', 'hide');
            document.getElementsByTagName('input')[0].value = '';
            document.getElementById('userError').className = 'hide';
            
        } else if (this.status == 404) {

            document.getElementById('userSucces', 'gitLogo').removeAttribute('class');
            document.getElementById('userSucces').setAttribute('class', 'hide');
            document.getElementById('gitLogo').setAttribute('class', 'show');
            document.getElementsByTagName('input')[0].value = '';
            document.getElementById('userError').className = 'show';
            
        }
    }

    myRequest.send();

};

function loadRepoInfo(currentUser) {

    var myRequest = new XMLHttpRequest();

    myRequest.open('GET', 'https://api.github.com/users/' + currentUser + '/repos', true);

    myRequest.onload = function () {

        if (this.status == 200) {

            var repoInfo = JSON.parse(this.responseText);

            getRepoInfo(repoInfo);

            document.getElementById('userSucces').removeAttribute('class');
            document.getElementById('userSucces').setAttribute('class', 'show');

        } else if (this.status == 404) {

            document.getElementById('userError').className = 'show';

        }
    }

    myRequest.send();

};

function getUserInfo(dataUser) {

    document.getElementById('avatar').setAttribute('src', dataUser.avatar_url);
    document.getElementById('emailUser').innerHTML = dataUser.email;
    document.getElementById('fullName').innerHTML = dataUser.name;
    document.getElementById('bioUser').innerHTML = dataUser.bio;

};

function getRepoInfo(repoInfo) {

    var printRepo = document.getElementById('repoTable');
    
    printRepo.innerHTML = '';

    for (var i = 0; i < repoInfo.length; i++) {

        var repoName = repoInfo[i].name;
        var repoStars = repoInfo[i].stargazers_count;
        var repoForks = repoInfo[i].forks_count;

        var row = document.createElement('tr');
        var cellRepoName = document.createElement('td');
        var cellStars = document.createElement('td');
        var starImg = document.createElement('img');
        var cellForks = document.createElement('td');
        var forkImg = document.createElement('img');

        starImg.setAttribute('id', 'star');
        starImg.setAttribute('src', 'styles/images/star2.png');
        starImg.setAttribute('alt', 'star logo');
        forkImg.setAttribute('id', 'fork');
        forkImg.setAttribute('src', 'styles/images/fork.png');
        forkImg.setAttribute('alt', 'fork logo');

        cellRepoName.append(repoName);
        cellStars.append(starImg);
        cellStars.append(repoStars);
        cellForks.append(forkImg);
        cellForks.append(repoForks);

        row.append(cellRepoName);
        row.append(cellStars);
        row.append(cellForks);

        printRepo.append(row);

    };
};


