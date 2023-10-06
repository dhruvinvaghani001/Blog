import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

const RTE = ({ name, control, label, defaultValue = "" ,mainstyle }) => {
    return (
        <div className={`${mainstyle}`}>
            {label && <label className='inline-block mb-1 pl-1 text-lg xl:text-md font-semibold text-grey-600'>{label}
            </label>}
            <Controller
                name={name || 'content'}
                control={control}
                render={({ field: { onChange } }) =>
                (<Editor
                    initialValue={defaultValue}
                    init={{
                        initialValue: defaultValue,
                        height: 500,
                        plugins: [
                            "image", "advlist", "autolink", "lists", "link", "image", "charmap", "preview", "anchor", "searchreplace", "visualblocks", "code", "fullscreen", "insertdatetime", "media", "table", "help", "wordcount", "anchor",
                        ],
                        toolbar: 'undo redo | formatselect | ' +
                            'bold italic backcolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                    onEditorChange={onChange}
                />)}
            />
        </div>
    )
}


export default RTE;