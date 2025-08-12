import { useAppStore } from "@/services/store";
import { Button, ButtonGroup, Stack, Typography } from "@mui/material";
import { useShallow } from "zustand/shallow";

export default function Settings() {
  const store = useAppStore(useShallow((state) => state));
  return (
    <Stack direction="row" spacing={2}>
      <Stack>
        <Typography variant="body2" fontWeight="bold">
          Attack Multiplier
        </Typography>
        <ButtonGroup>
          <Button
            variant={store.attackMultiplier === 1 ? "contained" : "outlined"}
            onClick={() => store.setAttackMultiplier(1)}
          >
            x1
          </Button>
          <Button
            variant={store.attackMultiplier === 2 ? "contained" : "outlined"}
            onClick={() => store.setAttackMultiplier(2)}
          >
            x2
          </Button>
          <Button
            variant={store.attackMultiplier === 3 ? "contained" : "outlined"}
            onClick={() => store.setAttackMultiplier(3)}
          >
            x3
          </Button>
        </ButtonGroup>
      </Stack>

      <Stack>
        <Typography variant="body2" fontWeight="bold">
          Tough Multiplier
        </Typography>
        <ButtonGroup>
          <Button
            variant={store.toughMultiplier === 1 ? "contained" : "outlined"}
            onClick={() => store.setToughMultiplier(1)}
          >
            x1
          </Button>
          <Button
            variant={store.toughMultiplier === 2 ? "contained" : "outlined"}
            onClick={() => store.setToughMultiplier(2)}
          >
            x2
          </Button>
          <Button
            variant={store.toughMultiplier === 3 ? "contained" : "outlined"}
            onClick={() => store.setToughMultiplier(3)}
          >
            x3
          </Button>
        </ButtonGroup>
      </Stack>

      <Stack>
        <Typography variant="body2" fontWeight="bold">
          Ranges
        </Typography>
        <ButtonGroup>
          <Button
            variant={!store.halfRange ? "contained" : "outlined"}
            onClick={() => store.setHalfRange(false)}
          >
            Full
          </Button>
          <Button
            variant={store.halfRange ? "contained" : "outlined"}
            onClick={() => store.setHalfRange(true)}
          >
            Half
          </Button>
        </ButtonGroup>
      </Stack>
    </Stack>
  );
}
