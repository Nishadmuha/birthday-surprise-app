(async () => {
  const res = await fetch('http://localhost:5000/api/settings');
  const json = await res.json();
  console.log(json.name);
})();
