import { useEffect, useState } from 'react';
import {
    Form,
    FormField,
    Button,
    Box,
    Card,
    TextArea,
} from "grommet";

import './AddPost.css';

const AddPost = (props) => {
    const { submitNewPosts, activeUser, post, editPost, postsLength } = props;
    const [postTitle, setPostTitle] = useState('');
    const [postImage, setPostImage] = useState('');
    const [postText, setPostText] = useState('');

    useEffect(() => {
        setPostTitle('');
        setPostImage('');
        setPostText('');
        if (post) {
            setPostTitle(post.title);
            setPostImage(post.img);
            setPostText(post.postText);
        }
    }, [post])

    const addNewPost = async () => {
        const url = `http://localhost:5000/dataAmount`
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
        });
        const countObj = await res.json();
        console.log(countObj);
        const now = new Date();
        // const id = now.getTime();
        const newPost = {
            authorId: activeUser.id,
            id: countObj.posts + 1,
            // id,
            avatar: activeUser.avatar,
            title: postTitle,
            img: postImage,
            postText,
            date: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`,
            usersLiked: [],
        }
        countObj.posts = countObj.posts + 1;

        submitNewPosts(newPost, countObj)
    }

    const formSubmitHandler = () => {
        if (!post) {
            addNewPost();
        }
        else {
            const newPost = {
                ...post,
                title: postTitle,
                img: postImage,
                postText,
            };
            editPost(newPost);
        }
    }

    const resetForm = () => {
        setPostTitle('')
        setPostImage('');
        setPostText('');
    }

    return (
        <Card className="card_add" background="light-1">
            <Form
                onReset={() => resetForm({})}
                onSubmit={() => formSubmitHandler()}
            >
                <FormField name="postTitle" htmlFor="text-input-id" label="Title" >
                    <TextArea
                        plain
                        resize={false}
                        placeholder="type here"
                        value={postTitle}
                        onChange={event => setPostTitle(event.target.value)}
                        required
                    >
                    </TextArea>
                </FormField>
                <FormField name="postImage" htmlFor="text-input-id" label="Image">
                    <TextArea
                        plain
                        resize={false}
                        placeholder="type here"
                        value={postImage}
                        onChange={event => setPostImage(event.target.value)}
                    >
                    </TextArea>
                </FormField>
                <FormField name="postText" htmlFor="text-input-id" label="Text">
                    <TextArea
                        plain
                        resize={false}
                        placeholder="type here"
                        value={postText}
                        onChange={event => setPostText(event.target.value)}
                        required
                    >
                    </TextArea>
                </FormField>
                <Box className="box_button" direction="row" gap="medium">
                    <Button
                        type="submit"
                        primary
                        label="Submit"
                    />
                    <Button type="reset" label="Reset" />
                </Box>
            </Form>
        </Card>
    );
}
export default AddPost;