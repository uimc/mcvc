async function getViews() {
  let obj1;
  let obj2;
  var vcTotal;

  const res1 = await fetch('https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UCd50EGV82gMHnPPuazZMtqQ&key=AIzaSyAOkie51vcbK8WXfgaq-EgzCzSxHp-KuH0')
  obj1 = await res1.json();
  console.log(obj1)
  vcTotal = Number(obj1["items"][0].statistics.viewCount);

  const res2 = await fetch('https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UCm7VnFK6wWvhav2G0eUJJsw&key=AIzaSyAOkie51vcbK8WXfgaq-EgzCzSxHp-KuH0')
  obj2 = await res2.json();
  console.log(obj2)
  vcTotal += Number(obj2["items"][0].statistics.viewCount);

  console.log(vcTotal)
  localStorage.setItem('view-count', vcTotal.toLocaleString());
  document.getElementById('view-count-id').innerHTML = localStorage.getItem('view-count');
  localStorage.setItem('lastRefresh', Date.now());
}

if (localStorage.getItem('lastRefresh') === null) {
  getViews();
}
else if (Date.now() - localStorage.getItem('lastRefresh') > 60000) {
  localStorage.removeItem('view-count');
  localStorage.removeItem('lastRefresh');
  getViews();
}
else {
  document.getElementById('view-count-id').innerHTML = localStorage.getItem('view-count');
}