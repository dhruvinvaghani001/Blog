import React from 'react'
import service from '../appwrite/blogs';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
    return (
        <Link to={`/post/${post.$id}`}>
            <div className="max-w-sm rounded overflow-hidden shadow-lg bg-newwhite duration-300 hover:scale-150" >
                <div className="img h-60 w-full">
                    <img className="w-full object-cover h-full"  src={service.getFilePreview(post.featuredImage)} alt={post.title} />
                </div>

                <div className="px-6 py-4 shadow-lg">
                    <div className="font-bold text-xl mb-2">{post.title}</div>
                    <p className="text-gray-700 text-base">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Solut enim! Accusamus voluptas a exercitationem mollitia!
                    </p>
                </div>
            </div>
        </Link>
    )
}

export default PostCard;