export const hanldeSplitBudget = (budget: string) => {
  const [min, max] = budget.split("-");

  return { min, max };
};
