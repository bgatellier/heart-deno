import { Result } from "lighthouse";

export default (
  categories: Record<string, Result.Category>,
  fractionDigits?: number,
): number => {
  const avgScore = compute(categories);

  return normalize(avgScore, fractionDigits);
};

/**
 * Calculate the average score for every categories
 * @param categories LH report categories
 *
 * @returns Average score (between 0 and 1) accross all category
 */
function compute(categories: Record<string, Result.Category>): number {
  const categoriesName = Object.keys(categories);

  const sumScores = categoriesName.reduce(
    (acc, categoryName) => acc + categories[categoryName].score,
    0,
  );

  return sumScores / categoriesName.length;
}

/**
 * @param avgScore Score between 0 and 1
 */
function normalize(avgScore: number, fractionDigits?: number): number {
  return parseFloat((100 * avgScore).toFixed(fractionDigits));
}
