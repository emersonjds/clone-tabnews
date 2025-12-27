test("test", callbackFunction);

function callbackFunction() {
  console.log('executado 1')
}

test("testando outra funcao", () => {
  console.log('executado 2');
})

test("One should be one", () => {
  expect(1).toBe(1)
})
