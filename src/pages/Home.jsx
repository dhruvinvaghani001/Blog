import React, { useEffect, useState } from 'react'
import service from '../appwrite/blogs'
import { PostCard } from '../components'


const Home = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        service.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        })
        console.log(posts);
    },[]);

    if (posts.length === 0) {
        return <h1>Loin to read post</h1>
    }

    return (
        <div className=''>
            {posts && 
            <div className='w-full p-8'>
                <div className="flex justify-center">
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
            </div>}
        </div>
    )
}

export default Home