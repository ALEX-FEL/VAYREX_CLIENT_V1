import { useState } from "react";
import { X, Check } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

type VehicleType = "moto" | "standard" | "premium";

const vehicleData: {
  [key in VehicleType]: {
    image: string;
    basePrice: number;
    multiplier: number;
  };
} = {
  moto: {
    image: "https://images.pexels.com/photos/104842/bmw-motorcycle-motorbike-vehicle-104842.jpeg?auto=compress&cs=tinysrgb&w=400",
    basePrice: 500,
    multiplier: 0.7,
  },
  standard: {
    image: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=400",
    basePrice: 1000,
    multiplier: 1.0,
  },
  premium: {
    image: "https://images.pexels.com/photos/2116995/pexels-photo-2116995.jpeg?auto=compress&cs=tinysrgb&w=400",
    basePrice: 2000,
    multiplier: 1.5,
  },
};

export function VehicleSelectionModal({
  isOpen,
  onClose,
  onConfirm,
  distance = 7.8,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (vehicle: VehicleType, price: number) => void;
  distance?: number;
}) {
  const { t } = useLanguage();
  const [selected, setSelected] = useState<VehicleType | null>(null);
  const [hovered, setHovered] = useState<VehicleType | null>(null);

  if (!isOpen) return null;

  const calculatePrice = (vehicle: VehicleType): number => {
    const { basePrice, multiplier } = vehicleData[vehicle];
    return Math.round(basePrice * multiplier * (distance / 5));
  };

  const vehicles: VehicleType[] = ["moto", "standard", "premium"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-sm mx-4 bg-gradient-to-br from-[#141B3D] to-[#0A0E27] rounded-3xl border border-white/10 shadow-2xl animate-float-up overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
        >
          <X className="h-4 w-4 text-white" />
        </button>

        <div className="p-6">
          <h2 className="text-xl font-bold text-gradient-primary">
            {t.vehicle.selectTitle}
          </h2>
          <p className="mt-1 text-sm text-[#B8BED6]">{t.vehicle.selectSubtitle}</p>

          <div className="mt-6 space-y-3">
            {vehicles.map((vehicle) => {
              const price = calculatePrice(vehicle);
              const isSelected = selected === vehicle;
              const isHovered = hovered === vehicle;

              return (
                <button
                  key={vehicle}
                  onClick={() => setSelected(vehicle)}
                  onMouseEnter={() => setHovered(vehicle)}
                  onMouseLeave={() => setHovered(null)}
                  className={`relative w-full rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                    isSelected
                      ? "border-[#7B5CFF] shadow-glow"
                      : isHovered
                      ? "border-white/30 scale-[1.02]"
                      : "border-white/5"
                  }`}
                >
                  <div className="relative h-32 overflow-hidden">
                    <img
                      src={vehicleData[vehicle].image}
                      alt={vehicle}
                      className={`w-full h-full object-cover transition-all duration-300 ${
                        isHovered || isSelected ? "scale-110" : "scale-100"
                      }`}
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-[#0A0E27] via-[#0A0E27]/50 to-transparent transition-opacity ${
                        isHovered || isSelected ? "opacity-80" : "opacity-60"
                      }`}
                    />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-base font-bold">
                          {t.vehicle[vehicle]}
                        </p>
                        <p className="text-xs text-[#B8BED6]">
                          {t.vehicle[`${vehicle}Subtitle`]}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-right">
                          <p className="text-lg font-bold text-gradient-primary">
                            {price.toLocaleString()}
                          </p>
                          <p className="text-[10px] text-[#B8BED6]">XAF</p>
                        </div>
                        {isSelected && (
                          <div className="h-6 w-6 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow">
                            <Check className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => {
              if (selected) {
                onConfirm(selected, calculatePrice(selected));
                onClose();
              }
            }}
            disabled={!selected}
            className={`mt-6 w-full h-12 rounded-xl font-semibold text-sm transition ${
              selected
                ? "bg-gradient-primary text-white shadow-glow active:scale-[0.99]"
                : "bg-white/10 text-white/50 cursor-not-allowed"
            }`}
          >
            {t.vehicle.confirm}
          </button>
        </div>
      </div>
    </div>
  );
}
