import {
    Menu,
  } from "grommet";

const MenuPost = props => {
    const {
        id,
        authorId,
        userId,
        deletePostsFromPostList,
        title,
        img,
        postText,
        usersLiked,
        avatar,
        date,
        openPostEditForm,
      } = props;

      const onClickMenu = event => {
        event.stopPropagation();
      };
    
      const deletePost = event => {
        event.stopPropagation();
        deletePostsFromPostList(id);
      };
    
      const editPostHandler = event => {
        event.stopPropagation();
        const postToEdit = {
          title,
          img,
          postText,
          id,
          usersLiked,
          avatar,
          date,
          authorId,
          userId,
        }
        openPostEditForm(postToEdit)
      }

    return (
        <div>
                <Menu
                  label="Menu"
                  onClick={onClickMenu}
                  items={[
                    { label: 'Delete post', onClick: (event) => deletePost(event) },
                    { label: 'Edit post', onClick: (event) => editPostHandler(event) },
                  ]}
                />
        </div>
    )
}

export default MenuPost;