import { Unit } from "@/services/interfaces";
import { useAppStore } from "@/services/store";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useShallow } from "zustand/shallow";
import RuleList from "./RuleList";
import { add, orderBy } from "lodash";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { mdiShield, mdiWater, mdiSword } from "@mdi/js";
import { transformRuleText } from "@/services/helpers";
import { StatTile } from "./StatTile";
import LoadoutItemDisplay from "./LoadoutItemDisplay";
import { Add, Remove } from "@mui/icons-material";

export default function UnitView({ unit }: { unit: Unit }) {
  const {
    armyBooks,
    attackMultiplier,
    toughMultiplier,
    halfRange,
    unitSizeMultipliers,
    addUnitSizeMultiplier,
    removeUnitSizeMultiplier,
  } = useAppStore(
    useShallow((state) => ({
      armyBooks: state.armyBooks,
      attackMultiplier: state.attackMultiplier,
      toughMultiplier: state.toughMultiplier,
      halfRange: state.halfRange,
      unitSizeMultipliers: state.unitSizeMultipliers,
      addUnitSizeMultiplier: state.addUnitSizeMultiplier,
      removeUnitSizeMultiplier: state.removeUnitSizeMultiplier,
    }))
  );
  const armyBook = armyBooks.find((x) => x.uid === unit.armyId);
  const loadoutRules = unit.loadout.flatMap((x) => x.content || x).filter((x) => x.type === "ArmyBookRule");
  const upgradeRules = unit.selectedUpgrades
    .flatMap((x) => x.option.gains)
    .filter((x) => x.type === "ArmyBookRule");

  const tough = unit.rules
    .concat(loadoutRules)
    .filter((x) => x.name === "Tough")
    .reduce((curr, next) => curr + next?.rating || 0, 0);

  const isCaster = unit.rules
    .concat(upgradeRules)
    .concat(loadoutRules)
    .some((x) => x.name === "Caster");

  const spells = isCaster && armyBook?.spells;

  const sizeMultiplier = unitSizeMultipliers.find((x) => x.unitId === unit.selectionId)?.multiplier || 1;

  return (
    <Card sx={{ mb: 2 }}>
      <Accordion defaultExpanded disableGutters>
        <AccordionSummary expandIcon={<KeyboardArrowUpIcon />}>
          <Stack alignItems="center" direction="row" spacing={1} sx={{ flex: 1 }}>
            <Typography fontWeight="bold">
              {unit.name} <span style={{ fontWeight: 400 }}>[{unit.size * sizeMultiplier}]</span>
            </Typography>
            <IconButton
              size="small"
              color="secondary"
              onClick={(e) => {
                removeUnitSizeMultiplier(unit.selectionId);
                e.preventDefault();
                e.stopPropagation();
                return false;
              }}
            >
              <Remove />
            </IconButton>
            <IconButton
              size="small"
              color="secondary"
              onClick={(e) => {
                addUnitSizeMultiplier(unit.selectionId, sizeMultiplier + 1);
                e.preventDefault();
                e.stopPropagation();
                return false;
              }}
            >
              <Add />
            </IconButton>
            <Typography sx={{ flex: 1, textAlign: "right", verticalAlign: "middle" }}>
              {unit.cost * sizeMultiplier}pts
            </Typography>
          </Stack>
        </AccordionSummary>

        <AccordionDetails sx={{ pt: 0 }}>
          <Stack spacing={1}>
            <Stack spacing={1} direction="row">
              <StatTile label="Qua" value={`${unit.quality}+`} icon={mdiSword} />
              <StatTile label="Def" value={`${unit.defense}+`} icon={mdiShield} />
              <StatTile
                label="Tough"
                value={(tough * toughMultiplier || toughMultiplier).toString()}
                icon={mdiWater}
              />
            </Stack>
            <Stack>
              <Box mb={1}>
                <RuleList unit={unit} specialRules={unit.rules.filter((x) => x.name !== "Tough")} />
              </Box>
              {orderBy(unit.loadout, "type", "desc").map((x, i) => (
                <LoadoutItemDisplay key={i} entry={x} unitId={unit.id} />
              ))}
              {upgradeRules.map((x, i) => (
                <LoadoutItemDisplay key={i} entry={x} unitId={unit.id} />
              ))}
            </Stack>
          </Stack>
          {spells && (
            <Box mt={2}>
              {spells.map((x, i) => (
                <Typography key={i} variant="body2">
                  <span style={{ fontWeight: "bold" }}>
                    {x.name} ({x.threshold}):{" "}
                  </span>{" "}
                  {transformRuleText(x.effect, attackMultiplier, halfRange)}
                </Typography>
              ))}
            </Box>
          )}
        </AccordionDetails>
      </Accordion>
    </Card>
  );
}
