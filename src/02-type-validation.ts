import axios from 'axios';

// const posts = [
//     { id: 1, title: 'Post 1', body: 'post 1 body' },
//     { id: 2, title: 'Post 2', body: 'post 2 body' },
//     { id: 3, title: 'Post 3', body: 'post 3 body' },
//     {
//         id: 4,
//         title: 'Post 4',
//         body: 'post 4 body',
//         comments: [
//             {
//                 id: 1,
//                 message: 'Comment 1'
//             }
//         ]
//     }
// ];

async function getPosts() {
    try {
        const response = await axios.get('/posts.json');
        const posts: unknown = response.data;

        // Type Validation
        // if (validatePosts(posts)) {
        //     renderPosts(posts);
        // }
    } catch (error) {
        console.error(error);
    }
}

getPosts();

type Post = {
    id: number;
    title: string;
    body: string;
    comments?: Comment[];
};

type Comment = {
    id: number;
    message: string;
};

function renderPosts(posts: Post[]) {
    const postElements = posts
        .map(post => {
            const comments = post.comments ? renderComments(post.comments) : '';

            return `
            <article id="post-${post.id}">
                <h2>${post.title}</h2>
                <p>${post.body}</p>
                ${comments}
            </article>
        `;
        })
        .join('');

    render('#app', postElements);
}

function renderComments(comments: Comment[]) {
    const commentElements = comments
        .map(comment => {
            return `
                <li id="comment-${comment.id}">
                    <p>${comment.message}</p>
                </li>
            `;
        })
        .join('');

    const commentList = `<ul>${commentElements}</ul>`;

    return commentList;
}

function render(parentSelector: string, html: string) {
    const template = document.createElement('template');
    template.innerHTML = html;

    const parentElement = document.querySelector(parentSelector);
    parentElement?.appendChild(template.content);
}
