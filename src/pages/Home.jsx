import React, { useEffect, useState } from 'react'
import service from '../appwrite/blogs'
import { Loading, PostCard } from '../components'
import categorySerive from '../appwrite/category';
import { useDispatch, useSelector } from 'react-redux';
import { loadCategory } from '../store/categorySlice';
import { Link } from 'react-router-dom';


const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true); ''
    const [category, setCategory] = useState([]);
    const dispatch = useDispatch();

    const userData = useSelector((state) => state.auth.status);
    console.log(userData);
    useEffect(() => {
        if(!userData){
            setLoading(false);
        }
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

    if (!userData) {

        return <section class="mb-40 bg-newwhite h-full">
            <div class="bg-bgprimary py-24 px-6 text-center ">
                <h1 class="mt-2 mb-16 text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl">
                    Your Gateway to Knowledge and Inspiration <br /><span class="text-primary">Explore, Learn, Inspire</span>
                </h1>
                <Link to="/login" class="mb-2 inline-block rounded bg-primary px-12 pt-4 pb-3.5 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] "
                    data-te-ripple-init data-te-ripple-color="light" href="#!" role="button">Get started</Link>
                <a class="inline-block rounded px-12 pt-4 pb-3.5 text-sm font-medium uppercase leading-normal text-primary"
                    data-te-ripple-init data-te-ripple-color="light" href="#!" role="button">Learn more</a>
            </div>
        </section>
    }

    return (
        <div className=''>
            {posts &&
                <div className='w-full p-8 mt-10'>
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