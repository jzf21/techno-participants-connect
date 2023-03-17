import Image from "next/image";
import React from "react";
import { Loader } from "../components";
import styles from "../styles/Users.module.css";
import logo from "../assets/logo.png";
import { useRouter } from "next/router";
import { CustomTitle } from "../utils";
import axios from "axios";

function Users() {
  const [users, setUsers] = React.useState([]);
  const [allUsers, setAllUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();
  async function fetchUsers() {
    await axios.get("/api/users").then((res) => {
      setUsers(res.data);
      setAllUsers(res.data);
      setLoading(false);
    });
  }
  function handleSearch(value) {
    if (value) {
      const filteredUsers = allUsers.filter((user) => {
        return user.name.toLowerCase().includes(value.toLowerCase());
      });
      setUsers(filteredUsers);
    } else {
      setUsers(allUsers);
    }
  }

  

  React.useEffect(() => {
    fetchUsers();
  }, []);
  if (loading) return <Loader />;

  return (
    <>
      <CustomTitle title="Users" />
      <div className={styles.users_container}>
        <div className={styles.users_profile_logo}>
          <Image src={logo} alt="" />
        </div>
        <input
          type="text"
          placeholder="Search Developers"
          className={styles.search}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        />
        <div className={styles.user_container_cards}>
          {users.length === 0 && (
            <div className={styles.no_users}>No Users Found</div>
          )}
          {users.map((user, index) =>
            user.techno_id ? (
              <div
                key={index}
                className={styles.user_card_container}
                onClick={() => {
                  router.push(`/${user.techno_id}`);
                }}
              >
                <div className={styles.user_card_image_container}>
                  <img
                    src={`https://api.dicebear.com/5.x/adventurer/svg?seed=${user.email}`}
                    alt=""
                  />
                </div>
                <div className={styles.user_card_container_details}>
                  <div className={styles.user_card_id}>
                    Techno ID : <b>{user?.techno_id}</b>
                  </div>
                  <div className={styles.user_card_name}>{user.name}</div>
                  <div className={styles.user_card_designation}>
                    {user?.designation.toLowerCase().includes("team")
                      ? user?.designation
                      : `Team ${user?.designation}`}
                  </div>
               
                </div>
              </div>
            ) : null
          )}
        </div>
      </div>
    </>
  );
}

export default Users;
