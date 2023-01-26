import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Upload } from 'antd';
import './upload.css';

const { Dragger } = Upload;

export const UploadFile: React.FC<UploadProps & { fileType: string }> = (props) => (
  <div className='flex'>
    <Dragger {...props} className='grow mb-1'>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Click or drag a {props.fileType} file to this area to upload</p>
    </Dragger>
  </div>
);