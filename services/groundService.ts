import { Ground } from "@/types/ground";
import { MOCK_GROUNDS } from "@/lib/mockData/grounds";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export class GroundService {
  static async getAllGrounds(): Promise<Ground[]> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from("grounds").select("*");
        if (data && !error && data.length > 0) {
          return data.map((item) => ({
            id: item.id,
            name: item.name,
            shortName: item.short_name || item.name,
            city: item.city,
            country: item.country,
            capacity: item.capacity,
            pitchType: item.pitch_type,
            imageUrl: item.image_url || "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80",
            boundaryDimensions: item.boundary_dimensions || { straight: 75, squareLeg: 70, cover: 72, fineLeg: 68, thirdMan: 65, longOn: 78, longOff: 78 },
            stats: item.stats || {},
            historicalRecords: item.historical_records || {},
            weatherForecastPlaceholder: item.weather_forecast || { tempC: 22, humidityPct: 55, condition: "Clear", rainProbabilityPct: 10 },
          }));
        }
      } catch (err) {
        console.warn("Supabase grounds query fallback:", err);
      }
    }
    return MOCK_GROUNDS;
  }

  static async getGroundById(id: string): Promise<Ground | null> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from("grounds").select("*").eq("id", id).single();
        if (data && !error) {
          return {
            id: data.id,
            name: data.name,
            shortName: data.short_name || data.name,
            city: data.city,
            country: data.country,
            capacity: data.capacity,
            pitchType: data.pitch_type,
            imageUrl: data.image_url || "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80",
            boundaryDimensions: data.boundary_dimensions || { straight: 75, squareLeg: 70, cover: 72, fineLeg: 68, thirdMan: 65, longOn: 78, longOff: 78 },
            stats: data.stats || {},
            historicalRecords: data.historical_records || {},
            weatherForecastPlaceholder: data.weather_forecast || { tempC: 22, humidityPct: 55, condition: "Clear", rainProbabilityPct: 10 },
          };
        }
      } catch (err) {
        console.warn(`Supabase getGroundById(${id}) fallback:`, err);
      }
    }
    const ground = MOCK_GROUNDS.find((g) => g.id === id);
    return ground || MOCK_GROUNDS[0];
  }

  static async createGround(ground: Partial<Ground>): Promise<boolean> {
    if (!isSupabaseConfigured) return false;
    try {
      const { error } = await supabase.from("grounds").insert({
        id: ground.id || `ground-${Date.now()}`,
        name: ground.name,
        short_name: ground.shortName || ground.name,
        city: ground.city,
        country: ground.country,
        capacity: ground.capacity || 50000,
        pitch_type: ground.pitchType || "Pace-Friendly",
        image_url: ground.imageUrl,
        boundary_dimensions: ground.boundaryDimensions,
        stats: ground.stats,
        historical_records: ground.historicalRecords,
      });
      return !error;
    } catch (err) {
      console.error("Failed to create ground in Supabase:", err);
      return false;
    }
  }

  static async deleteGround(id: string): Promise<boolean> {
    if (!isSupabaseConfigured) return false;
    try {
      const { error } = await supabase.from("grounds").delete().eq("id", id);
      return !error;
    } catch (err) {
      console.error("Failed to delete ground in Supabase:", err);
      return false;
    }
  }
}
