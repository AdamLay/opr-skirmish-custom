export const transformRuleText = (rule: string, multiplier: number) => rule.replace(
  /take(s)? (\d+) hits?/,
  (_, ...grps) => `take${grps[0] || ""} ${parseInt(grps[1]) * multiplier} hits`
)