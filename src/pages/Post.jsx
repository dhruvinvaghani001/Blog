import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import service from '../appwrite/blogs';
import { useSelector } from 'react-redux';
import parse from 'html-react-parser';
import { Button, Loading } from '../components';
import categorySerive from '../appwrite/category';

const Post = (props) => {
    const [post, setPost] = useState();
    const [loading, setLoading] = useState(true);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    const categories = useSelector((state) => state.category.categories);
    const { name: category } = { ...categories.filter((iteam) => iteam.$id === post?.categoryId)[0] }
    
    console.log("post",post);

    useEffect(() => {
        setLoading(true)
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



    const deletePost = () => {
        const proced = confirm("Are you sure want to delete ?")
        if (proced) {
            service.deleteFile(post.featuredImage);
            service.deletePost(post.$id);
            navigate("/");
        }
    }

    if (loading) {
        return <div className='w-full h-[500px] flex justify-center items-center'><Loading /></div>
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

                    <div className="tag my-8">
                        <span className='px-4 py-2 rounded-md bg-violet-500 uppercase text-white font-bold text-md inline text-center items-center tracking-normal'>{category}</span>
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