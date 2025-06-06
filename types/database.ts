export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      candidates: {
        Row: {
          id: string
          created_at: string
          email: string
          name: string
          company_id: string | null
          project_id: string | null
          status: "pending" | "completed" | "expired" | "invalid"
          assessment_sent_at: string | null
          assessment_completed_at: string | null
          assessment_link: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          email: string
          name: string
          company_id?: string | null
          project_id?: string | null
          status?: "pending" | "completed" | "expired" | "invalid"
          assessment_sent_at?: string | null
          assessment_completed_at?: string | null
          assessment_link?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          email?: string
          name?: string
          company_id?: string | null
          project_id?: string | null
          status?: "pending" | "completed" | "expired" | "invalid"
          assessment_sent_at?: string | null
          assessment_completed_at?: string | null
          assessment_link?: string | null
        }
      }
      companies: {
        Row: {
          id: string
          created_at: string
          name: string
          logo_url: string | null
          primary_color: string | null
          active: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          logo_url?: string | null
          primary_color?: string | null
          active?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          logo_url?: string | null
          primary_color?: string | null
          active?: boolean
        }
      }
      projects: {
        Row: {
          id: string
          created_at: string
          name: string
          company_id: string | null
          description: string | null
          active: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          company_id?: string | null
          description?: string | null
          active?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          company_id?: string | null
          description?: string | null
          active?: boolean
        }
      }
      assessments: {
        Row: {
          id: string
          created_at: string
          candidate_id: string
          completed_at: string | null
          started_at: string | null
          is_valid: boolean
          environment_check_passed: boolean
          device_type: string | null
          browser_info: Json | null
          ip_address: string | null
          consent_given: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          candidate_id: string
          completed_at?: string | null
          started_at?: string | null
          is_valid?: boolean
          environment_check_passed?: boolean
          device_type?: string | null
          browser_info?: Json | null
          ip_address?: string | null
          consent_given?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          candidate_id?: string
          completed_at?: string | null
          started_at?: string | null
          is_valid?: boolean
          environment_check_passed?: boolean
          device_type?: string | null
          browser_info?: Json | null
          ip_address?: string | null
          consent_given?: boolean
        }
      }
      disc_results: {
        Row: {
          id: string
          created_at: string
          assessment_id: string
          d_score: number
          i_score: number
          s_score: number
          c_score: number
          pattern_type: string | null
          report_generated: boolean
          report_url: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          assessment_id: string
          d_score: number
          i_score: number
          s_score: number
          c_score: number
          pattern_type?: string | null
          report_generated?: boolean
          report_url?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          assessment_id?: string
          d_score?: number
          i_score?: number
          s_score?: number
          c_score?: number
          pattern_type?: string | null
          report_generated?: boolean
          report_url?: string | null
        }
      }
      profiles: {
        Row: {
          id: string
          user_id: string
          role: "admin" | "consultant" | "client"
          company_id: string | null
          name: string
          avatar_url: string | null
        }
        Insert: {
          id?: string
          user_id: string
          role: "admin" | "consultant" | "client"
          company_id?: string | null
          name: string
          avatar_url?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          role?: "admin" | "consultant" | "client"
          company_id?: string | null
          name?: string
          avatar_url?: string | null
        }
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
  }
}
