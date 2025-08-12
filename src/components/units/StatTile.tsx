import Icon from "@mdi/react";
import { Stack, Typography } from "@mui/material";

export function StatTile({ label, value, icon }: { label: string; value: string; icon: any }) {
  return (
    <div
      style={{
        padding: "0 8px",
        textAlign: "center",
        border: "1px solid grey",
        borderRadius: "4px",
        flex: 1,
      }}
    >
      <Stack direction="row" alignItems="center">
        <Icon path={icon} size={0.8} color="grey" />
        <Typography textAlign="left" sx={{ flex: 1 }}>
          {label}
        </Typography>
        <Typography fontSize={24} fontWeight="bold">
          {value}
        </Typography>
      </Stack>
      {/* <div style={{ textAlign: "center" }}>
        <p>{label}</p>
      </div>
      <div style={{ fontSize: "24px", fontWeight: "bold" }}>
        <p>{value}</p>
      </div> */}
    </div>
  );
}
