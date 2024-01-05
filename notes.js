// create a react native in which there is a login page when user login then save the data to database and everythim user open the app and click the button
// two player then set the status of user active in the database and in the database check there is any other user which status is active if active then create
//  a twoplayer table and insert both user and in app show both user name 







// import React, { useState } from 'react';
// import { View, Button, Text, AsyncStorage } from 'react-native';
// import axios from 'axios';

// const App = () => {
//   const [user, setUser] = useState(null);

//   const handleLogin = async () => {
//     // Logic for user login, then save user data to AsyncStorage
//     // For simplicity, let's assume a successful login sets user data
//     const userData = { username: 'exampleUser', id: 'userId' };
//     await AsyncStorage.setItem('user', JSON.stringify(userData));
//     setUser(userData);
//   };

//   const handleTwoPlayer = async () => {
//     // Logic to set user status as active and find another active user
//     const userId = user.id;
//     await axios.put(`YOUR_BACKEND_URL/setStatus/${userId}`, { status: 'active' });

//     const response = await axios.get('YOUR_BACKEND_URL/findActiveUser');
//     const otherUser = response.data;

//     if (otherUser) {
//       await axios.post('YOUR_BACKEND_URL/createTwoPlayerGame', {
//         player1: userId,
//         player2: otherUser._id,
//       });
//       alert(`Game created with ${otherUser.username}`);
//     } else {
//       alert('No active users found.');
//     }
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       {user ? (
//         <>
//           <Text>Welcome, {user.username}!</Text>
//           <Button title="Two Player" onPress={handleTwoPlayer} />
//         </>
//       ) : (
//         <Button title="Login" onPress={handleLogin} />
//       )}
//     </View>
//   );
// };

// export default App;
