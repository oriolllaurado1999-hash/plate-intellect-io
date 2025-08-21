export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      coach_preferences: {
        Row: {
          created_at: string
          forbidden_words: string[] | null
          id: string
          tone_style: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          forbidden_words?: string[] | null
          id?: string
          tone_style?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          forbidden_words?: string[] | null
          id?: string
          tone_style?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      daily_coach_messages: {
        Row: {
          created_at: string
          id: string
          is_read: boolean
          message_content: string
          message_date: string
          message_preview: string
          message_type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean
          message_content: string
          message_date?: string
          message_preview: string
          message_type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean
          message_content?: string
          message_date?: string
          message_preview?: string
          message_type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      food_items: {
        Row: {
          barcode: string | null
          brand: string | null
          calories_per_100g: number
          carbs_per_100g: number | null
          created_at: string
          fat_per_100g: number | null
          fiber_per_100g: number | null
          id: string
          name: string
          protein_per_100g: number | null
          sodium_per_100g: number | null
          sugar_per_100g: number | null
          updated_at: string
        }
        Insert: {
          barcode?: string | null
          brand?: string | null
          calories_per_100g: number
          carbs_per_100g?: number | null
          created_at?: string
          fat_per_100g?: number | null
          fiber_per_100g?: number | null
          id?: string
          name: string
          protein_per_100g?: number | null
          sodium_per_100g?: number | null
          sugar_per_100g?: number | null
          updated_at?: string
        }
        Update: {
          barcode?: string | null
          brand?: string | null
          calories_per_100g?: number
          carbs_per_100g?: number | null
          created_at?: string
          fat_per_100g?: number | null
          fiber_per_100g?: number | null
          id?: string
          name?: string
          protein_per_100g?: number | null
          sodium_per_100g?: number | null
          sugar_per_100g?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      meal_items: {
        Row: {
          calories: number
          carbs: number | null
          confidence: number | null
          created_at: string
          fat: number | null
          fiber: number | null
          food_item_id: string | null
          food_name: string
          id: string
          meal_id: string
          protein: number | null
          quantity: number
          updated_at: string
        }
        Insert: {
          calories: number
          carbs?: number | null
          confidence?: number | null
          created_at?: string
          fat?: number | null
          fiber?: number | null
          food_item_id?: string | null
          food_name: string
          id?: string
          meal_id: string
          protein?: number | null
          quantity: number
          updated_at?: string
        }
        Update: {
          calories?: number
          carbs?: number | null
          confidence?: number | null
          created_at?: string
          fat?: number | null
          fiber?: number | null
          food_item_id?: string | null
          food_name?: string
          id?: string
          meal_id?: string
          protein?: number | null
          quantity?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "meal_items_food_item_id_fkey"
            columns: ["food_item_id"]
            isOneToOne: false
            referencedRelation: "food_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meal_items_meal_id_fkey"
            columns: ["meal_id"]
            isOneToOne: false
            referencedRelation: "meals"
            referencedColumns: ["id"]
          },
        ]
      }
      meals: {
        Row: {
          ai_analyzed: boolean | null
          ai_confidence: number | null
          created_at: string
          id: string
          image_url: string | null
          meal_date: string
          meal_type: string
          name: string
          total_calories: number | null
          total_carbs: number | null
          total_fat: number | null
          total_fiber: number | null
          total_protein: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          ai_analyzed?: boolean | null
          ai_confidence?: number | null
          created_at?: string
          id?: string
          image_url?: string | null
          meal_date?: string
          meal_type: string
          name: string
          total_calories?: number | null
          total_carbs?: number | null
          total_fat?: number | null
          total_fiber?: number | null
          total_protein?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          ai_analyzed?: boolean | null
          ai_confidence?: number | null
          created_at?: string
          id?: string
          image_url?: string | null
          meal_date?: string
          meal_type?: string
          name?: string
          total_calories?: number | null
          total_carbs?: number | null
          total_fat?: number | null
          total_fiber?: number | null
          total_protein?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          activity_level: string | null
          age: number | null
          avatar_url: string | null
          carbs_goal: number | null
          created_at: string
          daily_calorie_goal: number | null
          daily_step_goal: number | null
          date_of_birth: string | null
          display_name: string | null
          fat_goal: number | null
          fiber_goal: number | null
          gender: string | null
          goal_type: string | null
          goal_weight: number | null
          height: number | null
          id: string
          protein_goal: number | null
          updated_at: string
          user_id: string
          weight: number | null
        }
        Insert: {
          activity_level?: string | null
          age?: number | null
          avatar_url?: string | null
          carbs_goal?: number | null
          created_at?: string
          daily_calorie_goal?: number | null
          daily_step_goal?: number | null
          date_of_birth?: string | null
          display_name?: string | null
          fat_goal?: number | null
          fiber_goal?: number | null
          gender?: string | null
          goal_type?: string | null
          goal_weight?: number | null
          height?: number | null
          id?: string
          protein_goal?: number | null
          updated_at?: string
          user_id: string
          weight?: number | null
        }
        Update: {
          activity_level?: string | null
          age?: number | null
          avatar_url?: string | null
          carbs_goal?: number | null
          created_at?: string
          daily_calorie_goal?: number | null
          daily_step_goal?: number | null
          date_of_birth?: string | null
          display_name?: string | null
          fat_goal?: number | null
          fiber_goal?: number | null
          gender?: string | null
          goal_type?: string | null
          goal_weight?: number | null
          height?: number | null
          id?: string
          protein_goal?: number | null
          updated_at?: string
          user_id?: string
          weight?: number | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          created_at: string
          expiry_date: string | null
          id: string
          is_active: boolean
          original_transaction_id: string | null
          platform: string
          product_id: string
          receipt_data: string | null
          transaction_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          expiry_date?: string | null
          id?: string
          is_active?: boolean
          original_transaction_id?: string | null
          platform: string
          product_id: string
          receipt_data?: string | null
          transaction_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          expiry_date?: string | null
          id?: string
          is_active?: boolean
          original_transaction_id?: string | null
          platform?: string
          product_id?: string
          receipt_data?: string | null
          transaction_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
