import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import service from '../appwrite/blogs';
import { useSelector } from 'react-redux';
import parse from 'html-react-parser';
import { Button } from '../components';

const Post = (props) => {
    const [post, setPost] = useState();
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

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

    const deletePost = () => {
        const proced = confirm("Are you sure want to delete ?")
        if (proced) {
            service.deleteFile(post.featuredImage);
            service.deletePost(post.$id);
            navigate("/");
        }
    }


    if (post) {
        return (<div className="max-w-screen-lg mx-auto px-12 lg:px-0">
            <main className="mt-10 flex flex-col justify-start">
                {isAuthor && <div className='w-full flex flex-row gap-4 justify-end'>
                    <Link to={`/editpost/${post.$id}`}><Button className="text-whitelue-700 text-white text-md font-semibold mb-5 uppercase bg-primary ">Edit</Button></Link>
                    <Button onClick={deletePost} className="text-whitelue-700 text-white text-md font-semibold mb-5 uppercase bg-red-500 ">Delete</Button>

                </div>}

                <div className="mb-4 md:mb-0 w-full mx-auto relative gap-6">
                    <div className="px-0 py-2">
                        <h2 className="text-4xl font-semibold text-gray-800 leading-tight">
                            {post.title}
                        </h2>
                    </div>

                    <img src={service.getFilePreview(post.featuredImage)} alt={post.title} className="w-full object-cover lg:rounded" />
                </div>

                <div className="flex flex-col lg:flex-row lg:space-x-12">

                    <div className="px-0 lg:px-0 mt-12 text-gray-700 text-lg leading-relaxed w-full lg:w-full">
                        {parse(post.content)}


                    </div>
                </div>
            </main>
        </div>)
    }

    return (
        <div>
            post not found
        </div>
    )
}

export default Post