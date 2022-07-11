import { apiKey } from "./config.js"

const commentContainer = document.querySelector('.comments__exist-comments-container');

const form = document.querySelector('.comments__form');

const projectApiUrl = "https://project-1-api.herokuapp.com";



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

    const blockActionComment = document.createElement('div');
    blockActionComment.classList.add('comments__block');

    const deleteComment = document.createElement('img');
    deleteComment.classList.add('comments__delete-button');
    deleteComment.setAttribute('src', '../assets/icons/icon-delete.svg');
    deleteComment.id = comment.id;

    deleteComment.addEventListener('click', (e) => {
        let commentId = e.target.id;
        axios
            .delete(`${projectApiUrl}/comments/${commentId}?api_key=${apiKey}`)
            .then((res) => {
                commentElement();
            })
            .catch(err => {
                console.log(err)
            })
    })

    const likeComment = document.createElement('img');
    likeComment.classList.add('comments__like-button');
    likeComment.setAttribute('src', '../assets/icons/icon-like.svg');
    likeComment.id = comment.id;

    const likeCounterComment = document.createElement('p');
    likeCounterComment.classList.add('comments__like-counter');
    likeCounterComment.innerText = comment.likes;

    likeComment.addEventListener('click', (e) => {
        let likeId = e.target.id;
        axios
            .put(`${projectApiUrl}/comments/${likeId}/like?api_key=${apiKey}`)
            .then((res) => {
                likeCounterComment.innerText = res.data.likes;
            })
            .catch(err => {
                console.log(err)
            })
    })

    blockActionComment.append(deleteComment, likeComment, likeCounterComment)
    commentContent.append(nameCommenter, textComment, timestampComment, blockActionComment);

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
            commentContainer.innerText = '';
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
