import { Post } from '../Post';


import './PostList.css';

const PostList = props => {
    const { 
        openPost,
        posts,
        profileId,
        deletePostsFromPostList,
        openPostEditForm,
        activeUser,
        get,
    } = props;
    
    const blogPosts = posts.map(item => {
        const {id, title, postText, authorId, date, img, avatar, usersLiked} = item;

        return (
            <div 
                key={id}
                onClick={() => { openPost(item) }}>
                <Post
                    activeUser={activeUser}
                    userId={profileId}
                    key={id}
                    id={id}
                    title={title}
                    date={date}
                    img={img}
                    postText={postText}
                    avatar={avatar}
                    usersLiked={usersLiked}
                    authorId={authorId}                    
                    deletePostsFromPostList={deletePostsFromPostList}
                    openPostEditForm={openPostEditForm}
                    get={get}
                />
            </div>
            
        )
    })
    
    return (
        <div className = "post1">
            {blogPosts}
        </div>
    )
}
export default PostList;