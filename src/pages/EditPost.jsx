import React, { useEffect, useState } from 'react'
import { BlogForm, Loading } from '../components';
import { useNavigate, useParams } from 'react-router-dom';
import service from '../appwrite/blogs';

const EditPost = () => {
    const [post, setPost] = useState();
    const [loading, setLoading] = useState(true);

    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                    setLoading(false);
                }
            })
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    if (loading) {
        return <div className='w-full h-[500px] flex justify-center items-center'><Loading /></div>
    }

    return post ? <div><BlogForm post={post}></BlogForm></div> : null;
}

export default EditPost;