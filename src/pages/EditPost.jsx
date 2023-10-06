import React, { useEffect, useState } from 'react'
import { BlogForm } from '../components';
import { useNavigate, useParams } from 'react-router-dom';
import service from '../appwrite/blogs';

const EditPost = () => {
    const [post, setPost] = useState();
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                }
            })
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    return post ? <div><BlogForm post={post}></BlogForm></div> : null;
}

export default EditPost;