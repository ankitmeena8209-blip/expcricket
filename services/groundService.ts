import { MOCK_GROUNDS } from "@/lib/mockData/grounds";
import { Ground } from "@/types/ground";

export class GroundService {
  static async getAllGrounds(): Promise<Ground[]> {
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_GROUNDS), 100));
  }

  static async getGroundById(id: string): Promise<Ground | null> {
    return new Promise((resolve) => {
      const ground = MOCK_GROUNDS.find(
        (g) => g.id === id || g.shortName.toLowerCase() === id.toLowerCase()
      ) || MOCK_GROUNDS[0]; // Fallback to MCG
      setTimeout(() => resolve(ground), 100);
    });
  }
}
