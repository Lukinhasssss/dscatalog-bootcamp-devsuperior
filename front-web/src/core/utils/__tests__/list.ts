import { generateList } from '../list'

test('should generate a list', () => {
  // ARRANGE
  const amount = 5

  // ACT
  const result = generateList(amount)

  // ASSERT
  expect(result).toEqual([0, 1, 2, 3, 4])
})

test('should generate an empty list when amount is zero', () => {
  // ACT
  const result = generateList(0)

  // ASSERT
  expect(result).toEqual([])
})

/*
    OBS:
      toBe: ===
      toEqual: Chega se o conteúdo é igual
*/