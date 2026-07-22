function getPaginationPages(current: number, total: number): (number | string)[] {
  const centerPages: (number | string)[] = []
  
  // Определяем диапазон страниц вокруг текущей
  const leftBound = Math.max(2, current - 1)
  const rightBound = Math.min(total - 1, current + 1)

  // Добавляем левое многоточие
  if (leftBound > 2) {
    centerPages.push('left-dots')
  } else if (total > 2) {
    centerPages.push(2)
  }

  // Добавляем центральные страницы
  for (let i = Math.max(3, leftBound); i <= Math.min(total - 2, rightBound); i++) {
    centerPages.push(i)
  }

  // Добавляем правое многоточие
  if (rightBound < total - 1) {
    centerPages.push('right-dots')
  } else if (total > 1 && !centerPages.includes(total - 1) && leftBound !== total - 1) {
    centerPages.push(total - 1)
  }

  // Сборка итогового массива: первая страница всегда есть, последняя — если total > 1
  return [1, ...centerPages, ...(total > 1 ? [total] : [])]
}
export default getPaginationPages