import React, { useEffect, useState } from 'react'
import service from '../appwrite/blogs'
import { Loading, PostCard } from '../components';
import { Link } from 'react-router-dom';

const AllPost = () => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        service.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents);
                setLoading(false);
            }
        })
    }, []);

    if (loading) {
        return <div className='w-full h-[500px] flex justify-center items-center'><Loading /></div>
    }

    return (
        <div className='w-full p-8 flex flex-col justify-start mt-10'>
            <div className="w-full flex justify-center">
                <div className="gap-12 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1">
                    {
                        posts.map((post) => (
                            <div className='p-2' key={post.$id}>
                                <PostCard post={post}></PostCard>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default AllPost