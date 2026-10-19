// Version web uniquement : l'app est pensée pour un téléphone.
// On plafonne la largeur "window" vue par les écrans (ils la lisent au chargement
// via Dimensions.get("window")) pour qu'ils se dimensionnent comme sur mobile.
import { Dimensions, Platform } from "react-native";

export const WEB_FRAME_MAX_WIDTH = 430;

if (Platform.OS === "web") {
  const originalGet = Dimensions.get.bind(Dimensions);
  Dimensions.get = (dim) => {
    const value = originalGet(dim);
    if (dim === "window" && value.width > WEB_FRAME_MAX_WIDTH) {
      return { ...value, width: WEB_FRAME_MAX_WIDTH };
    }
    return value;
  };
}
