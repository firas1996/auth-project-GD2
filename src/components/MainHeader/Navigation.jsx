import { useContext } from "react";
import classes from "./Navigation.module.css";
import AuthStore from "../../store/AuthContext";

const Navigation = () => {
  const { isLoggedIn, logoutHandler } = useContext(AuthStore);
  return (
    <nav className={classes.nav}>
      <ul>
        {isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;

// import AuthStore from "../../store/AuthContext";
// import classes from "./Navigation.module.css";

// const Navigation = () => {
//   return (
//     <AuthStore.Consumer>
//       {({ isLoggedIn, logoutHandler }) => {
//         return (
//           <nav className={classes.nav}>
//             <ul>
//               {isLoggedIn && (
//                 <li>
//                   <a href="/">Users</a>
//                 </li>
//               )}
//               {isLoggedIn && (
//                 <li>
//                   <a href="/">Admin</a>
//                 </li>
//               )}
//               {isLoggedIn && (
//                 <li>
//                   <button onClick={logoutHandler}>Logout</button>
//                 </li>
//               )}
//             </ul>
//           </nav>
//         );
//       }}
//     </AuthStore.Consumer>
//   );
// };

// export default Navigation;
