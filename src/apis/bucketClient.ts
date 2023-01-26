import { message } from 'antd';
import { supabase } from './supabaseClient';

export const fetchFromBucket = async (bucketName: string, path: string) => {
    try {
      const { data, error } = await supabase.storage.from(bucketName).download(path);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      return { data, url };
    } catch (error: any) {
      message.error(`Error downloading file: ${error.message}`);
    }
  };