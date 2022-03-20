 class UserInfo {
     constructor({ nameSelector, jobSelector }) {
         this.nameElement = document.querySelector(nameSelector);
         this.jobElement = document.querySelector(jobSelector);
     }

     getUserInfo() {
         const user = {
             name: this.nameElement.textContent,
             job: this.jobElement.textContent
         }
         return user;
     }

     setUserInfo({ name, job }) {
         this.nameElement.textContent = name;
         this.jobElement.textContent = job;
     }
 }
 export default UserInfo;