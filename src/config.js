let local=false;
let DEPLOY_URL = "https://project-board-be.onrender.com";
let LOCAL_URL = "http://localhost:8080"
let URL_BE = ""
if (local){
    URL_BE = LOCAL_URL;
}else{
    URL_BE = DEPLOY_URL;
}
export default URL_BE;