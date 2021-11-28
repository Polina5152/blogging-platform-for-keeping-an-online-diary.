import { useState } from 'react';

import {
  Button,
} from "grommet";
import { Favorite } from "grommet-icons";

const LikeButton = props => {
  const {
    idPost,
    usersLiked,
    userId,
    activeUser,
    get,
  } = props;

  const [usersLikedList, setUsersLikedList] = useState(usersLiked);

  const likeClickHandler = async (event) => {
    event.stopPropagation();
    if (activeUser) {
      if (usersLikedList.includes(userId)) {
        const usersWithoutId = (usersLikedList => usersLikedList !== userId);
        const newLikeList = usersLikedList.filter(usersWithoutId);
        const url = `http://localhost:5000/posts/${idPost}`;
        const res = await fetch(url, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({ usersLiked: newLikeList })
        });
        if (res.ok) {
          setUsersLikedList(newLikeList);
          get();
        }
      }
      else {
        const newLikeList = [...usersLikedList, userId];
        const url = `http://localhost:5000/posts/${idPost}`;
        const res = await fetch(url, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({ usersLiked: newLikeList })
        });
        if (res.ok) {
          setUsersLikedList(newLikeList);
          get();
        }
      }
    }
  }

  return (
    <div>
      <Button
        onClick={likeClickHandler}
        icon={
          activeUser && usersLikedList.includes(userId) === true ? (
            <Favorite color='red' />
          ) : (
            <Favorite color='brand' />
          )
        }
        label={usersLikedList.length}
        plain
      />
    </div>
  )
}

export default LikeButton;