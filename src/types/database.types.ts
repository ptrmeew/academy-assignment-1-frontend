export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      ios_subscription: {
        Row: {
          auto_renew_product_id: string | null
          expires_date_ms: string
          id: string
          original_transaction_id: string
          product_id: string | null
          will_auto_renew: boolean
        }
        Insert: {
          auto_renew_product_id?: string | null
          expires_date_ms: string
          id?: string
          original_transaction_id: string
          product_id?: string | null
          will_auto_renew: boolean
        }
        Update: {
          auto_renew_product_id?: string | null
          expires_date_ms?: string
          id?: string
          original_transaction_id?: string
          product_id?: string | null
          will_auto_renew?: boolean
        }
      }
      permission: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
      }
      product_description: {
        Row: {
          product_id: string
        }
        Insert: {
          product_id: string
        }
        Update: {
          product_id?: string
        }
      }
      profile: {
        Row: {
          age: number
          avatar_path: string | null
          first_name: string
          id: string
          ios_subscription_fk: string | null
          last_name: string
          subscription_active: boolean
        }
        Insert: {
          age: number
          avatar_path?: string | null
          first_name: string
          id?: string
          ios_subscription_fk?: string | null
          last_name: string
          subscription_active?: boolean
        }
        Update: {
          age?: number
          avatar_path?: string | null
          first_name?: string
          id?: string
          ios_subscription_fk?: string | null
          last_name?: string
          subscription_active?: boolean
        }
      }
      profile_role_junction: {
        Row: {
          profile_fk: string
          role_fk: string
        }
        Insert: {
          profile_fk: string
          role_fk: string
        }
        Update: {
          profile_fk?: string
          role_fk?: string
        }
      }
      role: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
      }
      role_permission_junction: {
        Row: {
          permission_fk: string
          role_fk: string
        }
        Insert: {
          permission_fk: string
          role_fk: string
        }
        Update: {
          permission_fk?: string
          role_fk?: string
        }
      }
      subscription_notification: {
        Row: {
          id: string
          ios_subscription_fk: string | null
          subtype: string | null
          timestamp: string
          type: string
        }
        Insert: {
          id?: string
          ios_subscription_fk?: string | null
          subtype?: string | null
          timestamp: string
          type: string
        }
        Update: {
          id?: string
          ios_subscription_fk?: string | null
          subtype?: string | null
          timestamp?: string
          type?: string
        }
      }
      test: {
        Row: {
          active: boolean
          first_name: string
          id: number
          last_name: string
          weight: number
        }
        Insert: {
          active?: boolean
          first_name: string
          id?: number
          last_name: string
          weight: number
        }
        Update: {
          active?: boolean
          first_name?: string
          id?: number
          last_name?: string
          weight?: number
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_permission: {
        Args: { p_permission_name: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
