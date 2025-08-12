import { LoadoutEntry } from "@/services/interfaces";
import { Typography, Box } from "@mui/material";
import RuleList from "./RuleList";
import WeaponDisplay from "./WeaponDisplay";

export default function LoadoutItemDisplay({ unitId, entry }: { unitId: string; entry: LoadoutEntry }) {
  if (entry.type === "ArmyBookWeapon") {
    return <WeaponDisplay unitId={unitId} entry={entry} />;
  }

  if (entry.type === "ArmyBookRule") {
    return <RuleList specialRules={[entry]} />;
  }

  if (entry.type === "ArmyBookItem") {
    return (
      <>
        <Typography variant="body2">{entry.name}:</Typography>
        {entry.content.map((x, i) => (
          <Box key={i} sx={{ pl: 2 }}>
            <LoadoutItemDisplay unitId={unitId} entry={x} />
          </Box>
        ))}
      </>
    );
  }
}
