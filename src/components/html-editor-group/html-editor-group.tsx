import React from 'react'

import { Editor } from '@tinymce/tinymce-react'

import Styles from './html-editor-group.module.scss'

type Props = any & { label: string }

const HtmlEditorGroup: React.FC<Props> = (props: Props) => {
  return (
    <div className={Styles.htmlEditorGroup}>
      <label> {props.label} </label>
      <Editor
      {...props}
      apiKey="l495arr170j5145uahyi08uteva47d4zgqgha0ex0cya9g6e"
      // initialValue="<p style='font-size: 13px; color: #adbac7'>Escreva aqui o conteúdo do artigo...</p>"
      init={{
        skin: 'oxide-dark',
        content_css: 'dark',
        resize: true,
        height: 300,
        menubar: true,
        image_caption: true,
        a11y_advanced_options: true,
        plugins: [
          'advlist autolink lists link image imagetools charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount',
          'autosave emoticons hr'
        ],
        toolbar: 'undo redo | bold italic underline strikethrough | fontselect | fontsizeselect | formatselect | forecolor backcolor removeformat | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent | charmap emoticons | image media table | codesample link anchor| hr | help',
        toolbar_sticky: true,
        toolbar_mode: 'sliding',
        image_title: true,
        automatic_uploads: true,
        file_picker_types: 'file image media',
        file_picker_callback: function (cb, value, meta) {
          const input = document.createElement('input')
          input.setAttribute('type', 'file')
          input.setAttribute('accept', 'image/*')

          /*
            Note: In modern browsers input[type="file"] is functional without
            even adding it to the DOM, but that might not be the case in some older
            or quirky browsers like IE, so you might want to add it to the DOM
            just in case, and visually hide it. And do not forget do remove it
            once you do not need it anymore.
          */

          input.onchange = function () {
            // const file = this.files[0]

            const reader = new FileReader()
            reader.onload = function () {
              /*
                Note: Now we need to register the blob in TinyMCEs image blob
                registry. In the next release this part hopefully won't be
                necessary, as we are looking to handle it internally.
              */
              // const id = `blobid ${(new Date()).getTime()}`
              // const blobCache = activeEditor.editorUpload.blobCache
              // const base64 = reader.result.split(',')[1]
              // const blobInfo = blobCache.create(id, file, base64)
              // blobCache.add(blobInfo)

              /* call the callback and populate the Title field with the file name */
              // cb(blobInfo.blobUri(), { title: file.name })
            }
            // reader.readAsDataURL(file)
          }

          input.click()
        },
        content_style: 'body { background-color: #373e48; color: #cdd9e5; font-family: "Poppins", sans-serif; font-size:16px }'
      }} />
    </div>

  )
}

export default HtmlEditorGroup
