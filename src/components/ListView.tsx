import { useAppStore } from "@/services/store";
import { Grid } from "@mui/material";
import { useShallow } from "zustand/shallow";
import UnitView from "./units/UnitView";

export default function ListView() {
  const { listResponse: list } = useAppStore(useShallow((state) => state));

  return (
    <Grid container spacing={1}>
      {list?.units.map((unit) => (
        <Grid key={unit.selectionId} item xs={12} sm={6} md={4}>
          <UnitView unit={unit} />
        </Grid>
      ))}
    </Grid>
  );
}
