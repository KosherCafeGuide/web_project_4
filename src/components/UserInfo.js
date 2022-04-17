 class UserInfo {
     constructor({ nameSelector, jobSelector, avatarSelector }) {
         this.nameElement = document.querySelector(nameSelector);
         this.jobElement = document.querySelector(jobSelector);
         this.avatarElement = document.querySelector(avatarSelector);
     }

     getUserInfo() {
         const user = {
             name: this.nameElement.textContent,
             job: this.jobElement.textContent,
         }
         return user;
     }

     setUserInfo({ userName, job, userID, avatarURL }) {
         this.nameElement.textContent = userName;
         this.jobElement.textContent = job;
         this.userID = userID;
         this.avatarElement.style.backgroundImage = `url(${avatarURL})`
     }
     getUserID() {
         return this.userID;
     }
     setAvatar(avatarURL) {
         this.avatarElement.style.backgroundImage = `url(${avatarURL})`;
     }

 }
 export default UserInfo;