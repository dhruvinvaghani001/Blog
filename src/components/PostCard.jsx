import React, { useEffect, useState } from 'react'
import service from '../appwrite/blogs';
import { Link } from 'react-router-dom';
import categorySerive from '../appwrite/category';

const PostCard = ({ post }) => {
    const [category, setCategory] = useState();
    useEffect(() => {
        if (post) {
            categorySerive.getCategory(post.categoryId).then((data) => {
                setCategory(data.name)
            })
        }
    }, []);

    const date = new Date(post.$createdAt)
    const formatedDate = date.toLocaleString('en-IN', { month: "long", day: "2-digit", year: "numeric" });

    return (
        <Link to={`/post/${post.$id}`}>
            <div className="max-w-sm rounded-md overflow-hidden shadow-lg bg-newwhite duration-300  hover:scale-105 hover:drop-shadow-2xl" >
                <div className="img h-60 w-full">
                    <img className="w-full object-cover h-full" src={service.getFilePreview(post.featuredImage)} alt={post.title} />
                </div>

                <div className="px-6 py-4 shadow-lg">
                    <div className="font-bold text-xl mb-2">{post.title}</div>
                    <div className="tag my-8">
                        <span className='px-2 py-2 rounded-md bg-violet-500 uppercase text-white font-bold text-sm inline text-center items-center tracking-normal'>{category}</span>
                    </div>
                    <p className="text-gray-700 text-md mb-2 font-semibold tracking-wider">
                        {formatedDate}
                    </p>
                </div>
            </div>
        </Link>
    )
}

export default PostCard;