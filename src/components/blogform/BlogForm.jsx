import React, { useCallback, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../Button';
import Select from '../Select';
import Input from '../Input';
import RTE from '../RTE';
import service from '../../appwrite/blogs';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { DevTool } from '@hookform/devtools';


const BlogForm = ({ post }) => {
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const selectref = useRef(null);
    const categoryref = useRef(null);

    const category = useSelector((state) => state.category.categories);
    const categoryOptions = category?.map((iteam) => ({ name: iteam.name, id: iteam.$id }));

    const form = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.$id || '',
            content: post?.content || '',
            status: post?.status || "active",
        }
    })
    const { register, control, handleSubmit, formState, watch, getValues, setValue } = form;
    const { errors: formErrors } = formState;

    const submit = async (data) => {
        // if post is there then we have to edit from page
        const status = selectref.current.value;
        const categoryId = categoryref.current.value;
        if (post) {
            const file = data.image[0] ? await service.uploadFile(data.image[0]) : null;

            if (file) {
                await service.deleteFile(post.featuredImage);
            }
            const dbpost = await service.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
                status: status,
                categoryId
            })
            if (dbpost) {
                navigate("/")
            }
        }
        //if post not there then we have to create post 
        else {
            const file = data.image[0] ? await service.uploadFile(data.image[0]) : null;
            if (file) {
                const dbpost = await service.createPost({
                    ...data,
                    status,
                    slug: data.slug,
                    featuredImage: file.$id,
                    userId: userData.$id,
                    categoryId
                })
                if (dbpost) {
                    navigate("/");
                }
            }
        }

    }

    const slugTransForm = useCallback((value) => {
        if (value && typeof value === 'string') {
            const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            return slug.replace(/^-+|-+$/g, '');

        }
        return '';
    });

    useEffect(() => {
        const subcription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransForm(value.title, { shouldValidate: true }));
            }
        });

    }, [watch, slugTransForm, setValue])


    return (
        <div className='flex justify-center items-center mt-20 w-full'>

            <form className='w-3/4 p-6 bg-newwhite relative rounded-lg' onSubmit={handleSubmit(submit)}>

                <div className="heding block items-center flex-col w-full mb-10 ">
                    <h1 className='text-4xl font-bold mb-3 text-gray-900 uppercase tracking-wide'>{post ? 'Edit Post' : 'Create Post'}</h1>
                </div>
                <div className="gap-6 flex-col xl:flex xl:flex-row 2xl:flex 2xl:flex-row">
                    <div className='md:w-full lg:w-full xl:w-2/4'>
                        <div className="mb-6">
                            <Input
                                label="Title"
                                type="text"
                                className='px-3 py-3'
                                placeholder='Enter your title'
                                {...register("title", {
                                    required: {
                                        value: true,
                                        message: 'Please enter title'
                                    }
                                })}
                            />
                            {formErrors.title && <p role="alert" className='text-red-600 mt-1'>{formErrors.title.message}</p>}
                        </div>
                        <div className="mb-6">
                            <Input
                                label="slug"
                                type="text"
                                className='px-3 py-3'
                                {...register("slug", {
                                    required: {
                                        value: true,
                                        message: 'Please enter slug'
                                    }
                                })}
                                onInput={(e) => {
                                    setValue("slug", slugTransForm(e.target.value, { shouldValidate: true }))
                                }}
                            />
                            {formErrors.slug && <p role="alert" className='text-red-600 mt-1'>{formErrors.slug.message}</p>}
                        </div>
                        <div className="mb-6 ">
                            <Select ref={selectref} status={post?.status} options={["active", "inactive"]} label="status"></Select>
                            {formErrors.select && <p role="alert" className='text-red-600 mt-1'>{formErrors.select.message}</p>}
                        </div>
                        <div className="mb-6 ">
                            <Select ref={categoryref} category={post?.categoryId} options={categoryOptions} label="Category"></Select>
                            {formErrors.image && <p role="alert" className='text-red-600 mt-1'>{formErrors.image.message}</p>}
                        </div>
                    </div>
                    <div className='md:w-full lg:w-full xl:w-2/4'>
                        <div className="mb-6">
                            <Input
                                label="Featured image"
                                type="file"
                                isFile
                                accept="image/png ,image/jpeg ,image/gif , image/jpg"
                                className='px-3 py-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none'
                                {...register("image", { required: !post })}
                            />
                            {formErrors.image && <p role="alert" className='text-red-600 mt-1'>{formErrors.image.message}</p>}
                        </div>

                    </div>
                </div>

                {!post && <div className='mb-6 w-full'>
                    <RTE control={control} mainstyle="w-full xl:w-1/2" name="content" label="Content" defaultValue={getValues("content")} />
                </div>}
                {
                    post && <div className="flex gap-6 w-full">
                        <div className='mb-6 w-1/2'>
                            <RTE control={control} className="w-full" name="content" label="Content" defaultValue={getValues("content")} />
                        </div>
                        <div className='mt-[33px] mb-6 w-1/2'>
                            <img src={service.getFilePreview(post.featuredImage)} className='rounded-lg' alt={post.title} />
                        </div>

                    </div>
                }
                <Button type="submit" className="text-whitelue-700 text-white text-md font-semibold mb-5 uppercase bg-primary sm:w-full lg:w-full xl:w-2/4">{post ? 'Edit Post' : 'Create Post'}</Button>


            </form>
            <DevTool control={control}></DevTool>
        </div>
    )
}

export default BlogForm;