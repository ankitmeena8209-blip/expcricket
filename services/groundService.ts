import { Ground } from "@/types/ground";
import { MOCK_GROUNDS } from "@/lib/mockData/grounds";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export class GroundService {
  static async getAllGrounds(): Promise<Ground[]> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from("grounds").select("*");
        if (data && !error && data.length > 0) {
          return data as Ground[];
        }
      } catch (err) {
        console.warn("Supabase grounds query fallback to mock data:", err);
      }
    }
    return MOCK_GROUNDS;
  }

  static async getGroundById(id: string): Promise<Ground | null> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from("grounds").select("*").eq("id", id).single();
        if (data && !error) {
          return data as Ground;
        }
      } catch (err) {
        console.warn(`Supabase getGroundById(${id}) fallback:`, err);
      }
    }
    const ground = MOCK_GROUNDS.find((g) => g.id === id);
    return ground || MOCK_GROUNDS[0];
  }
}
