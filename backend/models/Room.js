class Room {
    constructor(data) {
      this.id = data.id;
      this.users = [];
      // Other properties as needed
    }
  
    isFull() {
      return this.users.length >= 2;
    }

  
    addUser(user) {
      if (!this.isFull()) {
    
        this.users.push(user);
        // Handle logic when adding users to the room
      }
      
    }
  
    removeUser(user) {
      const index = this.users.indexOf(user);
      if (index !== -1) {
        this.users.splice(index, 1);
        // Handle logic when removing users from the room
      }
    }
  
    isEmpty() {
      return this.users.length === 0;
    }
  }
  
  module.exports = Room;
  