 class UserInfo {
     constructor({ nameSelector, jobSelector }) {
         this.nameSelector = nameSelector;
         this.jobSelector = jobSelector;
     }

     getUserInfo() {
         const user = {
             name: document.querySelector(this.nameSelector).textContent,
             job: document.querySelector(this.jobSelector).textContent
         }
         return user;
     }

     setUserInfo({ name, job }) {
         document.querySelector(this.nameSelector).textContent = name;
         document.querySelector(this.jobSelector).textContent = job;
     }
 }
 export default UserInfo;