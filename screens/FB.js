import React, { useState, useEffect } from "react";

import {db} from "../components/Firebase/firebaseConfig";

const FeedbackScreen  = () => {

  const [message, setMessage] = useState("");

  const [loader, setLoader] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);

    db.collection("Feedbacks")
      .add({
  
        message: message,
      })
      .then(() => {
        setLoader(false);
        alert("Your message has been submitted👍");
      })
      .catch((error) => {
        alert(error.message);
        setLoader(false);
      });

    setMessage("");
  };

  return (
    <SafeAreaView className="form" onSubmit={handleSubmit}>


      <TextInput
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></TextInput>

      <Button
        type="submit"
        style={{ background: loader ? "#ccc" : " rgb(2, 2, 110)" }}
      >
        Submit
      </Button>
    </SafeAreaView>
  );
};

export default FeedbackScreen ;