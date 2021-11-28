import './Post.css';

import LikeButton from '../common/LikeButton';
import MenuPost from '../common/MenuPost';
import {
  Card,
  CardBody,
  CardHeader as Header,
  CardFooter,
  Box,
  Avatar,
  Text,
  Image,
} from "grommet";


export const Post = props => {
  const {
    id,
    title,
    date,
    img,
    postText,
    avatar,
    usersLiked,
    userId,
    deletePostsFromPostList,
    openPostEditForm,
    authorId,
    activeUser,
    get,
  } = props;

  return (
    <Card
      className="card"
    >
      <div className="div_header">
        <Header pad="medium" >
          <div className="header">
            <Box direction="row" gap="small" >
              <Avatar size="medium"
                src={avatar}
              />
              <Text className="header-text">
                {title}
                <br />
                {date}
              </Text>
              {activeUser && userId === authorId &&
                <MenuPost
                  userId={userId}
                  id={id}
                  usersLiked={usersLiked}
                  activeUser={activeUser}
                  deletePostsFromPostList={deletePostsFromPostList}
                  openPostEditForm={openPostEditForm}
                  title={title}
                  img={img}
                  postText={postText}
                  avatar={avatar}
                  date={date}
                  authorId={authorId}
                />
              }
            </Box>
          </div>
        </Header>
      </div>
      <CardBody >
        <Box className="box_image">
          <Image
            fit="cover"
            src={img}
          />
        </Box>
        <Text className="text" style={{ overflow: "hidden" }}>
          {postText}
        </Text>
      </CardBody>
      <div className="usersLikedList">
        <CardFooter pad={{ horizontal: "small" }} >
          <div className="likeButton">
            <LikeButton
              userId={userId}
              idPost={id}
              usersLiked={usersLiked}
              activeUser={activeUser}
              get={get}
            />
          </div>
        </CardFooter>
      </div>
    </Card>
  )
}
