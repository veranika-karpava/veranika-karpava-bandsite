
// let existComments = [
//     {
//         name: 'Connor Walton',
//         timestamp: '02/17/2021',
//         commentText: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains."
//     },
//     {
//         name: 'Emilie Beach',
//         timestamp: '01/09/2021',
//         commentText: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day."
//     },
//     {
//         name: 'Miles Acosta',
//         timestamp: '12/20/2020',
//         commentText: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough."
//     }
// ]

// let commentContainer = document.querySelector('.comments__exist-comments-container');

// displayComment(existComments);

// function displayComment(comments) {
//     for (let i = 0; i < comments.length; i++) {
//         comments[i];
//         let commentList = createCommentList(comments[i]);
//         commentContainer.appendChild(commentList);
//     }
// }

// function createCommentList(comment) {

//     let commentList = document.createElement('article');
//     commentList.classList.add('comments__list');

//     let commentAvatar = createCommentAvatar(comment);
//     commentList.appendChild(commentAvatar);

//     let commentContent = createCommentContent(comment);
//     commentList.appendChild(commentContent);

//     return commentList;
// }

// function createCommentAvatar() {
//     let commentAvatar = document.createElement('div');
//     commentAvatar.classList.add('comments__avatar-grey');

//     return commentAvatar;
// }

// function createCommentContent(comment) {
//     let commentContent = document.createElement('div');
//     commentContent.classList.add('comments__content');

//     let nameCommenter = document.createElement('h5');
//     nameCommenter.classList.add('comments__name-commenter');
//     nameCommenter.innerText = comment.name;
//     commentContent.appendChild(nameCommenter);

//     let timestampComment = document.createElement('p');
//     timestampComment.classList.add('comments__timestamp');
//     timestampComment.innerText = comment.timestamp;
//     commentContent.appendChild(timestampComment);


//     let textComment = document.createElement('p');
//     textComment.classList.add('comments__text');
//     textComment.innerText = comment.commentText;
//     commentContent.appendChild(textComment);

//     return commentContent;
// }

// // for submitting form

// let form = document.querySelector('.comments__form');

// form.addEventListener('submit', handleCommentForm);

// function handleCommentForm(event) {

//     event.preventDefault();

//     let nameCommenter = document.querySelector('.comments__name-form').value;
//     let dateStamp = getCommentDate();
//     let commentText = document.querySelector('.comments__comment-box').value;

//     function getCommentDate() {
//         let date = new Date();
//         let dateComment = ((date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear());
//         return dateComment;
//     };

//     let name = document.querySelector('.comments__name-form');
//     let text = document.querySelector('.comments__comment-box');

//     if ((nameCommenter === '') && (commentText === '')) {
//         removeClass(name, text)
//         name.classList.add('not-valid');
//         text.classList.add('not-valid');

//     } else if ((nameCommenter === "") && (commentText !== "")) {
//         removeClass(name, text)
//         name.classList.add('not-valid');
//         text.classList.add('valid');

//     } else if ((nameCommenter !== "") && (commentText === "")) {
//         removeClass(name, text)
//         name.classList.add('valid');
//         text.classList.add('not-valid');

//     } else {

//         removeClass(name, text)

//         event.target.reset();

//         removeComment();

//         addNewComment(nameCommenter, dateStamp, commentText);

//         displayComment(existComments);

//     }

// }


// function addNewComment(nameCommenter, dateStamp, commentText) {
//     existComments.unshift({
//         name: nameCommenter,
//         timestamp: dateStamp,
//         commentText: commentText
//     });
// }

// let container = document.querySelector('.comments__exist-comments-container')
// function removeComment() {
//     while (container.firstElementChild) {
//         container.removeChild(container.firstElementChild)
//     }
// }

// function removeClass(name, text) {
//     if (name.classList.contains('not-valid') || text.classList.contains('not-valid') || name.classList.contains('valid') || text.classList.contains('valid')) {
//         name.classList.remove('not-valid');
//         text.classList.remove('not-valid');
//         name.classList.remove('valid');
//         text.classList.remove('valid');
//     }
// }

const commentContainer = document.querySelector('.comments__exist-comments-container');

const form = document.querySelector('.comments__form');

const projectApiUrl = "https://project-1-api.herokuapp.com";
const apiKey = "7914ca5-c702-45f8-a052-61c3857a4dde";


function createCommentContent(comment) {

    const commentContent = document.createElement('div');
    commentContent.classList.add('comments__content');

    const nameCommenter = document.createElement('h5');
    nameCommenter.classList.add('comments__name-commenter');
    nameCommenter.innerText = comment.name;

    const timestampComment = document.createElement('p');
    timestampComment.classList.add('comments__timestamp');
    timestampComment.innerText = convertTimestamp(comment);

    function convertTimestamp(comment) {
        const timestampDate = new Date((comment.timestamp)).toLocaleDateString("en-US", { timeZone: "UTC", year: "numeric", month: "2-digit", day: "2-digit" });
        return timestampDate;
    }

    const textComment = document.createElement('p');
    textComment.classList.add('comments__text');
    textComment.innerText = comment.comment;

    commentContent.append(nameCommenter, textComment, timestampComment);

    return commentContent;
}

function createCommentList(comment) {

    const commentList = document.createElement('article');
    commentList.classList.add('comments__list');

    const commentAvatar = document.createElement('div');
    commentAvatar.classList.add('comments__avatar-grey');

    const commentContent = createCommentContent(comment);

    commentList.append(commentAvatar, commentContent);

    return commentList;
}

function displayComment(comment) {
    const commentList = createCommentList(comment);
    commentContainer.appendChild(commentList);
}

const commentElement = () => {
    axios
        .get(`${projectApiUrl}/comments?api_key=${apiKey}`)
        .then((response) => {
            const existCommentList = response.data;
            existCommentList.sort((a, b) => b.timestamp - a.timestamp)
            existCommentList.forEach((itemComment) => {
                displayComment(itemComment);
            })
        })
        .catch(error => console.log(error))
}

commentElement();

// for submitting form

form.addEventListener('submit', (event) => {

    event.preventDefault();
    const nameCommenter = document.querySelector('.comments__name-form').value;
    const commentText = document.querySelector('.comments__comment-box').value;
    const name = document.querySelector('.comments__name-form');
    const text = document.querySelector('.comments__comment-box');

    if ((nameCommenter === "") && (commentText === "")) {
        removeClass(name, text)
        name.classList.add('not-valid');
        text.classList.add('not-valid');
        console.log("Error 400")

    } else if ((nameCommenter === "") && (commentText !== "")) {
        removeClass(name, text)
        name.classList.add('not-valid');
        text.classList.add('valid');

    } else if ((nameCommenter !== "") && (commentText === "")) {
        removeClass(name, text)
        name.classList.add('valid');
        text.classList.add('not-valid');

    } else {
        removeClass(name, text)
        axios
            .post(`${projectApiUrl}/comments?api_key=${apiKey}`,
                { name: nameCommenter, comment: commentText },
                { headers: { 'Content-Type': 'application/json' } })
            .then(postresponse => {
                commentContainer.innerHTML = "";
                commentElement();
            })
            .catch(error => console.log(error))

        event.target.reset();
    }
})

function removeClass(name, text) {
    if (name.classList.contains('not-valid') || text.classList.contains('not-valid') || name.classList.contains('valid') || text.classList.contains('valid')) {
        name.classList.remove('not-valid');
        text.classList.remove('not-valid');
        name.classList.remove('valid');
        text.classList.remove('valid');
    }
}
