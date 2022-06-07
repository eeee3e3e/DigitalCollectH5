import axios from 'axios'
 
const isNewVersion = () => {
  let url = `//${window.location.host}/static/version.json?t=${new Date().getTime()}`;
  console.log(url)
  axios.get(url).then(res => {
    console.log(res)
    if (res.status === 200) {
      let vueVersion = res.data.version;
      let localVueVersion = localStorage.getItem('vueVersion');
      if (localVueVersion && localVueVersion != vueVersion) {
        localStorage.setItem('vueVersion', vueVersion);
        let url = window.location.href
        url = url.split('#')
        window.location.replace(url[0])
        window.location.reload();
        return;
      } else {
        localStorage.setItem('vueVersion', vueVersion);
      }
    }
  });
}
 
export default {
  isNewVersion
}