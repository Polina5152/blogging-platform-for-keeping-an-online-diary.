import {
    Button,
    Avatar,
    Heading,
    Text,
    Card,
} from "grommet";
import LikeButton from '../common/LikeButton';
import { LinkPrevious } from "grommet-icons";
import MenuPost from '../common/MenuPost'

import './PostPage.css';

export default function PostPage(props) {
    const {
        openHome,
        activeUser,
        profileId,
        get,
        users,
        deletePostsFromPostList,
        openPostEditForm,
    } = props;

    const { title,
        date,
        img,
        postText,
        avatar,
        usersLiked,
        id,
        authorId
    } = props.activePost;

    const userName = users.map(item => item.id === authorId ? item.name : null)

    return (
        <div className="div_card">
            <Card className="div_post_page">
                <div className="button_post_page">
                    <Button onClick={openHome}
                        icon={<LinkPrevious color="plain" />}
                        hoverIndicator
                        margin="none"
                    />
                    {activeUser && profileId === authorId &&
                        <div>
                            <MenuPost
                                userId={profileId}
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
                        </div>
                    }
                </div>
                <Heading
                    className="h2"
                    level="2"
                    margin="none"
                    alignSelf="center"
                >
                    {title}
                </Heading>
                {img &&
                    <div className="div_image">
                        <img
                            src={img}
                            alt="sasi"
                        />
                    </div>
                }
                <Text className="text_post_page"
                    margin="none">
                    {postText}
                </Text>
                <div className="div_avatar_like">
                    <div className="divButtonLike">
                        <LikeButton
                            userId={profileId}
                            idPost={id}
                            usersLiked={usersLiked}
                            activeUser={activeUser}
                            get={get}
                        />
                    </div>
                    <div className="div-avatar">
                        <Avatar src={avatar} />
                        <Text >
                            {userName}
                        </Text>
                        <Text >
                            {date}
                        </Text>
                    </div>
                </div>
            </Card>
        </div>
    )
}




