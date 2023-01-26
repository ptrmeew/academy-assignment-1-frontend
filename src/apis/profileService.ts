import { User } from '@supabase/supabase-js';
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
      message.error(`Error downloading image: ${error.message}`);
    }
  };

export const fetchProfile = async (user: User) => {
    try {
      const { data, error, status } = await supabase
        .from('profile')
        .select('first_name, last_name, age, avatar_path')
        .eq('id', user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        // TODO: automate mapping beetween snake and camelCase
        const { first_name: firstName, last_name: lastName, age, avatar_path: avatarPath } = data;
        return { firstName, lastName, age, avatarPath };
        //if (avatarPath) await downloadImage(avatarPath);
      }
      
    } catch (error: any) {
      message.error(error.message);
    };
  };

