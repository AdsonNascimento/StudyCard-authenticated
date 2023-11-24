export default function checkDifficulty(difficulty) {
  switch (difficulty) {
    case 1:
      difficulty = "muito fácil"
      break

    case 2:
      difficulty = "fácil"
      break

    case 3:
      difficulty = "médio"
      break

    case 4:
      difficulty = "difícil"
      break

    case 5:
      difficulty = "muito difícil"
      break
  }

  return difficulty
}