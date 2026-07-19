import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export type BucketName = "player-avatars" | "country-flags" | "ground-images";

export class StorageService {
  static async uploadImage(bucket: BucketName, file: File): Promise<string | null> {
    if (!isSupabaseConfigured) return null;
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage.from(bucket).upload(filePath, file, {
        cacheControl: "3600",
        upsert: true,
      });

      if (uploadError) {
        console.error(`Failed to upload to bucket ${bucket}:`, uploadError);
        return null;
      }

      const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
      return data.publicUrl;
    } catch (err) {
      console.error("Storage upload exception:", err);
      return null;
    }
  }
}
