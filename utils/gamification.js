export function getEcoLevel(points) {
  if (points >= 50) return "Forest";
  if (points >= 25) return "Tree";
  if (points >= 10) return "Leaf";
  return "Seed";
}

export function getBadges(points) {
  const badges = [];

  if (points >= 5) badges.push("🌱 First Step");
  if (points >= 15) badges.push("🍃 Eco Starter");
  if (points >= 30) badges.push("🌳 Green Champion");

  return badges;
}
