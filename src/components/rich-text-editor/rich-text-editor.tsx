import React from 'react';
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";

import "./rich-text-editor.css";

type Props = {
    value: string;
    onChangeValue: (content: string) => void;
};

const RichTextEditor: React.FC<Props> = (props: Props) => {

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ size: [] }],
            // [{ font: [] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ align: ["right", "center", "justify"] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            [{ color: ["red", "#785412"] }],
            [{ background: ["red", "#785412"] }]
        ]
    };

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "link",
        "color",
        "image",
        "background",
        "align",
        "size",
        "font"
    ];

    return (
        <div className='rich_text_editor'>
            <ReactQuill
                theme="snow"
                modules={modules}
                formats={formats}
                value={props.value}
                onChange={props.onChangeValue}
                placeholder='Digite o conteúdo do artigo...'
            />
        </div>

    );
}

export default RichTextEditor;