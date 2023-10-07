import React, { useEffect, useState } from 'react'
import service from '../appwrite/blogs';
import { Loading, PostCard } from '../components';
import { useSelector } from 'react-redux';

const Admin = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const userData = useSelector((state) => state.auth.userData);


    useEffect(() => {
        service.getUserPosts(userData.$id).then((posts) => {
            if (posts) {
                setPosts(posts.documents);
                setLoading(false);
            }
        })
    }, []);

    if (loading) {
        return <div className='w-full h-[500px] flex justify-center items-center'><Loading /></div>
    }

    if (posts.length === 0) {
        return <div className='w-full h-[500px] p-8 flex justify-center items-center'>
            <h1 className='text-[32px] font-semibold'>Apologies, but it seems you haven't made a post</h1>
        </div>
    }

    return (
        <div className='w-full p-8'>
            <div className="w-full flex justify-center">
                <div className="gap-12 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1">
                    {
                        posts.map((post) => (
                            <div className='p-2' key={post.$id}>
                                <PostCard isAdmin={true} post={post}></PostCard>
                            </div>
                        ))
                    }


                </div>

            </div>
        </div>
    )
}

export default Admin;