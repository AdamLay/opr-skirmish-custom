import { LoadoutEntry } from "@/services/interfaces";
import { useAppStore } from "@/services/store";
import { Typography } from "@mui/material";
import { useShallow } from "zustand/react/shallow";
import RuleList from "./RuleList";

export default function WeaponDisplay({ unitId, entry }: { unitId: string; entry: LoadoutEntry }) {
  const { halfRange, attackMultiplier, unitSizeMultipliers } = useAppStore(
    useShallow((state) => ({
      attackMultiplier: state.attackMultiplier,
      halfRange: state.halfRange,
      unitSizeMultipliers: state.unitSizeMultipliers,
    }))
  );
  const unitSizeMultiplier = unitSizeMultipliers.find((x) => x.unitId === unitId)?.multiplier || 1;
  const hasRules = entry.specialRules?.length > 0;
  return (
    <Typography>
      <Typography variant="caption">{(entry.count || 1) * unitSizeMultiplier}x</Typography> {entry.name} (
      {entry.range > 0 && `${entry.range * (halfRange ? 0.5 : 1)}", `}A{entry.attacks * attackMultiplier}
      {hasRules && ", "}
      <RuleList specialRules={entry.specialRules} />)
    </Typography>
  );
}
