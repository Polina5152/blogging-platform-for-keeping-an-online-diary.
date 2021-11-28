import { useState, useEffect } from 'react';
import { Grommet, Footer, Text, Anchor } from 'grommet';
import { Github } from "grommet-icons";

import Login from '../Login';
import PostList from '../PostList'
import Menu from '../Menu';
import PostPage from '../PostPage';
import { postList, postPage, addPost, editPostPage } from '../../constants/componentNames';
import { ACTIVE_USER_STORAGE } from '../../constants';
import AddPost from '../AddPost';


function App() {
    const [activePage, setActivePage] = useState(postList);
    const [activePostData, setActivePostData] = useState(null);
    const [posts, setPosts] = useState([]);
    const [postToEdit, setPostToEdit] = useState({});
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [users, setUsers] = useState([]);
    const [activeUser, setActiveUser] = useState();

    const get = async () => {
        const url = 'http://localhost:5000/posts'
        const res = await fetch(url);
        const post = await res.json();
        setPosts(post);
    }

    const getUser = async () => {
        const url = 'http://localhost:5000/users'
        const res = await fetch(url);
        const users = await res.json();
        setUsers(users);
    }

    useEffect(() => {
        get();
        checkAuthentication();
        getUser();
    }, [])

    const onClickLogin = async () => {
        setShowLoginModal(true);
        const url = 'http://localhost:5000/users'
        const res = await fetch(url);
        const users = await res.json();
        setUsers(users);
    }

    const onClickClose = () => {
        setActivePage(postList);
        setShowLoginModal(false);
    }

    const openPost = postData => {
        setActivePage(postPage);
        setActivePostData(postData);
    };

    const onClickHome = () => {
        setActivePage(postList);
    };

    const openHome = () => {
        setActivePage(postList);
    };

    const onClickAddPost = () => {
        setActivePage(addPost);
    };

    const submitNewPosts = async (newPost, countObj) => {
        setActivePage(postList);
        const url = 'http://localhost:5000/posts'
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(newPost)
        });
        if (res.ok) {
            const postAdd = await res.json();
            setPosts([...posts, postAdd]);
            const url = 'http://localhost:5000/dataAmount'
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(countObj)
            });
        }
    };

    const deletePostsFromPostList = async (id) => {
        setActivePage(postList);
        const url = `http://localhost:5000/posts/${id}`;
        const res = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(posts)
        });
        if (res.ok) {
            setPosts(posts.filter(item => item.id !== id));
        }
    };

    const openPostEditForm = (post) => {
        setPostToEdit(post);
        setActivePage(editPostPage);
    };

    const editPost = async (newPost) => {
        const url = `http://localhost:5000/posts/${newPost.id}`;
        const res = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(newPost)
        });
        if (res.ok) {
            setPosts(posts.map(item => item.id === newPost.id ? newPost : item));
            setActivePage(postList);
        }
    }

    const logout = () => {
        localStorage.removeItem(ACTIVE_USER_STORAGE);
        setActiveUser(null);
    }

    const checkAuthentication = () => {
        if (activeUser) {
            return;
        }
        const storedUser = localStorage.getItem(ACTIVE_USER_STORAGE);
        const userObj = JSON.parse(storedUser);
        if (userObj) {
            setShowLoginModal(false);
            setActiveUser(userObj);
        }
    }

    const authenticate = (user) => {
        setShowLoginModal(false);
        setActiveUser(user);
        localStorage.setItem(ACTIVE_USER_STORAGE, JSON.stringify(user));
    }

    const pages = {
        [postList]:
            <PostList
                openPost={openPost}
                profileId={activeUser?.id}
                posts={posts}
                activeUser={activeUser}
                deletePostsFromPostList={deletePostsFromPostList}
                openPostEditForm={openPostEditForm}
                get={get}
            />,
        [postPage]:
            <PostPage
                activePost={activePostData}
                openHome={openHome}
                activeUser={activeUser}
                profileId={activeUser?.id}
                get={get}
                users={users}
                deletePostsFromPostList={deletePostsFromPostList}
                openPostEditForm={openPostEditForm}
            />,
        [addPost]:
            <AddPost
                activeUser={activeUser}
                submitNewPosts={submitNewPosts}
                postsLength={posts.length}
            />,
        [editPostPage]:
            <AddPost
                post={postToEdit}
                editPost={editPost}
            />
    };

    return (
        <Grommet>
            <div>
                <Menu
                    onClickLogin={onClickLogin}
                    onClickHome={onClickHome}
                    activeUser={activeUser}
                    logout={logout}
                    onClickAddPost={onClickAddPost}
                    users={users}
                />
                {
                    pages[activePage]
                }
                {showLoginModal &&
                    <Login
                        onClickClose={onClickClose}
                        authenticate={authenticate}
                        users={users}
                    />
                }
                {activePage === postList &&
                    <Footer background="dark-1" pad="medium">
                        <Text>© 2021</Text>
                        <Anchor icon={<Github />} hoverIndicator />
                    </Footer>
                }
            </div>
        </Grommet>
    );
}

export default App;
