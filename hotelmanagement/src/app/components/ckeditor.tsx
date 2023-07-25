// NOTE: Use the editor from source (not a build)!
import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic'
import { Essentials } from '@ckeditor/ckeditor5-essentials'
import { Autoformat } from '@ckeditor/ckeditor5-autoformat'
import { Bold, Italic, Strikethrough, Subscript, Superscript, Underline } from '@ckeditor/ckeditor5-basic-styles'
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote'
import { Heading } from '@ckeditor/ckeditor5-heading'
import { Link, LinkImage } from '@ckeditor/ckeditor5-link'
import { List, ListProperties, TodoList } from '@ckeditor/ckeditor5-list'
import { Paragraph } from '@ckeditor/ckeditor5-paragraph'
import { Alignment } from '@ckeditor/ckeditor5-alignment'
import {
  AutoImage,
  Image,
  ImageCaption,
  ImageInsert,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload
} from '@ckeditor/ckeditor5-image'
import AutoLink from '@ckeditor/ckeditor5-link/src/autolink'
import { Autosave } from '@ckeditor/ckeditor5-autosave'
import Base64UploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter'
import { CloudServices } from '@ckeditor/ckeditor5-cloud-services'
import Code from '@ckeditor/ckeditor5-basic-styles/src/code'
import { CodeBlock } from '@ckeditor/ckeditor5-code-block'
import DataFilter from '@ckeditor/ckeditor5-html-support/src/datafilter'
import DataSchema from '@ckeditor/ckeditor5-html-support/src/dataschema'
import { FindAndReplace } from '@ckeditor/ckeditor5-find-and-replace'
import FontBackgroundColor from '@ckeditor/ckeditor5-font/src/fontbackgroundcolor'
import FontColor from '@ckeditor/ckeditor5-font/src/fontcolor'
import FontSize from '@ckeditor/ckeditor5-font/src/fontsize'
import { GeneralHtmlSupport, HtmlComment } from '@ckeditor/ckeditor5-html-support'
import { Highlight } from '@ckeditor/ckeditor5-highlight'
import { HorizontalLine } from '@ckeditor/ckeditor5-horizontal-line'

import { HtmlEmbed } from '@ckeditor/ckeditor5-html-embed'

import { Indent, IndentBlock } from '@ckeditor/ckeditor5-indent'

import { Markdown } from '@ckeditor/ckeditor5-markdown-gfm'
import { MediaEmbed, MediaEmbedToolbar } from '@ckeditor/ckeditor5-media-embed'

import { Mention } from '@ckeditor/ckeditor5-mention'
import { PageBreak } from '@ckeditor/ckeditor5-page-break'
import { PasteFromOffice } from '@ckeditor/ckeditor5-paste-from-office'
import { RemoveFormat } from '@ckeditor/ckeditor5-remove-format'
import { SelectAll } from '@ckeditor/ckeditor5-select-all'
import { ShowBlocks } from '@ckeditor/ckeditor5-show-blocks'
import { SourceEditing } from '@ckeditor/ckeditor5-source-editing'
import {
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersEssentials,
  SpecialCharactersLatin,
  SpecialCharactersMathematical,
  SpecialCharactersText
} from '@ckeditor/ckeditor5-special-characters'

import { Style } from '@ckeditor/ckeditor5-style'

import { Table, TableCaption, TableColumnResize, TableProperties, TableToolbar } from '@ckeditor/ckeditor5-table'

import TableCellProperties from '@ckeditor/ckeditor5-table/src/tablecellproperties'

import { TextPartLanguage } from '@ckeditor/ckeditor5-language'
import { TextTransformation } from '@ckeditor/ckeditor5-typing'

import { WordCount } from '@ckeditor/ckeditor5-word-count'

import React from 'react'

import { CKEditor } from '@ckeditor/ckeditor5-react'
const editorConfiguration = {
  placeholder: 'Hello from CKEditor 5!',
  // The plugins are now passed directly to .create().
  plugins: [
    Alignment,
    AutoImage,
    Autoformat,
    AutoLink,
    Autosave,
    Base64UploadAdapter,
    BlockQuote,
    Bold,
    CloudServices,
    Code,
    CodeBlock,
    DataFilter,
    DataSchema,
    Essentials,
    FindAndReplace,
    FontBackgroundColor,
    FontColor,
    FontSize,
    GeneralHtmlSupport,
    Heading,
    Highlight,
    HorizontalLine,
    HtmlComment,
    HtmlEmbed,
    Image,
    ImageCaption,
    ImageInsert,
    ImageResize,
    ImageStyle,
    ImageToolbar,
    ImageUpload,
    Indent,
    IndentBlock,
    Italic,
    Link,
    LinkImage,
    List,
    ListProperties,
    Markdown,
    MediaEmbed,
    MediaEmbedToolbar,
    Mention,
    PageBreak,
    Paragraph,
    PasteFromOffice,
    RemoveFormat,
    SelectAll,
    ShowBlocks,
    SourceEditing,
    SpecialCharacters,
    SpecialCharactersArrows,
    SpecialCharactersEssentials,
    SpecialCharactersLatin,
    SpecialCharactersMathematical,
    SpecialCharactersText,
    Strikethrough,
    Style,
    Subscript,
    Superscript,
    Table,
    TableCaption,
    TableCellProperties,
    TableColumnResize,
    TableProperties,
    TableToolbar,
    TextPartLanguage,
    TextTransformation,

    TodoList,
    Underline,
    WordCount
  ],
  htmlSupport: {
    allow: [
      {
        name: /^.*$/,
        styles: true,
        attributes: true,
        classes: true
      }
    ]
  },

  toolbar: {
    items: [
      'heading',
      '|',
      'bold',
      'italic',
      'link',
      'bulletedList',
      'numberedList',
      '|',
      'outdent',
      'indent',
      '|',
      'imageUpload',
      'blockQuote',
      'insertTable',
      'mediaEmbed',
      'undo',
      'redo',
      'alignment',
      'code',
      'codeBlock',
      'fontBackgroundColor',
      'fontColor',
      'findAndReplace',
      'fontSize',
      'highlight',
      'horizontalLine',
      'htmlEmbed',
      'imageInsert',
      'pageBreak',
      'removeFormat',
      'selectAll',
      'showBlocks',
      'sourceEditing',
      'specialCharacters',
      'strikethrough',
      'style',
      'subscript',
      'superscript',
      'textPartLanguage',
      'todoList',
      'underline'
    ]
  },
  language: 'vi',
  image: {
    toolbar: [
      'imageTextAlternative',
      'toggleImageCaption',
      'imageStyle:inline',
      'imageStyle:block',
      'imageStyle:side',
      'linkImage'
    ]
  },
  table: {
    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableCellProperties', 'tableProperties']
  }
}

interface CKEditorProps {
  onContentChange(value: string): void
}

const CkEditor: React.FC<CKEditorProps> = ({ onContentChange }) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      config={editorConfiguration}
      onReady={(editor) => {
        // You can store the "editor" and use when it is needed.
        console.log('Editor is ready to use!', editor)
      }}
      onChange={(event, editor) => {
        const data = editor.getData()
        onContentChange(data)
        console.log(data)
        console.log({ event, editor, data })
      }}
      onBlur={(event, editor) => {
        console.log('Blur.', editor)
      }}
      onFocus={(event, editor) => {
        console.log('Focus.', editor)
      }}
      onError={(event, details) => {
        console.log('Error.', details)
      }}
    />
  )
}

export default CkEditor
