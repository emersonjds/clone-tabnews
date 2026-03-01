async function data() {
  const response = await fetch();
  const data = await response.json();
  return data;
}
