// import { useState } from "react";
// import { useEffect } from "react";

// function CopyInfo() {
//   const [user, setUser] = useState({
//     id: "",
//     name: "",
//     username: "",
//     email: "",
//     phone: "",
//   });
//   const [isLoading, setIsLoading] = useState(true);
//   const [showUpdate, setShowUpdate] = useState(false);
//   const [updateName, setUpdateName] = useState(user.name);
//   const [updateEmail, setUpdateEmail] = useState(user.email);
//   const [updatePhone, setUpdatePhone] = useState(user.phone);
//   const username =
//     JSON.parse(localStorage.getItem("currentUser")).username || "";

//   useEffect(() => {
//     setIsLoading(true);
//     async function getUser() {
//       try {
//         const res = await fetch(
//           `http://localhost:3000/users?username=${username}`
//         );
//         if (!res.ok) throw new Error("Something is wrong...");
//         const data = await res.json();
//         setUser(data[0]);
//         console.log(data[0]);
//         setIsLoading(false);
//       } catch (err) {
//         alert(err);
//       }
//     }
//     getUser();
//   }, [username]);

//   useEffect(() => {
//     setUpdateName(user.name);
//     setUpdateEmail(user.email);
//     setUpdatePhone(user.phone);
//   }, [user]);

//   async function handleSubmit(e) {
//     e.preventDefault();
//     try {
//       const resUser = await fetch(
//         `http://localhost:3000/users?username=${username}`
//       );
//       const data = await resUser.json();
//       if (!data.length) throw new Error("User not found");
//       const userId = data[0].id; // כאן יש לנו id אמיתי!

//       const res = await fetch(`http://localhost:3000/users/${userId}`, {
//         method: "PATCH",
//         body: JSON.stringify({
//           name: updateName,
//           username: username,
//           email: updateEmail,
//           phone: updatePhone,
//         }),
//         headers: { "Content-Type": "application/json" },
//       });
//       const updatedUser = await res.json();
//       setUser(updatedUser);
//     } catch (e) {
//       alert(e);
//     }
//   }

//   if (isLoading) {
//     return <p>Loading...</p>;
//   }
//   return (
//     <>
//       <h1>{username}'s Info page</h1>
//       <form onSubmit={handleSubmit}>
//         <h2>
//           Name:{" "}
//           {!showUpdate ? (
//             user.name
//           ) : (
//             <input
//               type="text"
//               value={updateName}
//               onChange={(e) => setUpdateName(e.target.value)}
//             />
//           )}
//         </h2>
//         <h2>Username: {user.username}</h2>
//         <h2>
//           Email:{" "}
//           {!showUpdate ? (
//             user.email
//           ) : (
//             <input
//               type="text"
//               value={updateEmail}
//               onChange={(e) => setUpdateEmail(e.target.value)}
//             />
//           )}
//         </h2>
//         <h2>
//           Phone:{" "}
//           {!showUpdate ? (
//             user.phone
//           ) : (
//             <input
//               type="text"
//               value={updatePhone}
//               onChange={(e) => setUpdatePhone(e.target.value)}
//             />
//           )}
//         </h2>
//         {!showUpdate ? (
//           <button type="button" onClick={() => setShowUpdate(true)}>
//             Update Data
//           </button>
//         ) : (
//           <button type="submit" onClick={() => setShowUpdate(false)}>
//             Done
//           </button>
//         )}
//       </form>
//     </>
//   );
// }

// export default CopyInfo;
