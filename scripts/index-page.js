// CommentList 

{/* <div class="comments__exist-comments-container">
<article>
    <div class="comments__avatar-grey"></div>
    <div class="comments__content">
        <h5 class="comments__name-commenter"></h5>
        <p class="comments__timestamp"></p>
        <p class="comments__text"></p>
    </div> */}

let existComments = [
    {
        name: 'Connor Walton',
        timestamp: '02/17/2021',
        commentText: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains."
    },
    {
        name: 'Emilie Beach',
        timestamp: '01/09/2021',
        commentText: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day."
    },
    {
        name: 'Miles Acosta',
        timestamp: '12/20/2020',
        commentText: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough."
    }
]

let commentContainer = document.querySelector('.comments__exist-comments-container');

for (let i = 0; i < existComments.length; i++) {
    let comment = existComments[i];
    let commentList = displayComment(comment);
    commentContainer.appendChild(commentList);
}

function displayComment(comment) {

    let commentList = document.createElement('article');
    commentList.classList.add('comments__list');

    let commentAvatar = createCommentAvatar(comment);
    commentList.appendChild(commentAvatar);

    let commentContent = createCommentContent(comment);
    commentList.appendChild(commentContent);

    return commentList;
}

function createCommentAvatar() {
    let commentAvatar = document.createElement('div');
    commentAvatar.classList.add('comments__avatar-grey');

    return commentAvatar;
}

function createCommentContent(comment) {
    let commentContent = document.createElement('div');
    commentContent.classList.add('comments__content');

    let nameCommenter = document.createElement('h5');
    nameCommenter.classList.add('comments__name-commenter');
    nameCommenter.innerText = comment.name;
    commentContent.appendChild(nameCommenter);

    let timestampComment = document.createElement('p');
    timestampComment.classList.add('comments__timestamp');
    timestampComment.innerText = comment.timestamp;
    commentContent.appendChild(timestampComment);


    let textComment = document.createElement('p');
    textComment.classList.add('comments__text');
    textComment.innerText = comment.commentText;
    commentContent.appendChild(textComment);

    return commentContent;
}

// for submitting form

let form = document.querySelector('.comments__form');

form.addEventListener('submit', handleCommentForm);

function handleCommentForm(event) {
    event.preventDefault();

    let timestamp = getCommentDate();

    function getCommentDate() {
        let date = new Date();
        let dateComment = ((date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear());
        return dateComment;
    }

    let comment = {};
    let name = document.querySelector('.comments__name-form').value;
    let commentText = document.querySelector('.comments__comment-box').value;

    comment['name'] = name;
    comment['timestamp'] = timestamp;
    comment['commentText'] = commentText;
    existComments.unshift(comment);

    event.target.reset();

    commentContainer.prepend(displayComment(comment));

}







